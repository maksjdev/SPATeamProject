export class User {

  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public image: string,
    public rating: number,
    public role: string,
  ){}

  getId(): string {
    return this.id;
  }
  public toString(){
    return `User (${this.role}) Name - ${this.first_name+this.last_name}`;
  }
}
