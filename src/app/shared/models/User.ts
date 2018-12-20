export class User {

  constructor(
    public id: string,
    public realname: string,
    public nickname: string,
    public email: string,
    public img_url: string,
    public rating: number,
    public role: string,
    public bookmarks: Array<string> = [],
  ){}

  getId(): string {
    return this.id;
  }
  getRealName(): string {
    return this.realname;
  }
  getNickname(): string {
    return this.nickname;
  }
  getEmail(): string {
    return this.email;
  }
  getImage(): string {
    return this.img_url;
  }
  getRating(): number {
    return this.rating;
  }
  getRole(): string {
    return this.role;
  }
  getBookmarks(): Array<string> {
    return this.bookmarks;
  }

  public toString(){
    return `User (${this.role}) Name - ${this.realname + this.nickname}`;
  }
}
