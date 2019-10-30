import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill'
import { IonicModule } from '@ionic/angular';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import {MatDialogModule} from '@angular/material/dialog';

import { MaintainnewsletterPage } from './maintainnewsletter.page';
import { NewsletterlistComponent, MaintainNewsLetterPopUpDialog } from './components/newsletterlist/newsletterlist.component';
import { NewsletterneweditComponent } from './components/newsletternewedit/newsletternewedit.component';
import { TokenInterceptorService } from '../../../services/token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaintainNewsletterserviceService } from './services/maintain-newsletterservice.service';

import { PdfViewerModule } from 'ng2-pdf-viewer';
const routes: Routes = [
  {
    path: '',
    component: MaintainnewsletterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    QuillModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    EditorModule,
    FileUploadModule,
    MatDialogModule,
    PdfViewerModule
  ],
  entryComponents: [MaintainNewsLetterPopUpDialog],
  declarations: [MaintainnewsletterPage, NewsletterlistComponent, NewsletterneweditComponent,MaintainNewsLetterPopUpDialog],
  providers: [
    MaintainNewsletterserviceService,
    TokenInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ]
})
export class MaintainnewsletterPageModule {}
