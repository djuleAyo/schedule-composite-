import {assert} from 'chai';
import {Interval} from '../src/interval';

describe('class Interval', () => {

    let i: Interval;
    let i_: Interval;
    let mid: Interval;
    let midDate: Date;

    beforeEach(() => {
        const dateRef = new Date()

        i = new Interval(dateRef, new Date(dateRef.getTime() + 100))
        i_ = new Interval(new Date(dateRef.getTime() + 100), dateRef)
        midDate = new Date(dateRef.getTime() + 50)
        mid = new Interval(midDate, dateRef)
    })
   describe('constructor', () => {
       it('should take 2 dates and set the smaller as interval start, not depending on argument order', () => {
           assert.isOk(i.start.getTime() === i_.start.getTime())
           assert.isOk(i.end.getTime() === i_.end.getTime())
       });
   });
   describe('duration', () => {
        it('should return duration of the interval in milliseconds', () => {
            assert.equal(i.duration(), 100);
       });
   });
   describe('contains', () => {
       it('should check if a given date is in the interval', () => {
            assert.isOk(i.contains(midDate))
       });
       it('should check if a given interval is in the interval', () => {
           assert.isOk(i.contains(mid));
       })
   });
});