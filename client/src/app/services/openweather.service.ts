import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class OpenweatherService {
  private _APIKEY : string = '7d10c74d314451eb931fb6e79661f8af';
  constructor(
    private http: Http
  ) { }
  baseURL: string = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/';

  getCurrentWeather(query: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('q', query);
    params.append('APPID', this._APIKEY);
    params.append('units', 'metric');
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/weather';
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  get5DayForecast(query: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('q', query);
    params.append('APPID', this._APIKEY);
    params.append('units', 'metric');
    params.append('cnt', '12');
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/forecast';
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }
}
