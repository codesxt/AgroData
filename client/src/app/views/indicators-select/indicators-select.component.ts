import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar , NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserSettingsService } from '../../services/user-settings.service';


const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  templateUrl: 'indicators-select.component.html'
})
export class IndicatorsSelectComponent implements OnInit{
  hoveredDate : NgbDateStruct;
  fromDate    : NgbDateStruct;
  toDate      : NgbDateStruct;

  selectedIndicator       : any = null;

  temperatureIndicators   : any = {};
  originalTemperatureIndicators : any = {};

  rainIndicators          : any = {};
  originalRainIndicators  : any = {};

  windIndicators          : any = {};
  originalWindIndicators  : any = {};

  humidityIndicators      : any = {};
  originalHumidityIndicators : any = {};

  radiationIndicators     : any = {};
  originalRadiationIndicators : any = {};
  constructor(
    private calendar           : NgbCalendar,
    private modalService       : NgbModal,
    private userSettingsService : UserSettingsService
  ) { }

  ngOnInit(){
    let indicators  = this.userSettingsService.getTemperatureIndicators();
    this.temperatureIndicators = indicators;
    this.originalTemperatureIndicators = JSON.parse(JSON.stringify(indicators));

    indicators  = this.userSettingsService.getRainIndicators();
    this.rainIndicators = indicators;
    this.originalRainIndicators = JSON.parse(JSON.stringify(indicators));

    indicators  = this.userSettingsService.getWindIndicators();
    this.windIndicators = indicators;
    this.originalWindIndicators = JSON.parse(JSON.stringify(indicators));

    indicators  = this.userSettingsService.getHumidityIndicators();
    this.humidityIndicators = indicators;
    this.originalHumidityIndicators = JSON.parse(JSON.stringify(indicators));

    indicators  = this.userSettingsService.getRadiationIndicators();
    this.radiationIndicators = indicators;
    this.originalRadiationIndicators = JSON.parse(JSON.stringify(indicators));
  }

  open(content, indicator) {
    this.toDate = indicator.to;
    this.fromDate = indicator.from;
    this.selectedIndicator = indicator;
    this.modalService.open(content).result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }

  toggleIndicator(ind: any){
    if(ind.to == null || ind.from == null){
      alert("Se deben seleccionar las fechas para el indicador antes de poder activarlo.");
      setTimeout(() => {
        ind.enabled = false;
      }, 100)
    }else{

    }
  }

  areTemperaturesEqual(){
    return JSON.stringify(this.temperatureIndicators) == JSON.stringify(this.originalTemperatureIndicators);
  }

  areRainsEqual(){
    return JSON.stringify(this.rainIndicators) == JSON.stringify(this.originalRainIndicators);
  }

  areWindsEqual(){
    return JSON.stringify(this.windIndicators) == JSON.stringify(this.originalWindIndicators);
  }

  areHumidityEqual(){
    return JSON.stringify(this.humidityIndicators) == JSON.stringify(this.originalHumidityIndicators);
  }

  areRadiationEqual(){
    return JSON.stringify(this.radiationIndicators) == JSON.stringify(this.originalRadiationIndicators);
  }

  saveChangesTemperature(){
    this.userSettingsService.setTemperatureIndicators(this.temperatureIndicators);
    this.originalTemperatureIndicators = JSON.parse(JSON.stringify(this.temperatureIndicators));
  }

  saveChangesRain(){
    this.userSettingsService.setRainIndicators(this.rainIndicators);
    this.originalRainIndicators = JSON.parse(JSON.stringify(this.rainIndicators));
  }

  saveChangesWind(){
    this.userSettingsService.setWindIndicators(this.windIndicators);
    this.originalWindIndicators = JSON.parse(JSON.stringify(this.windIndicators));
  }

  saveChangesHumidity(){
    this.userSettingsService.setHumidityIndicators(this.humidityIndicators);
    this.originalHumidityIndicators = JSON.parse(JSON.stringify(this.humidityIndicators));
  }

  saveChangesRadiation(){
    this.userSettingsService.setRadiationIndicators(this.radiationIndicators);
    this.originalRadiationIndicators = JSON.parse(JSON.stringify(this.radiationIndicators));
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.selectedIndicator.from && !this.selectedIndicator.to) {
      this.fromDate = date;
      this.selectedIndicator.from = this.fromDate; //
    } else if (this.selectedIndicator.from && !this.selectedIndicator.to && after(date, this.selectedIndicator.from)) {
      this.toDate = date;
      this.selectedIndicator.to = this.toDate;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.selectedIndicator.from = this.fromDate;
      this.selectedIndicator.to = this.toDate;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside  = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom    = date => equals(date, this.fromDate);
  isTo      = date => equals(date, this.toDate);
}
