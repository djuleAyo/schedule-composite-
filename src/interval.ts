export class Interval {
    constructor(
        public start: Date,
        public end: Date,
    ) {
        if (start >= end) {
            this.start = end;
            this.end = start;
        }
    }

    duration() {
        return this.end.getTime() - this.start.getTime();
    }
    contains(something: Date | Interval) {
        if (something.constructor === Date) 
            return this.containsDate(<Date>something);
        return (
            this.containsDate((<Interval>something).start) 
            && this.containsDate((<Interval>something).end)
        )
    }
    // containsMonth(m: number): boolean {
    //     if ()
    // }
    containsDayOfWeek() {

    }
    isContained(i: Interval): boolean {
        return i.contains(this.start) && i.contains(this.end)
    }
    intersect(i: Interval): Interval {
        if (this.contains(i))       return new Interval(i.start,    i.end)
        if (i.contains(this))       return new Interval(this.start, this.end)
        if (i.contains(this.start)) return new Interval(this.start, i.end)
        if (i.contains(this.end))   return new Interval(i.start,    this.end)
        return undefined
    }
    private containsDate(date: Date): boolean {
        return date > this.start && date < this.end
    }
}