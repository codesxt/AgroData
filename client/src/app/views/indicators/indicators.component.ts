import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSettingsService } from '../../services/user-settings.service';
import { IndicatorsService } from '../../services/indicators.service';
import * as zpad from 'zpad';


@Component({
  templateUrl: 'indicators.component.html'
})
export class IndicatorsComponent implements OnInit{
  temperatureIndicators         : any = {};
  rainIndicators                : any = {};
  windIndicators                : any = {};
  humidityIndicators            : any = {};
  radiationIndicators           : any = {};
  evapotranspirationIndicators  : any = {};
  userPreferences               : any = null;
  constructor(
    private userSettingsService : UserSettingsService,
    private indicatorsService   : IndicatorsService,
    private router              : Router
  ) { }

  ngOnInit(){
    let userLogged = this.userSettingsService.getUserLogged();
    if (!userLogged.login) this.router.navigate(['/login']);

    this.userPreferences = this.userSettingsService.getUserPreferences();
    if(!this.userPreferences){
      alert("Error: Debe seleccionar una estación para ver los indicadores.");
      this.router.navigate(['/station-select']);
    }
    let stationId = this.userPreferences.station;
    this.temperatureIndicators = this.userSettingsService.getTemperatureIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.rainIndicators = this.userSettingsService.getRainIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.windIndicators = this.userSettingsService.getWindIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.humidityIndicators = this.userSettingsService.getHumidityIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.radiationIndicators = this.userSettingsService.getRadiationIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.evapotranspirationIndicators = this.userSettingsService.getEvapotranspirationIndicators().filter((item) => {
      return item.enabled == true;
    });
    this.temperatureIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'daysTempGT25Deg'){
        this.indicatorsService.getDaysTempGT25Deg(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'daysTempGT30Deg'){
        this.indicatorsService.getDaysTempGT30Deg(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'daysTempGT34Deg'){
        this.indicatorsService.getDaysTempGT34Deg(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'degreeDays'){
        this.indicatorsService.getDegreeDays(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'coldHours'){
        this.indicatorsService.getColdHours(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
    this.rainIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'totalRain'){
        this.indicatorsService.getTotalRain(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'daysRainOver10mm'){
        this.indicatorsService.getDaysRainOver10mm(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
    this.windIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'daysWindOver5kmh'){
        this.indicatorsService.getDaysWindOver5kmh(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
      if(item.indicator == 'daysWindOver10kmh'){
        this.indicatorsService.getDaysWindOver10kmh(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
    this.humidityIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'averageRelativeHumidity'){
        this.indicatorsService.getAverageRelativeHumidity(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
    this.radiationIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'accumulatedSolarRadiation'){
        this.indicatorsService.getAccumulatedSolarRadiation(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
    this.evapotranspirationIndicators.forEach((item) => {
      item.fromString = zpad(item.from.day) + "-" + zpad(item.from.month) + "-" + item.from.year;
      item.toString = zpad(item.to.day) + "-" + zpad(item.to.month) + "-" + item.to.year;

      if(item.indicator == 'evapotranspiration'){
        this.indicatorsService.getEvapotranspiration(
          stationId,
          item.from.year + "-" + zpad(item.from.month) + "-" + zpad(item.from.day),
          item.to.year + "-" + zpad(item.to.month) + "-" + zpad(item.to.day)
        )
        .subscribe(
          data   => {
            item.value = data.value;
          },
          error  => {
            console.log(error);
            alert(error.json().error);
          }
        )
      }
    })
  }
}
