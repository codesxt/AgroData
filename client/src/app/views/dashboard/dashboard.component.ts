import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgrometService } from '../../services/agromet.service';
import { OpenweatherService } from '../../services/openweather.service';
import { NgbDateStruct, NgbCalendar , NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as zpad from 'zpad';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  regions  : any = [];
  cities   : any = [];
  stations : any = [];
  selectedRegion  : number = 1;
  selectedCity    : number = 1;
  selectedStation : number = 1;
  stationData     : any    = [];
  currentWeather  : any    = null;
  weatherForecast : any    = null;

  hoveredDate : NgbDateStruct;
  fromDate    : NgbDateStruct;
  toDate      : NgbDateStruct;
  constructor(
    private agrometService     : AgrometService,
    private openweatherService : OpenweatherService,
    private calendar           : NgbCalendar,
    private modalService       : NgbModal
  ) {
  }

  onRegionUpdate(){
    this.agrometService.getCities(this.selectedRegion)
    .subscribe(
      (response) => {
        this.cities = response.cities;
        this.selectedCity = this.cities[0].id;
        this.agrometService.getStations(this.selectedRegion, this.selectedCity)
        .subscribe(
          (response) => {
            this.stations = response.stations;
            if(this.stations.length>0){
              this.selectedStation = this.stations[0].id;
              this.getStationData();
              this.getCurrentWeather();
            }else{
              this.selectedStation = null;
            }
          },
          (error) => {

          }
        )
      },
      (error) => {

      }
    )
  }

  onCityUpdate(){
    this.agrometService.getStations(this.selectedRegion, this.selectedCity)
    .subscribe(
      (response) => {
        this.stations = response.stations;
        this.getCurrentWeather();
        if(this.stations.length>0){
          this.selectedStation = this.stations[0].id;
          this.getStationData();
        }else{
          this.selectedStation = null;
        }
      },
      (error) => {

      }
    )
  }

  onStationUpdate(){
    // Cargar Datos
    console.log("Station updated.");
    this.getStationData();
  }

  ngOnInit(){
    this.fromDate = this.calendar.getToday();
    this.fromDate.day -= 1;
    this.toDate   = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.agrometService.getRegions()
    .subscribe(
      (response) => {
        this.regions = response.regions;
        this.selectedRegion = this.regions[0].id;
        this.agrometService.getCities(this.selectedRegion)
        .subscribe(
          (response) => {
            this.cities = response.cities;
            this.selectedCity = this.cities[0].id;
            this.getCurrentWeather();
            this.agrometService.getStations(this.selectedRegion, this.selectedCity)
            .subscribe(
              (response) => {
                this.stations = response.stations;
                if(this.stations.length>0){
                  this.selectedStation = this.stations[0].id;
                }else{
                  this.selectedStation = null;
                }
                this.getStationData();
              },
              (error) => {

              }
            )
          },
          (error) => {

          }
        )
      },
      (error) => {

      }
    )
  }

  getStationData(){
    let station = this.stations.filter((item) => {
      return item.id == this.selectedStation
    })[0];
    let from = "";
    let to   = "";
    if(this.fromDate){
      from += this.fromDate.year+"-";
      from += zpad(this.fromDate.month, 2)+"-";
      from += zpad(this.fromDate.day, 2);
    }
    if(this.toDate){
      to += this.toDate.year+"-";
      to += zpad(this.toDate.month, 2)+"-";
      to += zpad(this.toDate.day, 2);
    }
    if(to != ""){
      this.agrometService.getHistory(station.id, from, to)
      .subscribe(
        response => {
          this.stationData = [];
          response.data.forEach((item) => {
            this.stationData.push({
              date                : item.date,
              averageTemperature  : item.airTemperatureAvg,
              minimumTemperature  : item.temperatureMin,
              maximumTemperature  : item.temperatureMax,
              hourlyRainfall      : item.hourlyRainfall,
              averageHumidity     : item.relativeHumidityAvg,
              atmosphericPressure : item.atmosphericPressure,
              solarRadiation      : item.solarRadiationMax,
              windSpeed           : item.windSpeedMax,
              windDirection       : item.windDirection,
              degreeDay           : item.degreeDay,
              coldHours           : item.coldHours
            })
          })
        },
        error    => {

        }
      )
    }else{
      this.agrometService.getHistory(station.id, from)
      .subscribe(
        response => {
          this.stationData = [];
          response.data.forEach((item) => {
            this.stationData.push({
              date                : item.date,
              averageTemperature  : item.airTemperatureAvg,
              minimumTemperature  : item.temperatureMin,
              maximumTemperature  : item.temperatureMax,
              hourlyRainfall      : item.hourlyRainfall,
              averageHumidity     : item.relativeHumidityAvg,
              atmosphericPressure : item.atmosphericPressure,
              solarRadiation      : item.solarRadiationMax,
              windSpeed           : item.windSpeedMax,
              windDirection       : item.windDirection,
              degreeDay           : item.degreeDay,
              coldHours           : item.coldHours
            })
          })
        },
        error    => {

        }
      )
    }
  }

  getCurrentWeather(){
    let regionString = this.regions.filter((item)=>{
      return item.id==this.selectedRegion
    })[0].name;
    let cityString = this.cities.filter((item)=>{
      return item.id==this.selectedCity
    })[0].name;
    let queryString = cityString + "," + regionString +",Chile";
    console.log("Looking for : " + queryString);
    this.openweatherService.getCurrentWeather(queryString)
    .subscribe(
      response => {
        this.currentWeather = response;
      },
      error    => {

      }
    )

    this.openweatherService.get5DayForecast(cityString+",cl")
    .subscribe(
      response => {
        this.weatherForecast = response;
      },
      error    => {

      }
    )
  }

  open(content) {
    this.modalService.open(content).result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.getStationData();
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside  = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom    = date => equals(date, this.fromDate);
  isTo      = date => equals(date, this.toDate);
}
