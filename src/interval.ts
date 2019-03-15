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

    getDuration() {
        return this.end.getTime() - this.start.getTime();
    }

    private containsDate(date: Date): boolean {
        return date > this.start && date < this.end
    }

    contains(something: Date | Interval) {
        if (something.constructor === Date) 
            return this.containsDate(<Date>something);
        
        return (
            this.containsDate((<Interval>something).start) 
            && this.containsDate((<Interval>something).end)
        )
    }

    isContained(i: Interval): boolean {
        let t = new Date();
        return i.contains(this.start) && i.contains(this.end)
    }

}