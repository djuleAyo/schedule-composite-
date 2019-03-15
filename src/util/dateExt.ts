export { }

declare global {
    interface Date {
        addDays(days: number, useThis?: boolean): Date;
        isToday(): boolean;
        clone(): Date;
        isAnotherMonth(date: Date): boolean;
        isWeekend(): boolean;
        isSameDate(date: Date): boolean;
        getStringDate(): String;
    }
}

Date.prototype.addDays = function (days: number): Date {
    if (!days) return this;
    let date = this;
    date.setDate(date.getDate() + days);

    return date;
};

Date.prototype.isToday = function (): boolean {
    let today = new Date();
    return this.isSameDate(today);
};

Date.prototype.clone = function (): Date {
    return new Date(+this);
};

Date.prototype.isAnotherMonth = function (date: Date): boolean {
    return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function (): boolean {
    return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function (date: Date): boolean {
    return (
        date && this.getFullYear() === date.getFullYear()
        && this.getMonth() === date.getMonth()
        && this.getDate() === date.getDate()
    );
};

Date.prototype.getStringDate = function (): String {
    let monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let today = new Date();
    if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay()) {
        return "Today";
    } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() + 1) {
        return "Tomorrow";
    } else if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay() - 1) {
        return "Yesterday";
    } else {
        return `${this.monthNames[this.getMonth()]} ${this.getDay()}, ${this.getFullYear()}`;   
    }
}