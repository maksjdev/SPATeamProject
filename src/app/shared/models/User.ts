export class User {

  constructor(
    public id: string,
    public realname: string,
    public nickname: string,
    public email: string,
    public img_url: string,
    public rating: number = 0,
    public role: string = 'User',
    public bookmarks: Array<string> = [],
    public liked_comments: Array<string> = [],
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
  getLikedComments(): Array<string>{
    return this.liked_comments;
  }

  public toString(){
    return `User [id=${this.id} Role:${this.role}, Name:${this.realname}, NickName:${this.nickname}, Rating:${this.rating}, Bookmarks:${this.bookmarks.join(',')}`;
  }
}
