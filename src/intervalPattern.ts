import { DiminishedCron } from './cron/diminishedCron';

/**
 * Cron may define explicit Date object or set of descrete Dates. We need set 
 * of intervals. One approach would be to use 2 patterns but that would require
 * match up strategy between those 2 patterns. Another approach is used. We use
 * @link DiminishedCron to describe intervals. To make DiminishedCron pattern
 * an IntervalPattern cron interval syntax must be used in at least one place.
 * i.e. * 0-10 1,2 is valid interval pattern.
 */
export class IntervalPattern extends DiminishedCron
{
    constructor(
        pattern: string
    ) {
        super(pattern);
    }
}