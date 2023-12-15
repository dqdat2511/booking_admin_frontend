import { Time } from "@angular/common";
import { TimeTrip } from "./time";
import { BusType } from "./BusType";

export interface Trip {
    id: string,
    name: string;
    timetrip: TimeTrip;
    type: BusType;
    finished: boolean ;
}
