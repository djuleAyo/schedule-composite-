import { cronGrammar as cronGrammar } from "./cronGrammar";

const peg = require('pegjs');

/**
 * DeminishedCron can easily describe daily patterns, monthly patterns, hourly 
 * patterns, ... And those are the onces we need to describe the most, if not
 * always. If you have reoccurring pattern which reoccurres once a year
 * use [Date, Date] instead. DiminishedCron is same as cron but may have fewer
 * places then cron does.
 */
export class DiminishedCron
{
    static parser = peg.generate(cronGrammar);

    constructor(
        private pattern: string
    ) {}
}


// ✅❓ ------------------------------------------------------------------------
if (process.argv.length > 2 && process.argv[2] === 'sa-test')
    runSaTest();


function runSaTest() {
    try {
        DiminishedCron.parser.parse('* * * * * *')
        DiminishedCron.parser.parse('* * * * *')
        DiminishedCron.parser.parse('* * * *')
        DiminishedCron.parser.parse('* * *')
        DiminishedCron.parser.parse('* *')
        DiminishedCron.parser.parse('*')
        DiminishedCron.parser.parse('1')
        DiminishedCron.parser.parse('1-60')
        DiminishedCron.parser.parse('1-60,50')
        DiminishedCron.parser.parse('*')
    } catch (error) {
        throw error;
    }
}
