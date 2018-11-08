import {User} from '@shared/models/User';

export class News {

  constructor(
    public author: User,
    public date: Date,
    public title: string,
    public text: string,
    public quotes: string,
    public image: string,
    public tags: Array<string>,
    public rating: number,
    public comments: number
  ){}
}

