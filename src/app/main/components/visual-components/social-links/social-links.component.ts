import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent implements OnInit {
  socialLinks = [
    {name: 'Facebook', link: 'https://www.facebook.com', icon: 'fa-facebook-f'},
    {name: 'Instagram', link: 'https://www.instagram.com', icon: 'fa-telegram-plane'},
    {name: 'Telegram', link: 'https://www.telegram.org', icon: 'fa-twitter'},
    {name: 'ВКонтакте', link: 'https://www.vk.com', icon: 'fa-vk'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
