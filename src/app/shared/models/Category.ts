
export class Category {

  constructor(
    public id: string,
    public name: string,
    public amount?: number,
    public newsList?: Array<string>,
    public disabled?: boolean
  ){}

  public getId(): string {
    return this.id
  }
  public getName(): string {
    return this.name;
  }
  public getAmount(): number {
    return this.amount || 0;
  }
  public getNewsList(): Array<string>{
    return this.newsList;
  }
  public getDisabled(): boolean {
    return this.disabled;
  }
  public toString(){
    return `Category [id:${this.id}] Name: ${this.name}, Amount: ${this.amount}`;
  }
}
