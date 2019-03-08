import { IntervalPattern } from "./intervalPattern";

/**
 * Defines any set of time intervals. Since the set may be infinite an imlicit
 * representation must be used. Cron-like pattern are choosen
 * To access sets of infinite cardinality getOccurres method must be used
 */
export class TimeSet
{
    /**
     * Set may be infinite since with cron patterns we can easily define such 
     * sets.
     * By default the set is empty so default value is false.
     */
    isInfinite = false;

    private explicitMembers: Array<[Date, Date]>;
    private patterns: Array<IntervalPattern>;

    getOccurrence(interval: [Date, Date]): Array<[Date, Date]>
    {
        return [];
    }
}