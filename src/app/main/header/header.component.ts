import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppRouterData} from '@routes/AppRouterData';
import {AuthService} from '@shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoged: boolean = false;
  signPage: boolean = false;

  constructor(
    private authService: AuthService,
    private routingService: AppRoutingService
  ) { }

  ngOnInit(): void {
    // Получили состояние пользователя и его данные (типо как*)
    this.authService.getLoginState().subscribe( loginState => {
      this.isLoged = loginState? loginState : false;
    });

    // Следим за страницей на которой находимся
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
