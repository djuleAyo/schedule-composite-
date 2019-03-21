import {assert} from 'chai';
import { DateUtil } from '../src/util/dateUtil';

describe('class DateUtil', () => {

    const timeDelta = 100;
    let date: Date;
    let dateCopy: Date;
    let dateAfter: Date;
    let dateBefore: Date;
    let history: Date;

    beforeEach(() => {
        date = new Date();
        dateCopy = new Date(date.getTime())
        dateAfter = new Date(date.getTime() + timeDelta);
        dateBefore = new Date(date.getTime() - timeDelta);
        history = new Date(0);

    })
    describe('equal', () => {
        it('should return true for same dates', () => {
            assert.isTrue(DateUtil.equal(date, dateCopy));
        });
        it('should be reflective', () => {
            assert.isTrue(DateUtil.equal(date, date))
        });
        it('should return false when not same moments are given', () => {
            assert.isFalse(DateUtil.equal(date, dateAfter))
        });
    });

    describe('after', () => {
        it('should return a date constructed based on passed date and delay in milliseconds', () => {
            assert.isTrue(date.getTime() === dateAfter.getTime() - timeDelta);
        });
    });
    describe('before', () => {
        it('should return a date constructed based on passed date and delay in milliseconds', () => {
            assert.isTrue(date.getTime() === dateBefore.getTime() + timeDelta);
        });
    });
    describe('isSameDate', () => {
        it('should be reflective', () => {
            assert.isTrue(DateUtil.isSameDate(date, date));
        });
        it('should return true for dates in a same day', () => {
            assert.isTrue(DateUtil.isSameDate(date, dateAfter));
            assert.isTrue(DateUtil.isSameDate(date, dateBefore));
        });
        it('should return false when not in same day', () => {
            assert.isFalse(DateUtil.isSameDate(date, history));
        });
    });
    describe('isValidTimeUnitValue', () => {
        it('should return false if no integer is given', () => {
            assert.throws(() => {
                DateUtil.isValidTimeUnitValue(1.55, 'ms');
            })
        });

        it('should return true for milliseconds from 0 - 999 inclusive', () => {
            assert.isTrue(DateUtil.isValidTimeUnitValue(0, 'ms'))
            assert.isTrue(DateUtil.isValidTimeUnitValue(999, 'ms'))
            assert.isTrue(DateUtil.isValidTimeUnitValue(500, 'ms'))
        });
        it('should return false for milliseconds outside of 0 - 999', () => {
            assert.isFalse(DateUtil.isValidTimeUnitValue(-1, 'ms'))
            assert.isFalse(DateUtil.isValidTimeUnitValue(1000, 'ms'))
            assert.isFalse(DateUtil.isValidTimeUnitValue(100000, 'ms'))
            assert.isFalse(DateUtil.isValidTimeUnitValue(-53, 'ms'))
        });
    });

});