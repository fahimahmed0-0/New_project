// Calendar helpers. Instants are stored as UTC ISO strings; anything the user sees as
// "a day" (streaks, calendars, recovery logs) is a local YYYY-MM-DD in their timezone.

const formatters = new Map();

const formatterFor = (timeZone) => {
  if (!formatters.has(timeZone)) {
    formatters.set(timeZone, new Intl.DateTimeFormat('en-US', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    }));
  }
  return formatters.get(timeZone);
};

export const isValidTimeZone = (timeZone) => {
  try {
    formatterFor(timeZone);
    return true;
  } catch {
    return false;
  }
};

export const localDate = (instant, timeZone) => {
  const parts = Object.fromEntries(
    formatterFor(timeZone).formatToParts(new Date(instant)).map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
};

export const addDays = (date, days) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const daysBetween = (from, to) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);

// 0 = Monday … 6 = Sunday
export const weekdayOf = (date) => (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7;

export const startOfWeek = (date) => addDays(date, -weekdayOf(date));

export const monthOf = (date) => date.slice(0, 7);

export const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
