
export class Category {

  constructor(
    public id: string,
    public name: string,
    public amount?: number,
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
  public toString(){
    return `Category #${this.id} Name - ${this.name}`;
  }
}
