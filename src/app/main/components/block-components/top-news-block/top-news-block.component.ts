import { Component } from '@angular/core';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {AppStringService} from '@shared/services/app-string.service';
import {AppDateTimeService} from '@shared/services/app-date-time.service';

@Component({
  selector: 'app-top-news-block',
  templateUrl: './top-news-block.component.html',
  styleUrls: ['./top-news-block.component.scss']
})
export class TopNewsBlockComponent {
  mockNews: News;
  mockUser: User;

  constructor(
    private stringService: AppStringService,
    private dateTimeService: AppDateTimeService
  ) {
    let linkUser: string = 'https://hsto.org/getpro/habr/avatars/fc7/23a/b6b/fc723ab6b9870078eefc3aba22c605ad.png';
    this.mockUser = new User('Sirius', 'Dark', linkUser, 0, 'Admin');

    let title: string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eg dolor. Aenean massa.',
      text: string = 'Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок. Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением покоя, что искусство мое страдает от этого. Ни одного штриха не мог бы я сделать, а никогда не был таким большим художником, как в эти минуты. Когда от милой моей долины поднимается пар и полдневное солнце стоит над непроницаемой чащей темного леса и лишь редкий луч проскальзывает в его святая святых, а я лежу в высокой траве у быстрого ручья и, прильнув к земле, вижу тысячи всевозможных былинок и чувствую, как близок.',
      //linkNews: string = 'https://habrastorage.org/getpro/habr/post_images/349/844/4f8/3498444f856e32a0b6fbdb7877ac5610.jpg',
      linkNews: string = '#',
      date = dateTimeService.unixToDate('1541538783'),
      tags = ['Space', 'Humans', 'Potato'];
    this.mockNews = new News (this.mockUser, date, title, text, linkNews, tags,100, 5);
  }
}
