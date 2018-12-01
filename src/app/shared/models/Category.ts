
export class Category {

  constructor(
    public id: number,
    public name: string,
    public disabled?: boolean
  ){}

  public toString(){
    return `Category #${this.id} Name - ${this.name}`;
  }
}
