import { diminishedCronGrammar as cronGrammar } from "./cronGrammar"
import { DateUtil } from "../util/dateUtil";

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
const TimeUnit = ["ms", "s", "min", "h", "dm", "m", "dw"]
const timeUnitValue = DateUtil.timeUnitValue;
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

    constructor(pattern: string) {
        try {
            this.patternObject = DiminishedCron.parser.parse(pattern)
            this.purgeStars()
            this.checkPatternSemantics()
        } catch (error) {
            throw error
        }
    }

    getTimeSet(
        start = new Date(), 
        end = DateUtil.after(new Date(), DateUtil.msValues.d)
    ) {

    }

/* PRIVATE ⛔️-----------------------------------------------------------------*/
    /**
     * Make places made of * undefined
     */
    private purgeStars() {
        TimeUnit.forEach(unit => {
            const unitVal = this.patternObject[unit]
            
            if (!unitVal || unitVal.length === 1 && unitVal[0] === "*")
               this.patternObject[unit] = undefined
        })
    }

    /**
     * Check if patternObject satisfies TimeUnitValue 
     */
    private checkPatternSemantics(): void {
        for (let unit of TimeUnit) {
            let value = this.patternObject[unit]
            
            if (!value) continue

            this.checkPlaceSemantics(value, unit);
        }
    }

    private checkPlaceSemantics(place: Array<any>, unit): void {
        place.forEach(element => {
            if (typeof(element) === 'number' 
            && !DateUtil.isValidTimeUnitValue(element, unit)) 
                throw new Error(`Invalid value ${element} for unit ${unit}`)
            
            if(typeof(element) !== 'number' 
            && !this.checkArrayValues(element.slice(1), unit))
                throw new Error(`Invalid values ${element} for unit ${unit}`) });}
    /**
     * Now used for both interval and range
     */
    private checkArrayValues(array: Array<number>, unit: string): boolean {
        if (array[0] > array[1])
            throw new Error(
                `Both interval and range syntax require left limit to be smaller.`);
        for (let x of array) {
            if (!DateUtil.isValidTimeUnitValue(x, unit)) return false
        }
        return true
    }
/**/
}


// ✅❓ ------------------------------------------------------------------------
if (process.argv.length > 2 && process.argv[2] === 'sa-test')
    runSaTest()

function runSaTest() {
    let test = new DiminishedCron('0 3~44,5-7,8 3-5,6 * * 5');
    console.log(test.patternObject);
    
}
