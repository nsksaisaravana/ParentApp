import { Component, OnInit,ViewChild } from '@angular/core';
import { NewsletterlistComponent } from './components/newsletterlist/newsletterlist.component';
import { NewsletterneweditComponent } from './components/newsletternewedit/newsletternewedit.component';
import { NewsletterService } from '../../newsletter/services/newsletter.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-maintainnewsletter',
  templateUrl: './maintainnewsletter.page.html',
  styleUrls: ['./maintainnewsletter.page.scss'],
})
export class MaintainnewsletterPage implements OnInit {
  isNewsLetterList:boolean=true;

  @ViewChild(NewsletterlistComponent,{static:false} ) newsletterListComponent: NewsletterlistComponent;
  @ViewChild(NewsletterneweditComponent ,{static:false}) newsletterDetailsComponent: NewsletterneweditComponent; 
  constructor(private newsletterService: NewsletterService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async clickNewsLetterListParent($event){
    console.log($event);
    if($event==undefined){
      this.newsletterDetailsComponent.newsletter.PublishingPageContent='';
      this.newsletterDetailsComponent.newsletter.Title='';
      this.newsletterDetailsComponent.newsletter.ShortDesc='';
      this.newsletterDetailsComponent.newsletter.IsPublished=false;
      this.newsletterDetailsComponent.uploadedImage=null;
      this.newsletterDetailsComponent.newsletter.Id=0;
      this.newsletterDetailsComponent.newsletter.DocumentPath="New";
    }else{
      this.newsletterDetailsComponent.newsletter.PublishingPageContent=$event.PublishingPageContent;
      this.newsletterDetailsComponent.newsletter.Title=$event.Title;
      this.newsletterDetailsComponent.newsletter.ShortDesc=$event.ShortDesc;
      this.newsletterDetailsComponent.newsletter.IsPublished=$event.IsPublished;
      this.newsletterDetailsComponent.newsletter.Id=$event.Id;
      this.newsletterDetailsComponent.newsletter.DocumentPath=$event.DocumentPath;
      let imageBlog=await this.newsletterService.downloadNewsLetterImage($event.Id).toPromise();
      var fileURL = URL.createObjectURL(imageBlog);
      console.log(fileURL);
      this.newsletterDetailsComponent.uploadedImage= this.sanitizer.bypassSecurityTrustUrl(
          fileURL);
    }
    this.isNewsLetterList=false;
  }

  clickNewsLetterDetailParent($event){
    this.isNewsLetterList=true;
    if($event=='Saved'){
      this.newsletterListComponent.fetchNewsLetterForMaintenance();
    }
  }

}
