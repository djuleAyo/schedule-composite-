import { DateUtil, TimeUnit } from "./util/dateUtil";

export class Interval {
    constructor(
        public start = new Date(),
        public end = DateUtil.after(new Date(), DateUtil.msValues.d),
    ) {
        if (DateUtil.equal(start, end)) 
            throw new Error(`Don't use 0 interval. Use Date instead`)
        if (start >= end) {
            this.start = end;
            this.end = start;
        }
    }

    duration() {
        return this.end.getTime() - this.start.getTime();
    }
    /**
     * Chooses which contains method should be called.
     */
    contains(something: Date | Interval | number, unit?: TimeUnit): boolean {
        if (something.constructor === Date) 
            return this.containsDate(<Date>something);
        if (something.constructor === Interval) {
            const start = (<Interval>something).start;
            const end = (<Interval>something).end;
            return ((this.containsDate(start) || DateUtil.equal(this.start, start))
                && (this.containsDate(end) || DateUtil.equal(this.end, end))
            )
        }
        if (typeof(something) === 'number') {
            if (unit === undefined) 
                throw new Error('Unit must be provided when first argument is a number.');
            return this.containsUnit(something, unit);
        }
    }
    isContainedIn(i: Interval): boolean {
        return i.contains(this.start) && i.contains(this.end)
    }
    intersect(i: Interval): Interval {
        if (this.contains(i))       return new Interval(i.start,    i.end)
        if (i.contains(this))       return new Interval(this.start, this.end)
        if (i.contains(this.start)) return new Interval(this.start, i.end)
        if (i.contains(this.end))   return new Interval(i.start,    this.end)
        return void 0
    }
    iterate(ms: number, cb: (date: Date) => void): void {
        let after = DateUtil.after(this.start, ms);
        while (after < this.end) {
            cb(after); 
            after = DateUtil.after(after, ms);}
    }
    /**
     * Default granulation for date is 1 ms. To avoid all that processing ms 
     * param is not optional
     * Start is skipped only when ms. Interval is not of 0 length but does not
     * contain star and end point. If measuring in ms then it is possible to not
     * contain start/end. Otherwise we are checking greater time unit but interval
     * is no 0 length so it must contain and start should not be skipped
     */
    find(ms:number, cb: (date: Date) => boolean, skipStart = false): Date {
        let after;
        if(skipStart) after = DateUtil.after(this.start, ms) 
        else after = this.start
        while (after < this.end) {
            if (cb(after)) return after;
            after = DateUtil.after(after, ms);}
        return void 0
    }

    toString() {
        const du = DateUtil;
        if (DateUtil.isSameDate(this.start, this.end)) {
            return `${du.dateStringEu(this.start)} ${du.timeString(this.start)}-${du.timeString(this.end)}`
        }
        return `${du.dateStringEu(this.start)} ${du.timeString(this.start)}\t${du.dateStringEu(this.end)} ${du.timeString(this.end)}`
    }
    equals(i: Interval): boolean {
        return (
            DateUtil.equal(this.start, i.start)
            && DateUtil.equal(this.end, i.end)
        )
    }

    private containsDate(date: Date): boolean {
        return date > this.start && date < this.end
    }
    private containsUnit(value: number, unit: TimeUnit): boolean {
        if (!DateUtil.isValidTimeUnitValue(value, unit))
            throw new Error(`Value ${value} is not valid for time unit ${unit}`);
        const dateMethod = `get${DateUtil.dateMethodForUnit[unit]}`;
        const iterationStep = this.getIterationStep(unit);
        const found = this.find(iterationStep, date => 
            date[dateMethod]() === value,
            unit === 'ms' ? true : false)
        return !!found
    }
    /**
     * Returns value by which to increment dates when searching for a value of
     * given unit.
     */
    private getIterationStep(unit: TimeUnit): number {
        const corrections = {
            ms: 1,
            s: 1000,
            min: 60*1000,
            h: 60*60*1000,
            dm: 24*60*60*1000,
            m: 28*24*60*60*1000,
            dw: 24*60*60*1000,
        }
        let iterationStep = Object.assign(DateUtil.msValues, corrections);
        return iterationStep[unit];
    }
}

// ✅❓-------------------------------------------------------------------------
if (process.argv.length > 2 && process.argv[2] === 'sa-test') {
    let test = new Interval();
    console.log( 'test is ' + test );
    

    console.log(test.contains(5, 'h'));
}