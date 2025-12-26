export function getGoogleCalendarEventLink(eventId) {
  if (!eventId) return null;

  try {
    // Convert to base64 using utf-8
    const eid = Buffer.from(`${eventId} primary`, 'utf-8').toString('base64');
    return `https://www.google.com/calendar/event?eid=${eid}`;
  } catch (err) {
    console.error('Failed to encode calendar eventId:', err);
    return null;
  }
}
