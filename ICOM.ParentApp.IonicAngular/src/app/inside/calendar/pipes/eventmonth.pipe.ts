import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventmonth'
})
export class EventmonthPipe implements PipeTransform {

  transform(value:any,month: string): any {
    //return null;
    var eventFilteredDetails=value.filter(event=>event.Month==month);
    return eventFilteredDetails;
  }

}
