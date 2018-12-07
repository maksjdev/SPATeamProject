import { Injectable } from '@angular/core';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {Comment} from '@shared/models/Comment';
import {AppDateTimeService} from '@shared/services/app-date-time.service';
import {CONSTANTS} from '@shared/config/constants';
import {Category} from '@shared/models/Category';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  mockNews: News;
  mockUser: User;
  mockComment: Comment;
  mockActiveUser: User;
  categorysList: Array<Category>;

  constructor(
    private dateTimeService: AppDateTimeService
  ) {
    let linkUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockUser = new User('100', 'FirstName', 'LastName', linkUser, 0, 'User');

    let linkActiveUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockActiveUser = new User('200','Sirius', 'Dark', linkActiveUser, 0, 'Admin');

    let commentDate = dateTimeService.unixToDate('1541538783');
    this.mockComment = new Comment(111, this.mockUser, 'Обожаю ваш ресурс! Самые авторитетные и неподкупные новости, всегда акктуально свежо, молодо и вообще всем селом читаем! NodeJS + TypeScript (JavaScript) впервые дали возможность быть FullStack и писать только на одном ЯП. Тем самым упрощая процесс профессионального роста.',commentDate, 100);

    let title: string = 'Фулстеки — это вечные мидлы. Не идите по этому пути, если не хотите страдать. Title us test',
      text: string = 'Я из тех людей, кто с наступлением осени старается проводить на улице меньше времени. В <strike>Москве </strike>это не сложно: ограничиваешься маршрутом от дома до офиса и обратно. <b>Однако промозглая погода может причинить дискомфорт</b> и в помещении, особенно если ваше рабочее место, как и моё, находится у окна, а каждый второй коллега, жалуясь на духоту, просит проветрить кабинет. Чтобы не впасть в хандру, этой осенью я обновил гардероб.&nbsp;Ниже опубликованы <u>рекомендации</u> о том, как нужно оформлять публикации перед размещением в «Песочнице». Обратите внимание: следование рекомендациям не только повысит вероятность прохождения публикации через модераторов, но увеличит шансы на получение приглашения от действующего участника сообщества.<div><div style="text-align: center;"><img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350" style="background-color: transparent;"></div><div><h2 style="\\&quot;-webkit-font-smoothing:" antialiased;="" line-height:="" 32px;\\"="">Суть проблемы с борщевиком</h2></div><div><br></div></div><div>Агрессивно плодится. Быстро растёт. Занимает огромные площади, не платя аренды (даже в МО). Трудно уничтожим. Вызывает химические ожоги при контакте с кожей.<br></div><div>Нет не так: <b>ВЫЗЫВАЕТ ЖУТКИЕ ХИМИЧЕСКИЕ ОЖОГИ ПРИ КОНТАКТЕ С КОЖЕЙ</b>.<br></div><div><br></div><div><i>Абсолютно ненаучная сказка, вместо истории вопроса.</i><br></div><div><ul><li>борщевик без <strike style="\\&quot;background-color:" transparent;\\"="">кумаринов </strike><span style="\\&quot;background-color:" transparent;\\"="">(даже если сбежит из культуры, то без яда его можно взять голыми руками и штыковой лопатой обыкновенной)</span><br></li><li>стерильный гибрид (дающий семена, которым не суждено прорасти из-за близко и дальнеродственных скрещиваний родителей)<br></li><li>можно использовать генетический <strike style="\\&quot;background-color:" transparent;\\"="">механизм </strike><span style="\\&quot;background-color:" transparent;\\"="">«защиты от долгоносика», только подменить его на какое-то почти константное условие, например: прорастаем, если false.</span></li></ul><div><h3 style="\\&quot;-webkit-font-smoothing:" antialiased;="" line-height:="" 28px;\\"=""></h3></div></div><div><span style="\\&quot;font-size:" 20px;\\"=""><b>Полезные ссылки</b></span></div><div><ol><li>Полезная ссылка №1</li><li><u><a href="\\&quot;https://www.google.com/\\&quot;" target="\\&quot;_blank\\&quot;">Полезная ссылка №2</a></u><br></li></ol><blockquote><span style="\\&quot;color:" rgb(0,="" 0,="" 0);="" font-family:="" roboto,="" sans-serif;="" font-size:="" 18px;="" background-color:="" rgb(248,="" 250,="" 250);\\"=""></span><span style="\\&quot;font-size:" 14px;\\"=""></span>«Я уже писал сетевые модели прежде, но я обычно не пишу их на игровом движке. Но в этом случае способность визуализировать движение констелляции имеет решающее значение для понимания происходящего. Все гораздо понятнее, когда вы это видите. При низком уровне детализации этих симуляций проблема в основном представляет собой проблему 3D-геометрии, а игровой движок очень хорошо подходит для изучения таких проблем».</blockquote><div><span style="\\&quot;font-size:" 20px;\\"=""><b><br></b></span></div><div><b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"="">Выводы:</b><br></div></div><div><b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""><br></b></div><div>На протяжении многих лет <strike>Илон Маск </strike>говорил о своих планах по обеспечению широкополосного доступа в Интернет для мира, используя констелляцию (или созвездие) спутников. Констелляция Starlink первоначально планировали собирать из 12 000 недорогих спутников, обеспечивающих терабитное интернет-соединение. Первая партия этих спутников будет запущена в июне 2019 года, а полная сеть будет развернута в середине 2020-х.&nbsp;<b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""><br></b></div><div style="\\&quot;text-align:" left;\\"="">Хотя&nbsp;наброски<span style="\\&quot;font-size:" 12px;="" line-height:="" 0;="" position:="" relative;="" vertical-align:="" baseline;="" bottom:="" -0.25em;\\"="">&nbsp;</span>плана были известны уже давно, Маск и компания, которая была основана им, чтобы вдохнуть жизнь в освоение космоса, не спешили делиться подробностями. Марк Хэдли, профессор Университетского колледжа Лондона, создал модель, которая покажет миру, на что будет похож Starlink в итоге.&nbsp;</div><div><b>Формула: H<sub>2</sub>O</b></div><div><br></div><div><span style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""></span></div><div><b></b></div>',
      linkNews: string = CONSTANTS.MOCK.NEWS_IMAGE,
      date = dateTimeService.unixToDate('1541538783'),
      tags = ['Space', 'Humans', 'Potato'];
    this.mockNews = new News ( '100', this.mockUser, date, title, text, linkNews, tags,100, 5);

    this.categorysList = [
      new Category('111', 'Anime', 0,true),
      new Category('112', 'Web', 10,false),
      new Category('113', 'Design', 20,false),
      new Category('114', 'Android', 12,false),
      new Category('115', 'Toasters', 14,false),
      new Category('116', 'iOS', 7,false),
      new Category('117', 'Space', 15,false),
      new Category('118', 'Navalny', 6,false),
    ];
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

  getMockComment(): Comment{
    return this.mockComment;
  }
  getMockCommentList(quantity: number): Array<Comment> {
    let comment = this.getMockComment();
    let resultArr = [];
    for (let i = 0; i < quantity; i++){
      resultArr.push(comment);
    }
    return resultArr;
  }

  getMockCategories(): Array<Category> {
    return this.categorysList;
  }
}
