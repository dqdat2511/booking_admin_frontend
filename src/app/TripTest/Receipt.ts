import { Destination, TripModel } from "./TripModel";
export interface Receipt{
    id_trip:number
    destination : Destination[];
    client: string;
    seat:Array<string>
    total:number
  }
export class ReceiptModel{
    private receipt : Receipt[] = [];
    createReceipt(receiptCreated: Receipt[]){
        receiptCreated = this.receipt
   }
}