import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppRouterData} from '@routes/AppRouterData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoged: boolean = true;
  signPage: boolean = false;

  constructor(
    private routingService: AppRoutingService
  ) { }

  ngOnInit(): void {
    this.routingService.getCurrentRouteData().subscribe( (data: AppRouterData) => {
      if (data.path){
        this.signPage = data.path.includes('login') || data.path.includes('registration');
      }
    });
  }

  onSearch(str) {
    console.log(`Search: ${str}`);
  }
}
