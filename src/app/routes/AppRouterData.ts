import {ParamMap} from '@angular/router';

export class AppRouterData {
  constructor(
    public url: string,
    public path: string,
    public params: ParamMap,
  ){}
}
