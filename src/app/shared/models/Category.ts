
export class Category {

  constructor(
    public id: string,
    public name: string,
    public amount?: number,
    public disabled?: boolean
  ){}

  public toString(){
    return `Category #${this.id} Name - ${this.name}`;
  }
}
