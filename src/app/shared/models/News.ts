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
}

