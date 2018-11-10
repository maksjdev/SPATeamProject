
export class PaginationItem {

  constructor(
    public current: number,
    public previous?: number,
    public next?: number,
    public large_back?: number,
    public large_forward?: number,
  ){}
}
