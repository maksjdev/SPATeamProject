import {User} from '@shared/models/User';

export class News {

  constructor(
    public id: string,
    public author: User,
    public date: Date,
    public title: string,
    public text: string,
    public image: string,
    public categories: Array<string> = [],
    public rating: number = 0,
    public commentNumber: number = 0,
    public commentList: Array<string> = []
  ){}

  getId(): string {
    return this.id;
  }
  getAuthor(): User {
    return this.author;
  }
  getDate(): Date {
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
  getCategories(): Array<string> {
    return this.categories;
  }
  getRating(): number {
    return this.rating;
  }
  getCommentNumber(): number {
    return this.commentNumber;
  }
  getCommentList(): Array<string> {
    return this.commentList;
  }
}

