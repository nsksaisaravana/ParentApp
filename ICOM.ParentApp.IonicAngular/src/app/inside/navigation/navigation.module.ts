import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NavigationPage } from './navigation.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import {library} from '@fortawesome/fontawesome-svg-core';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

// library.add(faCoffee);
const routes: Routes = [
  {
    path: '',
    component: NavigationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    AngularFontAwesomeModule
  ],
  declarations: [NavigationPage]
})
export class NavigationPageModule {}
