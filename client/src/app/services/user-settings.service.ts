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

  getTemperatureIndicators(){
    let local = localStorage.getItem('temp-indicators');
    if(local){
      return JSON.parse(local);
    }else{
      let indicators = [
        {
          enabled   : false,
          indicator : 'daysTempGT25Deg',
          name      : 'Días con Temperatura > 25°C',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'daysTempGT30Deg',
          name      : 'Días con Temperatura > 30°C',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'daysTempGT34Deg',
          name      : 'Días con Temperatura > 34°C',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'degreeDays',
          name      : 'Suma de Grados Día',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'coldHours',
          name      : 'Suma de Horas de Frío',
          from      : null,
          to        : null
        }
      ]
      localStorage.setItem('temp-indicators', JSON.stringify(indicators));
      return indicators;
    }
  }

  setTemperatureIndicators(indicators){
    localStorage.setItem('temp-indicators', JSON.stringify(indicators));
  }
}
