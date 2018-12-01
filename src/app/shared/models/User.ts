export class User {

  constructor(
    public first_name: string,
    public last_name: string,
    public image: string,
    public rating: number,
    public role: string,
  ){}

  public toString(){
    return `User (${this.role}) Name - ${this.first_name+this.last_name}`;
  }
}
