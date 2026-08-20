const { tool } = require("@langchain/core/tools");
const { z } = require("zod");

const COMPANY_INFO = {
    founder: "Parnika Bhatt",
    email: "info@mindsettler.com",
    instagram: "@mindsettlerbypb",
    price: 749,
    onlineAvailable: true,
    offlineAvailable: false,
    sessionDuration: "60 minutes",
    bookingProcess: "Users can book a session directly from the Book Session page."
};

const companyInfoTool = tool(
  async ({ query }) => {
    // This tool is completely deterministic. It returns the exact static facts
    // so the LLM cannot hallucinate details like the founder's name.
    return JSON.stringify(COMPANY_INFO, null, 2);
  },
  {
    name: "company_info",
    description: "Returns static factual information about MindSettler, including founder name, pricing, contact email, and session rules. Call this whenever the user asks factual questions about the company.",
    schema: z.object({
      query: z.string().describe("The user's question about the company (optional)"),
    }),
  }
);

module.exports = { companyInfoTool, COMPANY_INFO };
