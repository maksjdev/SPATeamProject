import {Injectable} from '@angular/core';
import {News} from '@shared/models/News';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {CONSTANTS} from '@shared/config/constants';
import {User} from '@shared/models/User';

@Injectable()
export class NewsDataService {
  mockNews: News;
  mockUser: User;

  constructor(
    private dateTimeService: AppDateTimeService
  ) {
    let linkUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockUser = new User('FirstName', 'LastName', linkUser, 0, 'User');

    let title: string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      text: Array<object> = [
        {"type": "text", "value": "Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего."},
        {"type": "subtitle", "value": "Подзаголовок №1!!!"},
        {"type": "quote", "value": { "text": "Не ссы против ветра", "author": "Батя"}},
        {"type": "text", "value": "Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу."},
        {"type": "text", "value": "Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты."},
        {"type": "video", "value": "https://www.youtube.com/watch?v=3GMo-vcI-OA"},
        {"type": "link", "value": { "text": "Не ссы против ветра", "link": "https://google.com"}},
        {"type": "image", "value": "https://bit.ly/2yXDOPA"},
        {"type": "list", "value": {"title": "Список дел", "value": [
              {"item": "Дело №1"},
              {"item": "Дело №2"},
              {"item": "Дело №3"},
              {"item": "Дело №4"}
            ]}}
      ],
      linkNews: string = CONSTANTS.MOCK.NEWS_IMAGE,
      date = dateTimeService.unixToDate('1541538783'),
      tags = ['Space', 'Humans', 'Potato'];
    this.mockNews = new News (this.mockUser, date, title, text, linkNews, tags,100, 5);
  }

  public getMockNews(): News {
    return this.mockNews;
  }

  public getMockNewsList(quantity, page?: number, period?: string, rating?: string): Array<News>{
    let resultArr = [];
    // Получаем новости по требованиям
    console.info(`Чики-брики, сервер, гони новости (стр. ${page}, период: ${period}, рейтинг: ${rating})!`);

    //Как-то получили новости
    let news = this.getMockNews();
    for (let i = 0 ; i < quantity; i++){
      resultArr.push(news);
    }
    return resultArr;
  }

}
