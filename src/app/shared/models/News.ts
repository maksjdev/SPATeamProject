import {User} from '@shared/models/User';

export class News {

  constructor(
    public author: User,
    public date: Date,
    public title: string,
    public text: string,
    public image: string,
    public tags: Array<string>,
    public rating: number = 0,
    public comments: number = 0
  ){}

  getAuthor(): User{
    return this.author;
  }
  getDate(): Date{
    return this.date;
  }
  getTitle(): string {
    return this.title;
  }
  getText(): string {
    return this.text;
  }
  getImage(): string {
    return this.image;
  }
  getTags(): string {
    return this.image;
  }

  getRating(): number {
    return this.rating;
  }
  getComments(): number {
    return this.comments;
  }
}

