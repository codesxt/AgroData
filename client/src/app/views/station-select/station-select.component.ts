import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgrometService } from '../../services/agromet.service';
import { OpenweatherService } from '../../services/openweather.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  templateUrl: 'station-select.component.html'
})
export class StationSelectComponent implements OnInit{
  regions  : any = [];
  cities   : any = [];
  stations : any = [];
  selectedRegion  : number = null;
  selectedCity    : number = null;
  selectedStation : number = null;
  stationsLoaded  : boolean = false;
  currentWeather  : any     = null;
  weatherForecast : any     = null;
  constructor(
    private agrometService      : AgrometService,
    private userSettingsService : UserSettingsService,
    private router              : Router,
    private openweatherService  : OpenweatherService
  ) { }

  ngOnInit(){
    let userLogged = this.userSettingsService.getUserLogged();
    if (!userLogged.login) this.router.navigate(['/login']);

    if (this.userSettingsService.getUserLogged().login && this.userSettingsService.getUserPreferences) {
      this.router.navigate(['/indicators']);
    }

    let userPreferences  = this.userSettingsService.getUserPreferences();
    if(userPreferences){
      this.selectedRegion  = userPreferences.region;
      this.selectedCity    = userPreferences.city;
      this.selectedStation = userPreferences.station;
    }
    this.agrometService.getRegions().subscribe(
      (response) => {
        this.regions = response.regions;
        if(!this.selectedRegion){
          this.selectedRegion = this.regions[0].id;
          // Forzar región del Maule
          this.selectedRegion = 9;
        }
        this.agrometService.getCities(this.selectedRegion).subscribe(
          (response) => {
            this.cities = response.cities;
            if(!this.selectedCity){
              this.selectedCity = this.cities[0].id;
            }
            this.getCurrentWeather();
            this.agrometService.getStations(this.selectedRegion, this.selectedCity).subscribe(
              (response) => {
                this.stations = response.stations;
                this.stationsLoaded = true;
                if(this.stations.length>0){
                  if(!this.selectedStation){
                    this.selectedStation = this.stations[0].id;
                  }
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
      },
      (error   ) => {

      }
    )
  }

  onStationUpdate(){
    console.log("Station updated.");
  }

  onCityUpdate(){
    console.log("City updated.");
    this.agrometService.getStations(this.selectedRegion, this.selectedCity)
    .subscribe(
      (response) => {
        this.stations = response.stations;
        if(this.stations.length>0){
          this.selectedStation = this.stations[0].id;
        }else{
          this.selectedStation = null;
        }
      },
      (error) => {}
    )
    this.getCurrentWeather()
  }

  onRegionUpdate(){
    console.log("Region updated.");
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
      error => {}
    )

    this.openweatherService.get5DayForecast(cityString+",cl")
    .subscribe(
      response => {
        this.weatherForecast = response;
      },
      error => {}
    )
  }

  saveData(){
    this.userSettingsService.setUserPreferences(this.selectedRegion, this.selectedCity, this.selectedStation);
    this.router.navigate(['/indicators-select']);
  }
}
