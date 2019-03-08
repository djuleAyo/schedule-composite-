export class DateUtil
{
    /**
     * Check if 2 dates represent the same moment in time.
     */
    static equal(date1: Date, date2: Date): boolean
    {
        return date1.getTime() === date2.getTime();
    }
}