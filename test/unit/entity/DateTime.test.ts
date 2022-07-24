import { DateTime } from 'luxon';

test('Should correctly create dates when using ISO 8601', () => {
    const actual = DateTime.fromISO('2022-01-02');
    expect(actual.day).toBe(2);
    expect(actual.month).toBe(1);
    expect(actual.year).toBe(2022);
    expect(actual.hour).toBe(0);
    expect(actual.minute).toBe(0);
    expect(actual.second).toBe(0);
    expect(actual.millisecond).toBe(0);
})

test('Should be -1 day when comparing diff between 2022-05-08 and 2022-05-09', () => {
    const actual = DateTime.fromISO('2022-05-08').diff(DateTime.fromISO('2022-05-09'), 'day');
    expect(actual.get('day')).toBe(-1);
})
