//import { Datetime } from "@ionic/angular";

export interface IUpcomingEvent{
    Id:number;
    EventDate:Date;
    Month:string;
    EventStartTime:string;
    EventEndTime:string;
    EventDesc:string;
    EventShortDesc:string;
    Suburb:String;
    Postcode:string;
    Latitude:string;
    Longitude:string;
    EventLandMark:string;
    Title:string;
    EventAddress:string;
}