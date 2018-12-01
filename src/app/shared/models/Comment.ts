import {User} from '@shared/models/User';

export class Comment {

  constructor(
    public id: number,
    public author: User,
    public text: string,
    public date?: Date,
    public rating?: number
  ){}

  public toString(){
    return `Comment #${this.id} Author - ${this.author.first_name + this.author.last_name}: ${this.text}`;
  }
}
