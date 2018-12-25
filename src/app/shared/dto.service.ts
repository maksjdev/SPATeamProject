import { Injectable } from '@angular/core';
import {User} from '@shared/models/User';
import {Category} from '@shared/models/Category';
import {News} from '@shared/models/News';
import {Comment} from '@shared/models/Comment';

@Injectable()
export class DtoService {

  constructor() { }

  public getUserFromObj(obj: object): User {
    let id = obj['_id'], realname = obj['realname'],
      nickname = obj['nickname'], email = obj['email'],
      img = obj['img_url'], rating = obj['rating'],
      role = obj['role'], bookmarks = obj['bookmarks'];
    let user = new User(id, realname, nickname, email, img, rating, role, bookmarks);
    return user;
  }

  public getCategoryFromObj(obj: object): Category {
    let id = obj['_id'], name = obj['name'], newsList = obj['news_list'],
        amount = obj['news_amount'], disabled = obj['disabled'];
    let category = new Category(id, name, amount, newsList, disabled);
    return category;
  }

  public getNewsFromObj(obj: object): News {
    let id = obj['_id'], authorObj: object = obj['author'];
    let categoriesObj: Array<object> = obj['categories'];
    let date = new Date(obj['create_date']),
        title = obj['title'], text = obj['text'],
        image = obj['img_url'], rating = obj['rating'],
        commentNumber = obj['comments_number'];
    let author: User = this.getUserFromObj(authorObj);
    let categories = categoriesObj.map(categoryObj => {
      return this.getCategoryFromObj(categoryObj);
    });
    let news: News = new News(id, author, date, title, text, image, categories, rating, commentNumber);
    return news;
  }

  public getCommentFromObj(obj: object): Comment {
    let id = obj['_id'], authorObj: object = obj['author'],
        text = obj['text'], createDate = new Date(obj['create_date']),
        rating = obj['rating'];
    let author: User = this.getUserFromObj(authorObj);

    let comment = new Comment(id, author, text, createDate, rating);
    return comment;
  }
}
