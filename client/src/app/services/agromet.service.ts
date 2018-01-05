import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AgrometService {
  constructor(
    private http: Http
  ) { }
  baseURL: string = environment.apiUrl;

  getRegions(): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });
    let url = this.baseURL+'/api/v1/agromet/regions';
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getCities(region: number): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('region', region+"");
    let options = new RequestOptions({
      headers: headers,
      params: params
    });
    let url = this.baseURL+'/api/v1/agromet/cities';
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }

  getStations(region: number, city: number): any{
    let headers = new Headers({  });
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    params.append('region', region+"");
    params.append('city', city+"");
    let options = new RequestOptions({
      headers: headers,
      params: params
    });
    let url = this.baseURL+'/api/v1/agromet/emas';
    return this.http.get(url, options).map(
      (response: Response) => response.json()
    );
  }
}
