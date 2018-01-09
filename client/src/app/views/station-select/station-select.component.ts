import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgrometService } from '../../services/agromet.service';
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
  constructor(
    private agrometService      : AgrometService,
    private userSettingsService : UserSettingsService
  ) { }

  ngOnInit(){
    let userPreferences  = this.userSettingsService.getUserPreferences();
    this.selectedRegion  = userPreferences.region;
    this.selectedCity    = userPreferences.city;
    this.selectedStation = userPreferences.station;
    this.agrometService.getRegions().subscribe(
      (response) => {
        this.regions = response.regions;
        if(!this.selectedRegion){
          this.selectedRegion = this.regions[0].id;
        }
        this.agrometService.getCities(this.selectedRegion).subscribe(
          (response) => {
            this.cities = response.cities;
            if(!this.selectedCity){
              this.selectedCity = this.cities[0].id;
            }
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
      (error) => {

      }
    )
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

  saveData(){
    this.userSettingsService.setUserPreferences(this.selectedRegion, this.selectedCity, this.selectedStation);
  }
}
