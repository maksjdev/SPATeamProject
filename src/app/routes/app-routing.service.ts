import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {
  activeQueryParam: BehaviorSubject<any>;
  activeRoute: any;

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private titleService: Title,
  ) {
    this.activeQueryParam = new BehaviorSubject<any>({});

    this.routeActive.queryParamMap.subscribe(params => {
      this.activeQueryParam.next({...params});
    });

    router.events.subscribe(event => {
      // По окончанию перехода
      if(event instanceof NavigationEnd) {
        let data = this.getRouterData(router.routerState, router.routerState.root);

        this.activeRoute = this.routeActive.firstChild;
        if(data.length > 0) {
          data = data[0]; // Берем инфу только с "Главного" роутинка (не учитывая дочерних)

          titleService.setTitle(data['title']);

          // let url = event.url;
          // let path = this.getCleanUrl(url);
          // let params = this.getActiveQueryParam().getValue().params;
        }}
    });
  }

  getActiveQueryParam(){
    return this.activeQueryParam;
  }
  getQueryParam(paramName: string){
    let currentParam = this.activeQueryParam.getValue().params;
    if (paramName in currentParam){
      var value = currentParam[paramName];
      return value;
    } else return;
  }
  setQueryParam(queryParamArr){
    this.router.navigate(['.'],{
      relativeTo: this.activeRoute,
      queryParams: queryParamArr,
      queryParamsHandling: 'merge',
    });
  }

  getRouterData(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data);
    }
    if(state && parent) {
      data.push(... this.getRouterData(state, state.firstChild(parent)));
    }
    return data;
  }

  goToLink(link: string){
    this.router.navigate([`/${link}`]);
  }
  goChildLink(link: string){
    this.router.navigate([`./${link}`], { relativeTo: this.activeRoute, skipLocationChange: false });
  }
  getCleanUrl(link): string{
    // Возврат "чистой ссылки" (без параметров)
    let urlTree = this.router.parseUrl(link);
    let primeChild = urlTree.root.children['primary'];
    let urlWithoutParams = primeChild? primeChild.segments.map(it => it.path).join('/') : "./";
    return `/${urlWithoutParams}`;
  }
}
