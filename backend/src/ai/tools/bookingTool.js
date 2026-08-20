const mongoose = require("mongoose");
const Slot = require("../../models/Slot");
const Appointment = require("../../models/Appointment");

// This is no longer a LangChain tool. It is an internal application service.
const bookingTool = async ({ mode, date, slot, paymentMethod, context, userId }) => {
  try {
    // 1. Ensure user is authenticated
    if (!userId) {
      return {
        success: false,
        error: "Authentication required. The user must be logged in to complete the booking."
      };
    }

    // 2. Validate and find the specific slot
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    const availableSlot = await Slot.findOne({
      date: {
        $gte: start,
        $lt: end
      },
      startTime: slot,
      sessionType: mode.toLowerCase(),
      isBooked: false,
      isActive: true
    });

    if (!availableSlot) {
      return {
        success: false,
        error: `Sorry, the slot at ${slot} on ${date} for ${mode} sessions is no longer available.`
      };
    }

    // 3. Save Appointment to MongoDB
    const appointment = new Appointment({
      user: userId,
      slot: availableSlot._id,
      sessionType: mode.toLowerCase(),
      paymentMethod: (paymentMethod || "upi").toLowerCase(),
      message: context || "",
      status: "pending",
      paymentStatus: "pending"
    });

    await appointment.save();

    // 4. Mark slot as booked
    availableSlot.isBooked = true;
    await availableSlot.save();

    // 5. Return success and the booking ID
    return {
      success: true,
      bookingId: appointment._id,
      message: "Booking successful! Your session is pending approval."
    };

  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { bookingTool };
