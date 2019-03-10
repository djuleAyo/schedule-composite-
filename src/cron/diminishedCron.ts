import { diminishedCronGrammar as cronGrammar } from "./cronGrammar"

const peg = require('pegjs')

type Interval = ["interval", number, number]
type Range = ["range", number, number]
type PlaceElement = Interval | Range | "*"
type PatternObject =  {
    ms: Array<PlaceElement>, 
    s: Array<PlaceElement>,
    min: Array<PlaceElement>,
    h: Array<PlaceElement>,
    dom: Array<PlaceElement>,
    m: Array<PlaceElement>,
    dow: Array<PlaceElement>,
}
const TimeUnit = ["ms", "s", "min", "h", "dom", "m", "dow"]
const TimeUnitValue = {
    // following are mathematical half segments [)
    ms: [0, 1000],
    s: [0, 60],
    min: [0, 60],
    h: [0, 24],
    dom: [1, 32],
    m: [1, 13],
    dow: [0, 8]

}
/**
 * DeminishedCron can easily describe daily patterns, monthly patterns, hourly 
 * patterns, ... And those are the onces we need to describe the most, if not
 * always. If you have reoccurring pattern which reoccurres once a year
 * use [Date, Date] instead. DiminishedCron is same as cron but may have fewer
 * places then cron does.
 */
export class DiminishedCron
{
    static parser = peg.generate(cronGrammar)

    patternObject: PatternObject

    constructor(
        pattern: string
    ) {
        try {
            this.patternObject = DiminishedCron.parser.parse(pattern)
        } catch (error) {
            throw error
        }
        this.purgeStars()
        this.checkValues()
    }

    private purgeStars() {
        TimeUnit.forEach(unit => {
            const unitVal = this.patternObject[unit]
            if (unitVal && unitVal.length === 0 && unitVal[0] === "*")
               this.patternObject[unitVal] = undefined
        })
    }

    /**
     * Throw on level of the method for more verbose errors
     */
    private checkValues(): void {

        for (let unit of TimeUnit) {
            let value = this.patternObject[unit]
            
            if (!value) continue

            value.forEach(element => {

                console.log(`checking for `, element, unit)
                
                if (typeof(element) === 'number' && !this.checkValue(element, unit)) 
                    throw new Error(`Invalid value ${element} for unit ${unit}`)
                
                if(typeof(element) !== 'number' && !this.checkArrayValues(element.slice(1), unit))
                    throw new Error(`Invalid values ${element} for unit ${unit}`)
            });
        }
    }

    private checkValue(value: number, unit: string): boolean {
        console.log(`check value ${value} ${unit}`);
        
        return value >= TimeUnitValue[unit][0] && TimeUnitValue[unit][1] > value
    }

    private checkArrayValues(array: Array<number>, unit: string): boolean {
        console.log(`checking array values`, array, unit);
        
        if (array[0] > array[1])
            throw new Error(`Both interval and range sytax require left limit to be smaller.`);
        
        for (let x of array) {
            if (!this.checkValue(x, unit)) return false
        }
        return true
    }
}


// ✅❓ ------------------------------------------------------------------------
if (process.argv.length > 2 && process.argv[2] === 'sa-test')
    runSaTest()

function runSaTest() {
    let test = new DiminishedCron('0 3~44,5-7,8 3-5,6 * * 5');
    console.log(test.patternObject);
    
}
