import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Emoji } from './emoji';

@Injectable()
export class EmojiService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private emojisUrl = 'api/emojis';  // URL to web api

  constructor(private http: Http) { }


  getEmojis(): Promise<Emoji[]>{
    return this.http.get(this.emojisUrl)
              .toPromise()
              .then(response => response.json().data as Emoji[])
              .catch(this.handleError);
  }
  getEmoji(id: number): Promise<Emoji> {
    const url = `${this.emojisUrl}/${id}`;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json().data as Emoji)
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
