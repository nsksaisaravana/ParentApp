import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsTypePipe'
})
export class NewsTypePipe implements PipeTransform {

  transform(value:any,newsType: string): any {
    //return null;
    var eventFilteredDetails=value.filter(event=>event.NewsType==newsType);
    return eventFilteredDetails;
  }

}
