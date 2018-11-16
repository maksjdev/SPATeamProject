import {User} from '@shared/models/User';

export class Comment {

  constructor(
    public author: User,
    public text: string,
    public date: Date,
    public rating?: number
  ){}
}
