import {User} from '@shared/models/User';
import {Category} from '@shared/models/Category';

export class News {

  constructor(
    public id: string,
    public author: User,
    public date: Date,
    public title: string,
    public text: string,
    public image_url: string,
    public categories: Array<Category> = [],
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
    return this.image_url;
  }
  getCategories(): Array<Category> {
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

