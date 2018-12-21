import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  public title: string;
  public text: string;
  public imagesArr: Array<object>;

  constructor() {
    this.title = 'Информация о нашей команде «Elite Team»';
    this.imagesArr = [
      {title: "Виталик", link:"https://lh3.googleusercontent.com/T1O_0wobYL4KWIVsPdgyLvVZS8SEb1HE8XXCIInEuhAuLhbcYSD0_RFMuFwXqKKq84GDRnhP085mOXKKg8sJWH7u_F9ODurU28QpuEGHVuFcsSjGSECtPQ-By_NeIAi63mIIQa2R2RJbilg5LNEKqImHZd2iaFbNiRJ_4a5upkBqOjXGumssZa_wYj60omwYDUAlx3dJlwiC5vEZeGjGV91zVQbEE96oxsxyJph5IbI07orIzvmSMJu03ovCmhzgzZSRl52ZDifdvGQaaZ2JBUO3tap4AloCLdiNpChSUppENYGpY7VtNfQHfb3epjkMRL_iHTtBe-Po8HS28M_w9TmaDaVxY7zTqYTQaaqEvlJT7I_gq-kXN6QdIuNIaJgKnb595M8xgBdGIW3j_-GXAMELJVsKu018U9iWyb3fmfh-ETyQ44Nchoh7NPUS4PUyh51bUIIUn813O8sK86xmRLIIYEBPMyoNVAzCJHOnn4kB3-vWeE6Vwh-MmipbcI60UbT_WV5s_8LCknbhB102JqGSExjXNVXTE1psOHl-XYSfHt_mV13OEuw1X6yleAvVl6gsXcDCnX4jD1l7TaLpcUZY0R83TQ=s1628-w1628-h915-no"},
      {title: "Максим", link:"https://cdn.igromania.ru/mnt/videos/8/e/0/3/4/20366/3f40f9c8c7cb0fbd7355f1c8cb1fab54_original.jpg"},
      {title: "Славик", link:"https://cdn.igromania.ru/mnt/videos/8/e/0/3/4/20366/3f40f9c8c7cb0fbd7355f1c8cb1fab54_original.jpg"},
      {title: "Даша", link:"https://pp.userapi.com/c604531/v604531288/31cf6/jdJvnfFaUO8.jpg"}
    ]
  }

  ngOnInit() {
  }

}
