const DATE_UNITS: Partial<{ [k in Intl.RelativeTimeFormatUnit]: number }> = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};
const rtf = new Intl.RelativeTimeFormat('es', {
  localeMatcher: 'best fit',
  numeric: 'auto',
  style: 'long',
});

const getSecondsDiff = (timestamp: string) =>
  (Date.now() - Date.parse(timestamp)) / 1000;
const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { value, unit } as {
        value: number;
        unit: Intl.RelativeTimeFormatUnit;
      };
    }
  }
  return false;
};

export function timeago(timestamp: string) {
  const secondsElapsed = getSecondsDiff(timestamp);
  const unitAndValue = getUnitAndValueDate(secondsElapsed);
  if (unitAndValue) {
    const { value, unit } = unitAndValue;
    return rtf.format(value, unit);
  }
  return undefined;
}
