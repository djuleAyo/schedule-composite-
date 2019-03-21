export type TimeUnit = 'ms' | 's' | 'min' | 'h' | 'dm' | 'm' | 'dw';
export class DateUtil
{
    static msValues = {
        ms: 1,
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
    static dateMethodForUnit = {
        ms: 'Milliseconds',
        s: 'Seconds',
        min: 'Minutes',
        h: 'Hours',
        dm: 'Date',
        m: 'Month',
        dw: 'Day',
    }
    static after(original: Date, ms: number): Date  {
        return new Date(original.getTime() + ms)    }
    static before(original: Date, ms: number): Date {
        return new Date(original.getTime() - ms)    }
    
    
    /**
     * Check if 2 dates represent the same moment in time. Don't have to be the same object
     */
    static equal(date1: Date, date2: Date): boolean {
        return date1.getTime() === date2.getTime();
    }
    static isSameDate(d1: Date, d2: Date): boolean {
        return (d1.getFullYear() === d2.getFullYear()
            && d1.getMonth() === d2.getMonth()
            && d1.getDate() === d2.getDate()
        )
    }

    
    static isValidTimeUnitValue(value: number, unit: string): boolean {
        if (value !== Math.floor(value)) 
            throw new Error(`Must use integer for value of a specific time unit`)
        return (value >= DateUtil.timeUnitValue[unit][0] 
            && DateUtil.timeUnitValue[unit][1] > value)
    }
    static dateStringEu(d: Date): string {
        return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
    }
    static timeString(d: Date): string {
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
    static dateTimeString(d: Date): string {
        return `${DateUtil.dateStringEu(d)} ${DateUtil.timeString(d)}`;
    }

}

// ✅❓ ------------------------------------------------------------------------

if (process.argv.length > 2 && process.argv[2] === 'sa-test') {
    console.log(DateUtil.dateStringEu(new Date));
    console.log(DateUtil.timeString(new Date));
}