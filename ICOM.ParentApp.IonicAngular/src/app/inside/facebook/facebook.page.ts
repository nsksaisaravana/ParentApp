import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.page.html',
  styleUrls: ['./facebook.page.scss'],
})
export class FacebookPage implements OnInit {

  constructor() { }

  ngOnInit() {
    window.open("https://www.facebook.com/pages/Islamic-College-of-Melbourne/257112307727132/");
  }

}
