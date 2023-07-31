import { Component } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  days: string[] = [];

  monthDetails: any[] = [];

  today: number = -1;

  selectedDate: number = -1;


  constructor() {}

  //How many days are there in a month?
  //Which day it is?

  //42 elements always needed
  // {
  //   date: number;
  //   day: 'MONDAY';
  // }
  ngOnInit() {
    const startOfMonth = dayjs().startOf('month');
    this.today = dayjs().date();
    console.log('startOFMonth is', startOfMonth);
    const daysInMonth = dayjs().daysInMonth();

    this.monthDetails = [];
    let currentDay = startOfMonth.day();

    for (let i = 0; i < daysInMonth; i++) {
      this.monthDetails.push({
        date: i + 1,
        day: currentDay % 7,
      });
      currentDay++;
    }

    const prefixDays = this.monthDetails[0].day;
    for (let i = 0; i < prefixDays; i++) {
      this.monthDetails.unshift({
        day: 0,
        date: 0,
      });
    }

    console.log('MONTH DETAIUls', this.monthDetails);

    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  }

  dateSelected(date: number) {
    this.selectedDate = date;
  }
}
