import { Injectable } from '@angular/core';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {CONSTANTS} from '@shared/config/constants';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  mockNews: News;
  mockUser: User;
  mockActiveUser: User;

  constructor(
    private dateTimeService: AppDateTimeService
  ) {
    let linkUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockUser = new User('FirstName', 'LastName', linkUser, 0, 'User');

    let linkActiveUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockActiveUser = new User('Sirius', 'Dark', linkActiveUser, 0, 'Admin');

    let title: string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      text: Array<object> = [
        {"type": "text", "value": "Душа моя озарена <s>неземной радостью</s> пустотой, как эти чудесные весенние утра, которыми я <i>наслаждаюсь от всего сердца</i>. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. <strong>Я так счастлив</strong>, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: \"Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!\""},
        {"type": "video", "value": "https://www.youtube.com/watch?v=3GMo-vcI-OA"},
        {"type": "image", "value": "https://bit.ly/2yXDOPA"},
      ],
      linkNews: string = CONSTANTS.MOCK.NEWS_IMAGE,
      date = dateTimeService.unixToDate('1541538783'),
      tags = ['Space', 'Humans', 'Potato'];
    this.mockNews = new News (this.mockUser, date, title, text, linkNews, tags,100, 5);
  }

  public getMockNews(): News {
    return this.mockNews;
  }
  public getMockNewsList(quantity: number): Array<News> {
    let news = this.getMockNews();
    let resultArr = [];
    for (let i = 0 ; i < quantity; i++){
      resultArr.push(news);
    }
    return resultArr;
  }

  getMockUser(): User{
    return this.mockUser;
  }
  getMockActiveUser(): User{
    return this.mockActiveUser;
  }

}
