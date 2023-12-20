import { Component, Input } from '@angular/core';
import {Sort, MatSortModule} from '@angular/material/sort';
import { Receipt } from 'src/app/TripTest/Receipt';
import { Destination } from 'src/app/TripTest/TripModel';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {
  @Input() receipt!: Receipt[];
  destinations!: Destination[];
  time!:  Date[]
  constructor() {
    // Check if receipt is defined before using find
    // if (this.receipt) {
    //   // Use map to extract destination from each receipt
    //   this.destinations = this.receipt.find(receipt => receipt.destination);
    //   if(this.destinations){
    //     this.time = this.destinations.map(receipt => receipt.Start_time);
    //   }
    // }
  }

  sortData(sort: Sort) {
    console.log(this.destinations);
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }

    // this.sortedData = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name':
    //       return compare(a.client, b.client, isAsc);
    //     case 'calories':
    //       return compare(a.destination, b.destination, isAsc);
    //     case 'fat':
    //       return compare(a.fat, b.fat, isAsc);
    //     case 'carbs':
    //       return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein':
    //       return compare(a.protein, b.protein, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
  }
}
