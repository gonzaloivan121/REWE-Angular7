import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateConverter',
  pure: false
})
export class DateConverterPipe implements PipeTransform {

  constructor (public translate: TranslateService) { }

  transform(data: number) {
    var v;

    if (!isNaN(data) && !(typeof data === "boolean") && data != null) {
      var opt = {
        timeZone: 'UTC'
      };
      v = new Date(data).toLocaleString('en-GB', opt);

      return v;
    } else {

      if (data != null) {
        this.translate.get(data.toString()).subscribe(val => {
          v = val;
        });

        return v;
      } else {
        this.translate.get("null").subscribe(val => {
          v = val;
        });

        return v;
      }
    }
  }

}