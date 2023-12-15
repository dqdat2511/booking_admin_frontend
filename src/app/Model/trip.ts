import { Time } from "@angular/common";
import { BusType } from "./BusType";

export interface Trip {
    name: string;
    timetrip: Time;
    type: BusType;
}
