import { Time } from "@angular/common";
import { TimeTrip } from "./time";
import { BusType } from "./BusType";

export interface Trip {
    id: string,
    name: string;
    time: 
    {
        id: any,
        start_time: any,
        end_time: any,
        start_day: any,
        end_day: any
    };
    seats: {
        id: string,
        name: string,
        maxslot: number,
        numbers_floor: number,
        convenients: string,
        number_plate: string,
    };
    finished: boolean ;
}
