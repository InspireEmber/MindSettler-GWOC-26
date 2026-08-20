const { tool } = require("@langchain/core/tools");
const { z } = require("zod");

const POLICY_DATA = `
MindSettler Policies:

1. Confidentiality Policy: All sessions and communications are strictly confidential. We do not share your personal information or session notes with any third parties without explicit consent, except where required by law (e.g., immediate threat to life).
2. Non-Refund Policy: Session fees are non-refundable once the session is booked and confirmed.
3. Cancellation & Rescheduling: You must reschedule at least 24 hours prior to the session time. Late cancellations or no-shows are not eligible for a refund.
`;

const policyTool = tool(
  async () => {
    return POLICY_DATA;
  },
  {
    name: "policy_tool",
    description: "Use this to fetch details regarding MindSettler's legal policies, including Confidentiality, Non-Refund, and Cancellation policies.",
    schema: z.object({})
  }
);

module.exports = { policyTool };
