import { assert } from 'chai';
import { Interval } from '../src/interval';

describe('class Interval', () => {

    //isContainedIn intersect iterate find equals
    const dateRef = new Date()
    const timeDelta = 100

    let i: Interval;
    let i_: Interval;
    let mid: Interval;
    let midDate: Date;
    let history: Date;
    let day: Interval;

    beforeEach(() => {

        i = new Interval(dateRef, new Date(dateRef.getTime() + timeDelta))
        i_ = new Interval(new Date(dateRef.getTime() + timeDelta), dateRef)
        midDate = new Date(dateRef.getTime() + 50)
        mid = new Interval(midDate, dateRef)
        history = new Date(0);
        day: Interval;
    })
    describe('constructor', () => {
        it('should take 2 dates and set the smaller as interval start, not depending on argument order', () => {
            assert.isOk(i.start.getTime() === i_.start.getTime())
            assert.isOk(i.end.getTime() === i_.end.getTime())
        });
        it('should throw when same dates are given because of simplicity of interface - use date instead', () => {
            assert.throws(() => {
                new Interval(dateRef, dateRef);
            })
        })
    });
    describe('duration', () => {
        it('should return duration of the interval in milliseconds', () => {
            assert.equal(i.duration(), timeDelta);
        });
    });
    describe('contains', () => {
        it('should check if a given date is in the interval', () => {
            assert.isTrue(i.contains(midDate))
            assert.isFalse(i.contains(history))
        });
        it(`should not contain end point since it is an interval`, () => {
            assert.isFalse(i.contains(dateRef));
            assert.isFalse(i.contains(new Date(dateRef.getTime() + timeDelta)))
        })
        it('should check if a given interval is in the interval', () => {
            assert.isOk(i.contains(mid));
            assert.isFalse(i.contains(new Interval(history, dateRef)))
        })
        describe(`contains unit value`, () => {
            it(`should thow if a numeric value is given but no unit is given`, () => {
                assert.throws(() => {
                    i.contains(5);
                })
            })
            it(`should check if a given ms value is contained in the interval`, () => {
                const start = dateRef.getMilliseconds()
                const mid = new Date(dateRef.getMilliseconds() + 1).getMilliseconds()
                const end = start + timeDelta

                assert.isTrue(i.contains(mid, 'ms'))
                assert.isFalse(i.contains(start, 'ms'))
                assert.isFalse(i.contains(start - 100, 'ms'))
                assert.isFalse(i.contains(end, `ms`))
                assert.isFalse(i.contains(end + 1, `ms`))
            })

            // dw dm s min h m
            
        })
        
    });
});
