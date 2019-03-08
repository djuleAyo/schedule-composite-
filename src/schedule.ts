import { Composite } from "./composite";
import { TimeSet } from "./timeSet";

class Schedule extends Composite
{

    children: Array<any>;

    constructor(
    ) {
        super();
    }

    private encoding: Schedule.Encoding;
    private duration: [Date, Date];
    private occurence: TimeSet;
}


module Schedule
{
    export enum Encoding
    {
        /**
         * If absolute encoding children may are saved with explicit date values
         */
        ABSOLUTE,
        /**
         * If relative children are saved in num of ms from start of the 
         * occurrence. 
         */
        RELATIVE
    }
}