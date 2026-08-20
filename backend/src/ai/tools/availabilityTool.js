const { tool } = require("@langchain/core/tools");
const { z } = require("zod");
const Slot = require("../../models/Slot");

const availabilityTool = tool(
  async ({ date, mode }) => {
    try {
      let query = { isBooked: false, isActive: true };

      if (date) {
        const targetDate = new Date(date);
        query.date = {
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          $lt: new Date(targetDate.setHours(23, 59, 59, 999))
        };
      } else {
        // If no date specified, look from today onwards
        query.date = { $gte: new Date(new Date().setHours(0, 0, 0, 0)) };
      }

      if (mode) {
        query.sessionType = mode.toLowerCase();
      }

      console.log("AvailabilityTool Query:", JSON.stringify(query));
      const slots = await Slot.find(query).sort({ date: 1, startTime: 1 }).limit(10);
      console.log("Found slots:", slots.length);
      
      if (slots.length === 0) {
        return "No available slots found for the requested criteria.";
      }

      const formattedSlots = slots.map(s => 
        `- ${s.date.toDateString()} at ${s.startTime} (${s.sessionType})`
      ).join("\n");

      return `Here are some available slots:\n${formattedSlots}\n\n*Note: To actually book these slots, please visit the booking page.*`;
    } catch (error) {
      return `Error retrieving slots: ${error.message}`;
    }
  },
  {
    name: "availability_tool",
    description: "Use this to check for available session slots. You can optionally filter by a specific date (YYYY-MM-DD) or mode (online/offline).",
    schema: z.object({
      date: z.string().optional().describe("Optional date in YYYY-MM-DD format"),
      mode: z.enum(["online", "offline"]).optional().describe("Optional session mode")
    })
  }
);

module.exports = { availabilityTool };
