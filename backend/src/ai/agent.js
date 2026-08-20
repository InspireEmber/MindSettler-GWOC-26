const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { SystemMessage, HumanMessage, AIMessage, ToolMessage } = require("@langchain/core/messages");
const SYSTEM_PROMPT = require("./prompts/systemPrompt");
const { companyInfoTool } = require("./tools/companyInfoTool");
const { faqTool } = require("./tools/faqTool");
const { policyTool } = require("./tools/policyTool");
const { availabilityTool } = require("./tools/availabilityTool");

const MODEL_NAME = 'gemini-2.5-flash-lite';

// 4. Tool Registry (No if-else dispatch)
// Notice: bookingTool is deliberately NOT bound to the LLM to prevent unauthorized state mutation
const TOOL_MAP = {
  company_info: companyInfoTool,
  faq_tool: faqTool,
  policy_tool: policyTool,
  availability_tool: availabilityTool,
};

class ChatAgent {
  constructor() {
    this.model = null;
    this.modelWithTools = null;
  }

  initModel() {
    if (!this.model) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured.");
      }
      this.model = new ChatGoogleGenerativeAI({
        model: MODEL_NAME,
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.2, // 12. Lowered for consistency
        maxOutputTokens: 500, // 13. Lowered as per architectural review
      });
      // Bind ONLY informational tools
      this.modelWithTools = this.model.bindTools(Object.values(TOOL_MAP));
    }
  }

  async invoke(message, conversationHistory = []) {
    this.initModel();

    // 1. Prepare Messages
    const dynamicSystemPrompt = `${SYSTEM_PROMPT}\n\nIMPORTANT: The current date is ${new Date().toISOString().split('T')[0]}. Use this year and date when interpreting user time references.`;
    const messages = [
      new SystemMessage(dynamicSystemPrompt),
      ...conversationHistory.map(msg =>
        msg.role === 'assistant' ? new AIMessage(msg.content) : new HumanMessage(msg.content)
      ),
      new HumanMessage(message)
    ];

    // 2. Agent Loop
    let response = await this.modelWithTools.invoke(messages);
    messages.push(response);

    // If the model decides to use tools
    if (response.tool_calls && response.tool_calls.length > 0) {
      console.log("Agent is calling tools:", response.tool_calls.map(t => t.name));
      
      for (const toolCall of response.tool_calls) {
        let toolResult = "";
        
        // Dispatch via TOOL_MAP instead of if-else
        const tool = TOOL_MAP[toolCall.name];
        if (tool) {
          toolResult = await tool.invoke(toolCall.args);
        } else {
          console.warn(`Unknown tool called: ${toolCall.name}`);
        }
        
        messages.push(new ToolMessage({
          content: toolResult || "Tool execution failed or tool not found.",
          tool_call_id: toolCall.id,
          name: toolCall.name
        }));
      }
      
      // Invoke the model again with the tool responses
      response = await this.modelWithTools.invoke(messages);
    }

    // Return the raw text response
    return response.content || "No response content.";
  }
}

module.exports = new ChatAgent();
