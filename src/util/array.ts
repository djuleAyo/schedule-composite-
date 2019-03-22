export class ArrayUtil {
    static range(start: number, end: number): Array<number> {
        const retVal = []
        for (let i = start; i <= end; i++) retVal.push(i)
        return retVal
    }
}