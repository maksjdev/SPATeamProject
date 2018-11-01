import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: object = {
    name: 'Sirius Dark',
    image: '//habrastorage.org/getpro/habr/avatars/4fe/2db/5b6/4fe2db5b695c03abe903c7c966c618a4.png',

  };
  constructor() { }

  ngOnInit() {
  }

}
