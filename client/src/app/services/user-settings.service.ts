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

  getRainIndicators(){
    let local = localStorage.getItem('rain-indicators');
    if(local){
      return JSON.parse(local);
    }else{
      let indicators = [
        {
          enabled   : false,
          indicator : 'daysRainOver10mm',
          name      : 'Días con lluvia > 10 mm',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'totalRain',
          name      : 'Lluvia total del mes (mm)',
          from      : null,
          to        : null
        }
      ]
      localStorage.setItem('rain-indicators', JSON.stringify(indicators));
      return indicators;
    }
  }

  setRainIndicators(indicators){
    localStorage.setItem('rain-indicators', JSON.stringify(indicators));
  }

  getWindIndicators(){
    let local = localStorage.getItem('wind-indicators');
    if(local){
      return JSON.parse(local);
    }else{
      let indicators = [
        {
          enabled   : false,
          indicator : 'daysWindOver5kmh',
          name      : 'Días con viento > 5 km/h',
          from      : null,
          to        : null
        },
        {
          enabled   : false,
          indicator : 'daysWindOver10kmh',
          name      : 'Días con viento 10 > km/h',
          from      : null,
          to        : null
        }
      ]
      localStorage.setItem('wind-indicators', JSON.stringify(indicators));
      return indicators;
    }
  }

  setWindIndicators(indicators){
    localStorage.setItem('wind-indicators', JSON.stringify(indicators));
  }

  getHumidityIndicators(){
    let local = localStorage.getItem('hum-indicators');
    if(local){
      return JSON.parse(local);
    }else{
      let indicators = [
        {
          enabled   : false,
          indicator : 'averageRelativeHumidity',
          name      : 'Promedio de humedad relativa del aire',
          from      : null,
          to        : null
        }
      ]
      localStorage.setItem('hum-indicators', JSON.stringify(indicators));
      return indicators;
    }
  }

  setHumidityIndicators(indicators){
    localStorage.setItem('hum-indicators', JSON.stringify(indicators));
  }

  getRadiationIndicators(){
    let local = localStorage.getItem('rad-indicators');
    if(local){
      return JSON.parse(local);
    }else{
      let indicators = [
        {
          enabled   : false,
          indicator : 'accumulatedSolarRadiation',
          name      : 'Radiación solar acumulada',
          from      : null,
          to        : null
        }
      ]
      localStorage.setItem('rad-indicators', JSON.stringify(indicators));
      return indicators;
    }
  }

  setRadiationIndicators(indicators){
    localStorage.setItem('rad-indicators', JSON.stringify(indicators));
  }
}
