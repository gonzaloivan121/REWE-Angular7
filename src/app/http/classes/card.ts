import { HttpInterface } from '../interface/http.interface';
import { HttpService } from '../http.service';

export class Card implements HttpInterface {
   teilnahmebeginn: number;
   eweStatus: string;
   eweAenderung: number;
   eweUeberlagerung: any;
   gueltigBis: number;
   einloeseBis: number;
   ewe09: boolean;
   ewe16: boolean;

   constructor(n: number) {
      this.getData(n);
   }

   async getData(n: number = 2409335788832) {
      //non authorized: 2409335788832
      await HttpService.getResponse(n).then(res => {
         for (let key in res) {
            this[key] = res[key];
         }
      });
   }

}