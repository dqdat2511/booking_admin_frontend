import { Client } from "./Client";


export interface Ticket{
    id?:string;
    customer_name: string,
    customer_phone: string,
    address?: string,
    trip: {id : string},
    id_seat: {id: string}
}