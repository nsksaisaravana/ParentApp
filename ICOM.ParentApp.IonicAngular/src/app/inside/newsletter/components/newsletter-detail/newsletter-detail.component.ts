import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {NewsletterService} from '../../services/newsletter.service'


@Component({
  selector: 'app-newsletter-detail',
  templateUrl: './newsletter-detail.component.html',
  styleUrls: ['./newsletter-detail.component.scss']
})
export class NewsletterDetailComponent implements OnInit {
  newsLetterDetailImage:any;
  newsLetterDetailTitle='';
  newsLetterDetailsPublishingContent='';
  newsLetterDetail:any;
  newsLetterId:number=0;
  blobUrl:string;
  newsLetterUpdatedDate:string;
  newsLetterFilename:string;
  
  @Output() clickNewsLetterDetailChild: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickDownloadFileChild: EventEmitter<any> = new EventEmitter<any>();
  constructor(private newsLetterService:NewsletterService) { 

    }

  ngOnInit() {
  }

  showNewsletterList(){
    this.clickNewsLetterDetailChild.emit("Go Back");
  }

  downloadFile(){
    this.clickDownloadFileChild.emit(this.newsLetterId);
  }




}
