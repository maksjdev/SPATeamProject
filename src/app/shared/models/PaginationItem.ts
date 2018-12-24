
export class PaginationItem {

  constructor(
    public current: number,
    public previous?: number,
    public next?: number,
    public large_back?: number,
    public large_forward?: number,
  ){}

  public static createPageItem(page: number, step: number = 10, minPage: number = 1, maxPage?: number) {
    let largeBack = (page - step) < minPage?  (page === minPage || page-1 === minPage)? null : minPage : page - step;
    let largeForward = (page + step) > maxPage?  (page === maxPage || page+1 === maxPage)? null : maxPage : page + step;
    // let largeForward = (page + step) <= maxPage? page + step : maxPage;

    let privious = (page-1) >= minPage? page-1 : null;
    let next = (page+1) <= maxPage? page+1 : null;
    return new PaginationItem(page, privious, next, largeBack, largeForward);
  }
}
