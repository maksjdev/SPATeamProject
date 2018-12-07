import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AppRouterData} from '@routes/AppRouterData';
import {CONSTANTS} from '@shared/config/constants';

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {
  activeRoute: ActivatedRoute;
  activeQueryParam: BehaviorSubject<ParamMap>;
  currentRouteData: BehaviorSubject<AppRouterData>;

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private titleService: Title,
  ) {
    this.activeQueryParam = new BehaviorSubject<ParamMap>(undefined);
    let defaultData = new AppRouterData('','', undefined);
    this.currentRouteData = new BehaviorSubject<AppRouterData>(defaultData);

    this.routeActive.queryParamMap.subscribe( (params: ParamMap) => {
      this.activeQueryParam.next(params);
    });

    router.events.subscribe(event => {
      // По окончанию перехода
      if(event instanceof NavigationEnd) {
        let data = this.getRouterData(router.routerState, router.routerState.root);
        this.activeRoute = this.routeActive.firstChild;

        if(data.length > 0) {
          data = data[0]; // Берем инфу только с "Главного" роутинка (не учитывая дочерних)
          titleService.setTitle(CONSTANTS.APP.TITLE + ' — ' + data['title']);

          let routerData = new AppRouterData(event.url, this.getCleanUrl(event.url), this.getActiveQueryParam().getValue());
          this.currentRouteData.next(routerData);
        }}
    });
  }

  public getCurrentRouteData(): BehaviorSubject<AppRouterData>{
    return this.currentRouteData;
  }
  public getActiveQueryParam(): BehaviorSubject<ParamMap>{
    return this.activeQueryParam;
  }

  public getQueryParam(paramName: string): string{
    let currentParam = this.activeQueryParam.getValue();
    if (paramName){
      return currentParam.get(paramName);
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

  public goToLinkSave(link: string): void {
    let routerData: AppRouterData = this.getCurrentRouteData().getValue();
    let url = routerData.path;
    let params = routerData.params['params'];

    let querys = { [CONSTANTS.QUERY.BACK_URL]: url, [CONSTANTS.QUERY.BACK_PARAMS]: JSON.stringify(params) };
    this.goToLinkWithQuery(link, true, querys)
  }

  public goToLinkWithQuery(link: string, skip: boolean = false, queryParams?: object): void {
    this.router.navigate([`/${link}`],
      { queryParams: queryParams, skipLocationChange: skip });
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

  goToNews(id: string){
    this.router.navigate(['/'+CONSTANTS.APP.NEWS, id]);
  }
  goToEditNews(id: string){
    this.router.navigate(['/'+CONSTANTS.APP.NEWS+'/'+CONSTANTS.APP.EDIT, id]);
  }
}
