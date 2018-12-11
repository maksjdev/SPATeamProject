export class User {

  constructor(
    public id: string,
    public real_name: string,
    public nickname: string,
    public email: string,
    public image: string,
    public rating: number,
    public role: string,
  ){}

  getId(): string {
    return this.id;
  }
  getRealName(): string {
    return this.real_name;
  }
  getNickname(): string {
    return this.nickname;
  }
  getEmail(): string {
    return this.email;
  }
  getImage(): string {
    return this.image;
  }
  getRating(): number {
    return this.rating;
  }
  getRole(): string {
    return this.role;
  }

  public toString(){
    return `User (${this.role}) Name - ${this.real_name + this.nickname}`;
  }
}
