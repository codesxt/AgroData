import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'odb.component.html'
})
export class OdbComponent implements OnInit{
  sectors : any = [];
  selectedStation : any;
  constructor(

  ) { }

  ngOnInit(){
    this.sectors = [
      'Sector'
    ]
  }
}
