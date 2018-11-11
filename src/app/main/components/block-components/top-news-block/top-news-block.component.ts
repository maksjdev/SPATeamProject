import {Component, Input} from '@angular/core';
import {News} from '@shared/models/News';
import {AppStringService} from '@shared/services/app-string.service';

@Component({
  selector: 'app-top-news-block',
  templateUrl: './top-news-block.component.html',
  styleUrls: ['./top-news-block.component.scss']
})
export class TopNewsBlockComponent {
  @Input() news: News;
  constructor(
    private stringServivce: AppStringService
  ){}

}
