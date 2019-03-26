import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { TranslateService } from '@ngx-translate/core';
import { Card } from './classes/card';

@Component({
  selector: 'http-app',
  templateUrl: 'http.html',
  styleUrls: ['http.css']
})

export class HttpComponent {
 
  public response: Array<any> = new Array();
  public card;
  public cards: Array<Card> = new Array();

  public logoSize = 1.1;
 
  constructor(public translate: TranslateService) {
    var lang = navigator.language.split("-")[0]
    
    translate.setDefaultLang(lang);
    translate.use(lang);
  }

  ngOnInit() {
    this.getResponse();
  }

  mouseEnter(ev) {
    this.logoSize += 0.025;
    ev.target.style.transform = "scale(" + this.logoSize + ")";
  }

  mouseLeave(ev) {
    this.logoSize = 1.0;
    ev.target.style.transform = "scale(" + this.logoSize + ")";
  }

  async getResponse() {
    //authorized    : 2401235350799
    //non authorized: 2409335788832
    await HttpService.getResponse().then(res => {
      if (!res.status) {
        this.card = res;

        for (let key in res) {
          this.translate.get(key).subscribe(val => {
            this.response.push({ title: val, res: res[key] });
          })
        }
      } else if (res.status === 401) {
        this.translate.get("auth_error").subscribe(val => {
          alert(val);
        });
      } else if (res.status === 404) {
        this.translate.get("no_connection").subscribe(val => {
          alert(val);
        });
      } else {
        //console.log(res)
      }
      
    });
    
  }

}