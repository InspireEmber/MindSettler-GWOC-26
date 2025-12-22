// Optional Google Calendar integration helpers.
// Currently implemented as no-op stubs unless GOOGLE_CALENDAR_ENABLED === 'true'.
// When disabled or misconfigured, these functions resolve without throwing,
// so booking/admin flows remain non-blocking.

// In the future, you can wire this with googleapis and a service account or OAuth2
// and populate eventId/htmlLink from the created event.

function isGoogleCalendarEnabled() {
  return process.env.GOOGLE_CALENDAR_ENABLED === 'true';
}

async function createEvent({ appointment, slot, user, meetingLink }) {
  if (!isGoogleCalendarEnabled()) {
    return null;
  }

  // TODO: Implement real Google Calendar event creation using googleapis.
  // This stub intentionally does not call external APIs.
  // It returns null so callers can safely skip calendar linkage.

  return null;
}

async function deleteEvent(eventId) {
  if (!isGoogleCalendarEnabled() || !eventId) {
    return;
  }

  // TODO: Implement real Google Calendar event deletion using googleapis.
}

module.exports = {
  isGoogleCalendarEnabled,
  createEvent,
  deleteEvent,
};