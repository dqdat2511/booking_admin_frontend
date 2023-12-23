import { Client } from "./Client";


export interface Ticket{
    customer_name: string,
    customer_phone: string,
    address: string,
    num_ticket: number,
    trip: {id : string},
    sloots: [{id: string}]
}