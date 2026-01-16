// Optional Google Calendar integration helpers.
// Currently implemented as no-op stubs unless GOOGLE_CALENDAR_ENABLED === 'true'.
// When disabled or misconfigured, these functions resolve without throwing,
// so booking/admin flows remain non-blocking.

// In the future, you can wire this with googleapis and a service account or OAuth2
// and populate eventId/htmlLink from the created event.

const { google } = require("googleapis");

const calendarEnabled = process.env.GOOGLE_CALENDAR_ENABLED === "true";

function isGoogleCalendarEnabled() {
  return calendarEnabled;
}

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/calendar"]
);
const calendar = google.calendar({ version: "v3", auth });

async function createEvent({ appointment, slot, user, meetingLink }) {
  if (!appointment || !slot || !user) {
    throw new Error("Missing required data to create calendar event");
  }

  // slot.date is already a Date object
  const startDateTime = new Date(slot.date);
  const endDateTime = new Date(slot.date);

  const [startHour, startMinute] = slot.startTime.split(":").map(Number);
  const [endHour, endMinute] = slot.endTime.split(":").map(Number);

  startDateTime.setHours(startHour, startMinute, 0, 0);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  // 🔒 Safety check (VERY IMPORTANT)
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    throw new Error("Invalid slot date or time");
  }

  const descriptionLines = [
    `Client Name: ${user.name}`,
    `Client Email: ${user.email}`,
    `Session Type: ${slot.sessionType}`,
    meetingLink ? `Meeting Link: ${meetingLink}` : null,
    `Appointment ID: ${appointment._id}`,
  ].filter(Boolean);

  const event = {
    summary: `(MindSettler)Session with Parnika`,
    description: descriptionLines.join("\n"),
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "Asia/Kolkata",
    },
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: event,
  });

  console.log("Google Event API Response:", {
    id: response.data.id,
    htmlLink: response.data.htmlLink,
  });


  return {
    eventId: response.data.id,
    htmlLink: response.data.htmlLink,
  };
}





// async function deleteEvent(eventId) {
//   if (!isGoogleCalendarEnabled() || !eventId) {
//     return;
//   }

//   // TODO: Implement real Google Calendar event deletion using googleapis.
// }
async function deleteEvent(eventId) {
  if (!eventId) return;

  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId
  });
}


module.exports = {
  isGoogleCalendarEnabled,
  createEvent,
  deleteEvent,
};