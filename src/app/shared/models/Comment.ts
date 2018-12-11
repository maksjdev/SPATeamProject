import {User} from '@shared/models/User';

export class Comment {

  constructor(
    public id: string,
    public author: User,
    public text: string,
    public date?: Date,
    public rating?: number
  ){}

  getId(): string {
    return this.id;
  }
  getAuthor(): User {
    return this.author;
  }
  getText(): string {
    return this.text;
  }
  getDate(): Date {
    return this.date;
  }
  getRating(): number {
    return this.rating;
  }

  public toString(){
    return `Comment #${this.id} Author - ${this.author.getRealName()}: ${this.text}`;
  }
}
