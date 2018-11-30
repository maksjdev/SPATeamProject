import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppRouterData} from '@routes/AppRouterData';
import {CONSTANTS} from '@shared/config/constants';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {
  activeQueryParam: BehaviorSubject<object>;
  currentRouteData: BehaviorSubject<AppRouterData>;
  activeRoute: ActivatedRoute;

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private titleService: Title,
  ) {
    this.activeQueryParam = new BehaviorSubject<object>({});
    let defaultData = new AppRouterData('','',{});
    this.currentRouteData = new BehaviorSubject<AppRouterData>(defaultData);
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
          titleService.setTitle(CONSTANTS.APP.TITLE + ' — ' + data['title']);

          let routerData = new AppRouterData(
            event.url, this.getCleanUrl(event.url),
            this.getActiveQueryParam().getValue()['params']
          );
          this.currentRouteData.next(routerData);
        }}
    });
  }
  public getCurrentRouteData(): BehaviorSubject<object>{
    return this.currentRouteData;
  }
  public getActiveQueryParam(): BehaviorSubject<object>{
    return this.activeQueryParam;
  }

  public getQueryParam(paramName: string): string{
    let currentParam = this.activeQueryParam.getValue()['params'];
    if (paramName in currentParam){
      var value = currentParam[paramName];
      return value;
    } else return;
  }
  public setQueryParam(queryParamArr: object): void{
    this.router.navigate(['.'],{
      relativeTo: this.activeRoute,
      queryParams: queryParamArr,
      queryParamsHandling: 'merge',
    });
  }

  public getRouterData(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data);
    }
    if(state && parent) {
      data.push(... this.getRouterData(state, state.firstChild(parent)));
    }
    return data;
  }

  public goToLink(link: string): void{
    this.router.navigate([`/${link}`]);
  }
  public goChildLink(link: string): void{
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
