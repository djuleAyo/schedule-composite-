export class DateUtil
{
    /**
     * Check if 2 dates represent the same moment in time.
     */
    static equal(date1: Date, date2: Date): boolean
    {
        return date1.getTime() === date2.getTime();
    }

    static msValues = {
        s: 1000,
        min: 60*1000,
        h: 60*60*1000,
        d: 24*60*60*1000,
        w: 7*24*60*60*1000
    }

    static timeUnitValue = {
        // following are mathematical half segments [)
        ms: [0, 1000],
        s: [0, 60],
        min: [0, 60],
        h: [0, 24],
        dm: [1, 32],
        m: [1, 13],
        dw: [0, 8]
    
    }

}
