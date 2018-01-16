import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class IndicatorsService {
  constructor(
    private http: Http
  ) { }
  baseURL: string = environment.apiUrl;

  getDaysTempGT25Deg(stationId: number, from: string, to: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('from' , from);
    params.append('to'   , to);
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/api/v1/indicators/daysTempGT25Deg/'+stationId;
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getDaysTempGT30Deg(stationId: number, from: string, to: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('from' , from);
    params.append('to'   , to);
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/api/v1/indicators/daysTempGT30Deg/'+stationId;
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getDaysTempGT34Deg(stationId: number, from: string, to: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('from' , from);
    params.append('to'   , to);
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/api/v1/indicators/daysTempGT34Deg/'+stationId;
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getDegreeDays(stationId: number, from: string, to: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('from' , from);
    params.append('to'   , to);
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/api/v1/indicators/degreeDays/'+stationId;
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getColdHours(stationId: number, from: string, to: string): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('from' , from);
    params.append('to'   , to);
    let options = new RequestOptions({
      headers : headers,
      params  : params
    });
    let url = this.baseURL+'/api/v1/indicators/coldHours/'+stationId;
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }
}
