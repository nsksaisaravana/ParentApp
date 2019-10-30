import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsletterPage } from './newsletter.page';
import { NewsletterListComponent } from './components/newsletter-list/newsletter-list.component';
import { NewsletterDetailComponent } from './components/newsletter-detail/newsletter-detail.component';

import {NewsletterService} from './services/newsletter.service';
import {HttpClientModule, HTTP_INTERCEPTORS}    from '@angular/common/http'
import { TokenInterceptorService } from '../../services/token-interceptor.service';

import {MatExpansionModule} from '@angular/material/expansion';
import { NewsTypePipe } from './pipes/newsItem.pipe';

import {File} from '@ionic-native/File/ngx';
// import {FileOpener} from '@ionic-native/file-opener/ngx';
// import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';

const routes: Routes = [
  {
    path: '',
    component: NewsletterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatExpansionModule
  ],
  declarations: [NewsletterPage, NewsletterListComponent, NewsletterDetailComponent,NewsTypePipe],
  providers: [
    NewsletterService,
    File,
    // FileTransfer,
    // FileOpener,
    DocumentViewer,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class NewsletterPageModule {}
