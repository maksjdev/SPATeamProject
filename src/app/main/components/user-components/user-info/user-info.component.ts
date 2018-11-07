import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: object = {
    name: 'Sirius Dark',
    role: 'Admin',
    image: 'https://hsto.org/getpro/habr/avatars/fc7/23a/b6b/fc723ab6b9870078eefc3aba22c605ad.png',
  };

  constructor() { }

  ngOnInit() {
  }

}
