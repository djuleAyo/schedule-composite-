import { diminishedCronGrammar as cronGrammar } from "./cronGrammar"
import { DateUtil, TimeUnit } from "../util/dateUtil";
import { Interval } from "../interval";
import { ArrayUtil } from "../util/array";

const peg = require('pegjs')

type Range = ["range", number, number]
type PlaceElement = ["interval", number, number] | Range | "*" | number
type PatternObject = {
  ms: Array<PlaceElement>,
  s: Array<PlaceElement>,
  min: Array<PlaceElement>,
  h: Array<PlaceElement>,
  dm: Array<PlaceElement>,
  m: Array<PlaceElement>,
  dw: Array<PlaceElement>,
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
export class DiminishedCron {
  static parser = peg.generate(cronGrammar)

  patternObject: PatternObject

  constructor(pattern: string) {
    try {
      this.patternObject = DiminishedCron.parser.parse(pattern)
      this.purgeStars()
      this.checkPatternSemantics()
      this.purgeRanges()
      this.purgeIntervals()
    } catch (error) {
      throw error
    }
  }

  getTimeSet(i: Interval): Array<Interval | Date> {
    const retVal = []



    return retVal
  }


  purgeIntervals() {
    
  }

  /* PRIVATE ⛔️-----------------------------------------------------------------*/
  /**
   * Make places made of * undefined
   */
  private purgeStars() {
    TimeUnit.forEach(unit => {
      const unitVal = this.patternObject[unit]

      if (!unitVal || unitVal.length === 1 && unitVal[0] === "*")
        this.patternObject[unit] = void 0
    })
  }
  private purgeRanges() {
    this.iteratePlaces((place, unit) => {
      let ranges = place.filter(placeElem => this.isRange(placeElem))
      this.patternObject[unit] = place.filter(placeElem => !this.isRange(placeElem))
      
      ranges.forEach(range => {
        const values = ArrayUtil.range(<number>range[1], <number>range[2])
        values.forEach(value => {
          if(!(this.patternObject[unit].find(x => x === value)))
          this.patternObject[unit].push(value)
        })
      })
    })
  }

  private isRange(a: PlaceElement): boolean {
    return a.constructor === Array && a[0] === 'range'
  }
  private spreadRange(r: Range): Array<number> {
    const retVal = []
    for (let i = r[1]; i <= r[2]; i++)
      retVal.push(i)
    return retVal
  }

  private iteratePlaces(cb: (place: Array<PlaceElement>, unit: TimeUnit) => void) {
    for (let unit of TimeUnit) {
      let value = this.patternObject[unit];
      if (!value) continue
      cb(value, <TimeUnit>unit);
    }
  }
  /**
   * Check if patternObject satisfies TimeUnitValue 
   */
  checkPatternSemantics(): void {
    this.iteratePlaces(this.checkPlaceSemantics.bind(this))
  }

  checkPlaceSemantics(place: Array<any>, unit): void {
    place.forEach(element => {
      if (typeof (element) === 'number'
        && !DateUtil.isValidTimeUnitValue(element, unit))
        throw new Error(`Invalid value ${element} for unit ${unit}`)

      if (typeof (element) !== 'number'
        && !this.checkArrayValues(element.slice(1), unit))
        throw new Error(`Invalid values ${element} for unit ${unit}`)
    });
  }
  /**
   * Now used for both interval and range
   */
  checkArrayValues(array: Array<number>, unit: string): boolean {
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
