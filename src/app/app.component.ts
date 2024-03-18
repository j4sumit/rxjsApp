import { Component, ViewChild,ElementRef } from '@angular/core';
import {Observable, fromEvent} from "rxjs"
import {filter, map, tap} from "rxjs/operators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("search",{static:true})  //created observable for input Element1
  search?: ElementRef<HTMLInputElement>//created observable for input Element2

  title = 'rxjsApp';


  ngOnInit(){

const searchObs = fromEvent(this.search!.nativeElement,"input")//created observable for input Element3
searchObs.subscribe((value:any)=>{//created observable for input Element4
  console.log(value)//created observable for input Element5
})

    // Observable-> who emits data
const pizzaObservable = new Observable((subscriber)=>{
subscriber.next({name:"Farm Houser", veg:true, size:"small"})
subscriber.next({name:"Margherita", veg:true, size:"large"})
subscriber.next({name:"barberqueChicket", veg:false,size:"medium"})
subscriber.complete()
subscriber.next({name:"Margherita", veg:true})
}).pipe(
  tap((pizza:any)=>
  {//Side Effects
    if(pizza.size=="large"){
    throw new Error("large Size pizza not allowed")
  }
}
  ),
  filter((pizza:any)=>{return pizza.veg==true}),
  map((pizza:any)=> pizza.name)
)
//Subscriber/observer=> who consumes emited data
// pizzaObservable.subscribe({
//   next:(value)=>console.log(value),
//   error:(err)=>console.log(err.message),
//   complete:()=>console.log("i am done eating pizza")
// })

  }
}
