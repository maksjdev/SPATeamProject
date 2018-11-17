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
    this.mockUser = new User('FirstName', 'LastName', linkUser, 0, 'User');

    let linkActiveUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockActiveUser = new User('Sirius', 'Dark', linkActiveUser, 0, 'Admin');

    let commentDate = dateTimeService.unixToDate('1541538783');
    this.mockComment = new Comment(this.mockUser, 'Обожаю ваш ресурс! Самые авторитетные и неподкупные новости, всегда акктуально свежо, молодо и вообще всем селом читаем! NodeJS + TypeScript (JavaScript) впервые дали возможность быть FullStack и писать только на одном ЯП. Тем самым упрощая процесс профессионального роста.',commentDate, 100);

    let title: string = 'Фулстеки — это вечные мидлы. Не идите по этому пути, если не хотите страдать. Title us test',
      // text: Array<object> = [
      //   {"type": "text", "value": "Я из тех людей, кто с наступлением осени старается проводить на улице меньше времени. В Москве это не сложно: ограничиваешься маршрутом от дома до офиса и обратно. Однако промозглая погода может причинить дискомфорт и в помещении, особенно если ваше рабочее место, как и моё, находится у окна, а каждый второй коллега, жалуясь на духоту, просит проветрить кабинет. Чтобы не впасть в хандру, этой осенью я обновил гардероб.<div><br><div><h2 style=\"-webkit-font-smoothing: antialiased; line-height: 32px;\">Суть проблемы с борщевиком</h2></div><div><br></div></div><div>Агрессивно плодится. Быстро растёт. Занимает огромные площади, не платя аренды (даже в МО). Трудно уничтожим. Вызывает химические ожоги при контакте с кожей.<br></div><div>Нет не так: <b>ВЫЗЫВАЕТ ЖУТКИЕ ХИМИЧЕСКИЕ ОЖОГИ ПРИ КОНТАКТЕ С КОЖЕЙ</b>.<br></div><div><br></div><div><i>Абсолютно ненаучная сказка, вместо истории вопроса.</i><br></div><div><ul><li>борщевик без <strike style=\"background-color: transparent;\">кумаринов </strike><span style=\"background-color: transparent;\">(даже если сбежит из культуры, то без яда его можно взять голыми руками и штыковой лопатой обыкновенной)</span><br></li><li>стерильный гибрид (дающий семена, которым не суждено прорасти из-за близко и дальнеродственных скрещиваний родителей)<br></li><li>можно использовать генетический <strike style=\"background-color: transparent;\">механизм </strike><span style=\"background-color: transparent;\">«защиты от долгоносика», только подменить его на какое-то почти константное условие, например: прорастаем, если false.</span></li></ul><div><h3 style=\"-webkit-font-smoothing: antialiased; line-height: 28px;\"></h3></div></div><div><span style=\"font-size: 20px;\"><b>Полезные ссылки</b></span></div><div><ol><li>Полезная ссылка №1</li><li><u><a href=\"https://www.google.com/\" target=\"_blank\">Полезная ссылка №2</a></u><br></li></ol><blockquote><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 18px; background-color: rgb(248, 250, 250);\"></span><span style=\"font-size: 14px;\"></span>«Я уже писал сетевые модели прежде, но я обычно не пишу их на игровом движке. Но в этом случае способность визуализировать движение констелляции имеет решающее значение для понимания происходящего. Все гораздо понятнее, когда вы это видите. При низком уровне детализации этих симуляций проблема в основном представляет собой проблему 3D-геометрии, а игровой движок очень хорошо подходит для изучения таких проблем».</blockquote><div><span style=\"font-size: 20px;\"><b><br></b></span></div><div><b style=\"font-size: 20px; background-color: transparent;\">Выводы:</b><br></div></div><div><b style=\"font-size: 20px; background-color: transparent;\"><br></b></div><div>На протяжении многих лет <strike>Илон Маск </strike>говорил о своих планах по обеспечению широкополосного доступа в Интернет для мира, используя констелляцию (или созвездие) спутников. Констелляция Starlink первоначально планировали собирать из 12 000 недорогих спутников, обеспечивающих терабитное интернет-соединение. Первая партия этих спутников будет запущена в июне 2019 года, а полная сеть будет развернута в середине 2020-х.&nbsp;<b style=\"font-size: 20px; background-color: transparent;\"><br></b></div><div style=\"text-align: left;\">Хотя&nbsp;наброски<span style=\"font-size: 12px; line-height: 0; position: relative; vertical-align: baseline; bottom: -0.25em;\">&nbsp;</span>плана были известны уже давно, Маск и компания, которая была основана им, чтобы вдохнуть жизнь в освоение космоса, не спешили делиться подробностями. Марк Хэдли, профессор Университетского колледжа Лондона, создал модель, которая покажет миру, на что будет похож Starlink в итоге.&nbsp;</div><div><b>Формула: H<sub>2</sub>O</b></div><div><br></div><div><span style=\"font-size: 20px; background-color: transparent;\"></span></div><div><b></b></div>"},
      //   {"type": "text", "value": "Душа моя озарена <s>неземной радостью</s> пустотой, как эти чудесные весенние утра, которыми я <i>наслаждаюсь от всего сердца</i>. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. <strong>Я так счастлив</strong>, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок моему сердцу крошечный мирок, что снует между стебельками, наблюдаю эти неисчислимые, непостижимые разновидности червяков и мошек и чувствую близость всемогущего, создавшего нас по своему подобию, веяние вселюбящего, судившего нам парить в вечном блаженстве, когда взор мой туманится и все вокруг меня и небо надо мной запечатлены в моей душе, точно образ возлюбленной, - тогда, дорогой друг, меня часто томит мысль: \"Ах! Как бы выразить, как бы вдохнуть в рисунок то, что так полно, так трепетно живет во мне, запечатлеть отражение моей души, как душа моя - отражение предвечного бога!\""},
      //   {"type": "video", "value": "https://www.youtube.com/watch?v=3GMo-vcI-OA"},
      //   {"type": "image", "value": "https://bit.ly/2yXDOPA"},
      // ],

      text: string = 'Я из тех людей, кто с наступлением осени старается проводить на улице меньше времени. В <strike>Москве </strike>это не сложно: ограничиваешься маршрутом от дома до офиса и обратно. <b>Однако промозглая погода может причинить дискомфорт</b> и в помещении, особенно если ваше рабочее место, как и моё, находится у окна, а каждый второй коллега, жалуясь на духоту, просит проветрить кабинет. Чтобы не впасть в хандру, этой осенью я обновил гардероб.&nbsp;Ниже опубликованы <u>рекомендации</u> о том, как нужно оформлять публикации перед размещением в «Песочнице». Обратите внимание: следование рекомендациям не только повысит вероятность прохождения публикации через модераторов, но увеличит шансы на получение приглашения от действующего участника сообщества.<div><div style="text-align: center;"><img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350" style="background-color: transparent;"></div><div><h2 style="\\&quot;-webkit-font-smoothing:" antialiased;="" line-height:="" 32px;\\"="">Суть проблемы с борщевиком</h2></div><div><br></div></div><div>Агрессивно плодится. Быстро растёт. Занимает огромные площади, не платя аренды (даже в МО). Трудно уничтожим. Вызывает химические ожоги при контакте с кожей.<br></div><div>Нет не так: <b>ВЫЗЫВАЕТ ЖУТКИЕ ХИМИЧЕСКИЕ ОЖОГИ ПРИ КОНТАКТЕ С КОЖЕЙ</b>.<br></div><div><br></div><div><i>Абсолютно ненаучная сказка, вместо истории вопроса.</i><br></div><div><ul><li>борщевик без <strike style="\\&quot;background-color:" transparent;\\"="">кумаринов </strike><span style="\\&quot;background-color:" transparent;\\"="">(даже если сбежит из культуры, то без яда его можно взять голыми руками и штыковой лопатой обыкновенной)</span><br></li><li>стерильный гибрид (дающий семена, которым не суждено прорасти из-за близко и дальнеродственных скрещиваний родителей)<br></li><li>можно использовать генетический <strike style="\\&quot;background-color:" transparent;\\"="">механизм </strike><span style="\\&quot;background-color:" transparent;\\"="">«защиты от долгоносика», только подменить его на какое-то почти константное условие, например: прорастаем, если false.</span></li></ul><div><h3 style="\\&quot;-webkit-font-smoothing:" antialiased;="" line-height:="" 28px;\\"=""></h3></div></div><div><span style="\\&quot;font-size:" 20px;\\"=""><b>Полезные ссылки</b></span></div><div><ol><li>Полезная ссылка №1</li><li><u><a href="\\&quot;https://www.google.com/\\&quot;" target="\\&quot;_blank\\&quot;">Полезная ссылка №2</a></u><br></li></ol><blockquote><span style="\\&quot;color:" rgb(0,="" 0,="" 0);="" font-family:="" roboto,="" sans-serif;="" font-size:="" 18px;="" background-color:="" rgb(248,="" 250,="" 250);\\"=""></span><span style="\\&quot;font-size:" 14px;\\"=""></span>«Я уже писал сетевые модели прежде, но я обычно не пишу их на игровом движке. Но в этом случае способность визуализировать движение констелляции имеет решающее значение для понимания происходящего. Все гораздо понятнее, когда вы это видите. При низком уровне детализации этих симуляций проблема в основном представляет собой проблему 3D-геометрии, а игровой движок очень хорошо подходит для изучения таких проблем».</blockquote><div><span style="\\&quot;font-size:" 20px;\\"=""><b><br></b></span></div><div><b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"="">Выводы:</b><br></div></div><div><b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""><br></b></div><div>На протяжении многих лет <strike>Илон Маск </strike>говорил о своих планах по обеспечению широкополосного доступа в Интернет для мира, используя констелляцию (или созвездие) спутников. Констелляция Starlink первоначально планировали собирать из 12 000 недорогих спутников, обеспечивающих терабитное интернет-соединение. Первая партия этих спутников будет запущена в июне 2019 года, а полная сеть будет развернута в середине 2020-х.&nbsp;<b style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""><br></b></div><div style="\\&quot;text-align:" left;\\"="">Хотя&nbsp;наброски<span style="\\&quot;font-size:" 12px;="" line-height:="" 0;="" position:="" relative;="" vertical-align:="" baseline;="" bottom:="" -0.25em;\\"="">&nbsp;</span>плана были известны уже давно, Маск и компания, которая была основана им, чтобы вдохнуть жизнь в освоение космоса, не спешили делиться подробностями. Марк Хэдли, профессор Университетского колледжа Лондона, создал модель, которая покажет миру, на что будет похож Starlink в итоге.&nbsp;</div><div><b>Формула: H<sub>2</sub>O</b></div><div><br></div><div><span style="\\&quot;font-size:" 20px;="" background-color:="" transparent;\\"=""></span></div><div><b></b></div>',
      linkNews: string = CONSTANTS.MOCK.NEWS_IMAGE,
      date = dateTimeService.unixToDate('1541538783'),
      tags = ['Space', 'Humans', 'Potato'];
    this.mockNews = new News (this.mockUser, date, title, text, linkNews, tags,100, 5);

    this.categorysList = [
      new Category(1, 'Anime', true),
      new Category(2, 'Web', false),
      new Category(3, 'Design', false),
      new Category(4, 'Android', false),
      new Category(5, 'Toasters', false),
      new Category(6, 'iOS', false),
      new Category(7, 'Space', false),
      new Category(8, 'Navalny', false),
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
