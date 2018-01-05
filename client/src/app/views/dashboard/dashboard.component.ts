import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgrometService } from '../../services/agromet.service';
import { OpenweatherService } from '../../services/openweather.service';

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
  lastMeasurements: any    = null;
  currentWeather  : any    = null;
  weatherForecast : any    = null;
  constructor(
    private agrometService : AgrometService,
    private openweatherService : OpenweatherService
  ) { }

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
    this.openweatherService.getCurrentWeather("Armerillo")
    .subscribe(
      response => {
        console.log(response);
      },
      error    => {

      }
    )
  }

  ngOnInit(){
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
    let N_DATA = 31;
    let WIND_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    this.stationData = [];
    this.lastMeasurements = null;
    for(let i = 0; i<N_DATA; i++){
      let row = {};
      row.averageTemperature  = Math.round((Math.random() * 10) + 20);
      row.minimumTemperature  =  row.averageTemperature - 2;
      row.maximumTemperature  = row.averageTemperature + 2;
      row.averageHumidity     = Math.round(Math.random() * 100);
      row.atmosphericPressure = Math.random()*50 + 1000;
      row.solarRadiation      = Math.round(Math.random() * 1500);
      row.windSpeed           = Math.random()*2 + 1;
      row.windDirection       = WIND_DIRECTIONS[Math.floor(Math.random()*WIND_DIRECTIONS.length)]
      this.stationData.push(row);
    }
    this.lastMeasurements = this.stationData[0];
    this.lastMeasurements.gd  = Math.floor(Math.random()*25);
    this.lastMeasurements.gdh = this.lastMeasurements.gd * 6;
    this.lastMeasurements.coldHours = Math.floor(Math.random()*4);
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
}
