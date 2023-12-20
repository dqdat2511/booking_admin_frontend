interface Trip{
    id : number; 
    name: string;
    destination:Destination[]
    max_slot : number;
  }
  export class TripModel {
    private trips: Trip[];
    private place : Destination[]=[]
    constructor() {
      // Initialize the trips array (you can do this in the constructor or load it from an external source)
      this.trips = [
        {
          'id': 1,
          'max_slot': 25,
          'name': "Sài Gòn",
          'destination' : [
            {'id': 1, 'key': 'AB123', 'place':'Bình định','Start_time': new Date('12/20/2023, 14:30')},
            {'id': 2, 'key': 'AB133', 'place':'Bến tre','Start_time': new Date('12/21/2023, 15:30')},
            {'id': 3, 'key': 'AB123', 'place':'Bình Định','Start_time': new Date('12/17/2023, 22:30')},
            {'id': 4, 'key': 'AB163', 'place':'Vĩnh Long','Start_time': new Date('12/23/2023, 23:30')},
            ]  
        },
        {
          'id': 2,
          'max_slot': 20,
          'name': "Cần Thơ",
          'destination': [
            { 'id': 5,'key': 'AB333', 'place': 'Đà Nẵng', 'Start_time': new Date('12/25/2023, 10:45') },
            { 'id': 6,'key': 'AB113', 'place': 'Nha Trang', 'Start_time': new Date('12/27/2023, 12:30') },
            { 'id': 7, 'key': 'AB155','place': 'Hải Phòng', 'Start_time': new Date('12/30/2023, 16:15') },
            { 'id': 8, 'key': 'AB111','place': 'Quy Nhơn', 'Start_time': new Date('12/31/2023, 8:00') },
          ]
        },
        {
          'id': 3,
          'max_slot': 15,
          'name': "Hà Nội",
          'destination': [
            { 'id': 9,'key': 'AB444', 'place': 'Long Xuyên', 'Start_time': new Date('01/05/2024, 14:00') },
            { 'id': 10, 'key': 'AB555','place': 'Hồ Chí Minh', 'Start_time': new Date('01/08/2024, 18:30') },
            { 'id': 11,'key': 'AB666', 'place': 'Cà Mau', 'Start_time': new Date('01/10/2024, 9:45') },
            { 'id': 12, 'key': 'AB777','place': 'Buôn Ma Thuột', 'Start_time': new Date('01/15/2024, 20:00') },
          ]
        },
      ];
    }
  
    getAllTrips(): Trip[] {
      return this.trips;
    }
    getPlace(id: number): Destination[]{
      let trip:Trip[] = this.trips.filter(place => place.id === id);
      return trip.flatMap(place => place.destination);
    }
    getDes(id: number, key : string): Destination[]{
      let destination: Destination[] = []
      try {
        let trip:Trip[] = this.trips.filter(place => place.id === id);
        destination = trip.flatMap(place => place.destination.filter(des => des.key.match(key)));
      } catch (error) {
        throw error
      }   
      return destination;
    }
    getDestination(id: number, id_des: number): Destination[] {
      let destination: Destination[] = [];
      try {
        let trip: Trip | undefined = this.trips.find((place) => place.id === id); 
        if (trip) {
          destination = trip.destination.flatMap((des) =>
            des.id === id_des ? [des] : []
          );
        }
      } catch (error) {
        throw error;
      }
      return destination;
    }
  }
  export interface Destination{
    id: number,
    key: string,
    place: string,
    Start_time: Date
  }