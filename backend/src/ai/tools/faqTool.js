const { tool } = require("@langchain/core/tools");
const { z } = require("zod");

const FAQ_DATA = `
Frequently Asked Questions:
1. What is MindSettler? MindSettler is an educational platform designed to help you understand your emotional and behavioral patterns.
2. Is this therapy? No. MindSettler provides psycho-education and awareness. We do not provide clinical therapy, medical advice, or diagnosis.
3. How long are sessions? Sessions typically last 45 to 60 minutes.
4. How do I book a session? You can book a session by clicking the "Book Session" button or visiting the /book-session page.
5. Can I get a refund? Please refer to our Non-Refund Policy. Generally, sessions are non-refundable.
`;

const faqTool = tool(
  async () => {
    return FAQ_DATA;
  },
  {
    name: "faq_tool",
    description: "Use this to answer frequently asked questions (FAQs) about MindSettler, such as session length, pricing, refund policies, and whether it is therapy.",
    schema: z.object({})
  }
);

module.exports = { faqTool };
