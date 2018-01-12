import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar , NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  constructor(
    private calendar           : NgbCalendar,
    private modalService       : NgbModal
  ) { }

  ngOnInit(){

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
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside  = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom    = date => equals(date, this.fromDate);
  isTo      = date => equals(date, this.toDate);
}
