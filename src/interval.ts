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
        if (something.constructor === Interval)
            return ( this.containsDate((<Interval>something).start) 
            && this.containsDate((<Interval>something).end))
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
     */
    find(ms:number, cb: (date: Date) => boolean): Date {
        let after = this.start
        while (after < this.end) {
            if (cb(after)) return after;
            after = DateUtil.after(after, ms);}
        return void 0
    }

    toString() {return `(${this.start}, ${this.end})`}

    private containsDate(date: Date): boolean {
        return date > this.start && date < this.end
    }
    private containsUnit(value: number, unit: TimeUnit): boolean {
        if (DateUtil.isValidTimeUnitValue(value, unit))
            throw new Error(`Value ${value} is not valid for time unit ${unit}`);
        const dateMethod = `get${DateUtil.dateMethodForUnit[unit]}`;
        const iterationStep = this.getIterationStep(unit);
        const found = this.find(iterationStep, date => 
            date[dateMethod]() === value)
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

    console.log(test.contains(5, 'h'));
}