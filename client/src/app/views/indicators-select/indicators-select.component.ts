import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDatepickerI18n, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
// import { NgbDateStruct, NgbCalendar , NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserSettingsService } from '../../services/user-settings.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const I18N_VALUES = {
  'es': {
    weekdays: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
    months_full: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return I18N_VALUES[this._i18n.language].months_full[month - 1];
  }
}

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: toInteger(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` :
        '';
  }
}

@Component({
  templateUrl: 'indicators-select.component.html',
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class IndicatorsSelectComponent implements OnInit{
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

  evapotranspirationIndicators  : any = {};
  originalEvapotranspirationIndicators  : any = {};

  constructor(
    private modalService       : NgbModal,
    private userSettingsService : UserSettingsService,
    private router              : Router
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

    indicators = this.userSettingsService.getEvapotranspirationIndicators();
    this.evapotranspirationIndicators = indicators;
    this.originalEvapotranspirationIndicators = JSON.parse(JSON.stringify(indicators));

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

  toggleIndicator(ind: any, content){

    if(ind.to == null || ind.from == null){
      alert("Se deben seleccionar las fechas para el indicador antes de poder activarlo.");
      setTimeout(() => {
        ind.enabled = false;
      }, 100)
      this.open(content, ind);
    }else{

    }
  }

  toggleIndicatorDate() {
    console.log('test');
    // this.toDate = new Date();
    // console.log(this.toDate);
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

  areEvapotranspirationEqual(){
    return JSON.stringify(this.evapotranspirationIndicators) == JSON.stringify(this.originalEvapotranspirationIndicators);
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

  saveChangesEvapotranspiration() {
    this.userSettingsService.setEvapotranspirationIndicators(this.evapotranspirationIndicators);
    this.originalEvapotranspirationIndicators = JSON.parse(JSON.stringify(this.evapotranspirationIndicators));
  }

  showIndicators(){
    this.router.navigate(['/indicators']);
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
}

export class NgbdDatepickerPopup {
  fromDate;
  toDate;
}
