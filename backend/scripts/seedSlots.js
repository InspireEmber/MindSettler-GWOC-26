const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const connectDB = require('../src/config/db');
const Slot = require('../src/models/Slot');

async function seedSlots() {
  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessionTypes = ['online', 'offline'];
    const startHour = 10;
    const endHour = 17; // last slot starts at 16:00 for 1-hour duration

    const slotsToCreate = [];

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);

      for (const sessionType of sessionTypes) {
        for (let hour = startHour; hour < endHour; hour++) {
          const startTime = `${hour.toString().padStart(2, '0')}:00`;
          const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;

          slotsToCreate.push({
            date,
            startTime,
            endTime,
            sessionType,
            isActive: true,
            isAvailable: true,
            isBooked: false,
            generatedWeekStart: today,
          });
        }
      }
    }

    // Avoid duplicating existing slots with same date/startTime/sessionType
    let createdCount = 0;
    for (const slotData of slotsToCreate) {
      const exists = await Slot.findOne({
        date: slotData.date,
        startTime: slotData.startTime,
        sessionType: slotData.sessionType,
      });

      if (!exists) {
        await Slot.create(slotData);
        createdCount += 1;
      }
    }

    console.log(`Seeded ${createdCount} new slots for the next 7 days.`);
  } catch (err) {
    console.error('Error seeding slots:', err);
  } finally {
    process.exit(0);
  }
}

seedSlots();
