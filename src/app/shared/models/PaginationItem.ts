
export class PaginationItem {

  constructor(
    public current: number,
    public previous?: number,
    public next?: number,
    public large_back?: number,
    public large_forward?: number,
  ){}

  public static createPageItem(page: number, step: number = 10, minPage: number = 1, maxPage?: number) {
    let largeBack = page <= step?  (page === minPage || page-1 === minPage)? null : minPage : page - step;
    let largeForward = page + step;
    return new PaginationItem(page, page-1, page+1, largeBack, largeForward);
  }
}
