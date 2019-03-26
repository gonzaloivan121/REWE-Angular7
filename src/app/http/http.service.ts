import { Injectable } from '@angular/core';
import { HttpClient, XhrFactory } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpService {

  response: any;

  constructor(private http: HttpClient, public translate: TranslateService) {}

  static async getResponse(idCard: number = 2401235350799, user: string = "admin", pass: string = "e9TwgxmZ-MeDTcE*aKAh9d[Lp~wVGt9W") {
    // 2401235350799
    let url = 'https://bonuscoupon-stg.rewe-systems.local/karte/' + idCard + '/mandant/413';
    let b64access = window.btoa(user + ":" + pass);
    let values;

    if (!checkMSIE()) {
      // START FETCH
      return fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + b64access
        }
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res;
        }
      }).catch(err => err);
      // END FETCH
    } else {
      // START XMLHTTP
      var req = new XMLHttpRequest();
      var value;

      //req.withCredentials = true;
      req.open("GET", url);

      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("Authorization", "Basic " + b64access);
      
      req.send();

      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          value = req.response;
          observe.apply(this, [value]);
        }
      }

      return new Promise(await function(resolve, reject) {
        resolve(this.values);
        reject(new Error("Error"));
      })
      // END XMLHTTP
    }

  }

}

function observe(ev) {
  this.values = ev;
}

function checkMSIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    //console.log('Internet Explorer');
    return true;
  } else {
    //console.log('Other Browser');
    return false;
  }
}