import { DateTime } from 'luxon';

export class DateTimeHelper {
  // Define constants for date formats and time zones
  static readonly DATE_FORMATS = {
    FULL_DATE: 'yyyy-LL-dd',
    FULL_DATE_TIME: 'yyyy-LL-dd HH:mm:ss',
    TIME: 'HH:mm:ss',
    SHORT_DATE: 'LL-dd',
    CUSTOM: 'dd MMMM yyyy, h:mm:ss a'
  };

  static readonly TIME_ZONES = {
    UTC: 'UTC',
    IST: 'Asia/Kolkata',
    EST: 'America/New_York',
    PST: 'America/Los_Angeles',
    CST: 'America/Chicago'
  };

  /**
   * Get current date and time in the specified format and time zone.
   * @param format - The date format.
   * @param timeZone - The time zone.
   * @returns The formatted date and time string.
   */
  static getCurrentDateTime(format: string = this.DATE_FORMATS.FULL_DATE_TIME, timeZone: string = this.TIME_ZONES.UTC): string {
    return DateTime.now().setZone(timeZone).toFormat(format);
  }

  /**
   * Get date and time for a specific timestamp in the specified format and time zone.
   * @param timestamp - The timestamp to convert.
   * @param format - The date format.
   * @param timeZone - The time zone.
   * @returns The formatted date and time string.
   */
  static getDateTimeForTimestamp(timestamp: number, format: string, timeZone: string): string {
    return DateTime.fromMillis(timestamp).setZone(timeZone).toFormat(format);
  }

  /**
   * Convert date string from one time zone to another.
   * @param dateString - The date string to convert.
   * @param fromTimeZone - The original time zone.
   * @param toTimeZone - The target time zone.
   * @param format - The date format.
   * @returns The converted date and time string.
   */
  static convertTimeZone(dateString: string, fromTimeZone: string, toTimeZone: string, format: string): string {
    return DateTime.fromFormat(dateString, format, { zone: fromTimeZone }).setZone(toTimeZone).toFormat(format);
  }

     /**
   * Get the day of the week for a given date string.
   * @param dateString - The date string.
   * @param format - The format of the date string.
   * @returns The day of the week.
   */
     static getDayOfWeek(date: Date): string {
      return DateTime.fromJSDate(date).toFormat('cccc');
    }
  
    /**
     * Get the week of the month for a given date string.
     * @param dateString - The date string.
     * @param format - The format of the date string.
     * @returns The week of the month.
     */
    static getWeekOfMonth(date: Date): number {
      const dt = DateTime.fromJSDate(date);
      const firstOfMonth = dt.startOf('month');
      const diff = dt.diff(firstOfMonth, 'days').days;
      return Math.ceil((diff + 1) / 7);
    }
    

  static getCurrentTimestampUTC(): number {
    return DateTime.now().toUTC().toMillis();
  }

  static  getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
}