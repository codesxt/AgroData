import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserSettingsService {
  constructor(
    private http: Http
  ) { }

  setUserPreferences(region, city, station){
    let preferences = {
      region  : region,
      city    : city,
      station : station
    }
    localStorage.setItem('user-settings', JSON.stringify(preferences));
  }

  getUserPreferences(){
    let local = localStorage.getItem('user-settings');
    if(local){
      return JSON.parse(local);
    }else{
      return null;
    }
  }
}
