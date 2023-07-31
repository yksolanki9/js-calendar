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

  calendarToShow: number[] = [];

  currentMonth: number = 0;

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

    this.currentMonth = dayjs().month();
    this.createMonthCalendar(this.currentMonth);
  }

  setCurrentMonth(val: number){
    this.currentMonth = val;
    this.createMonthCalendar(val);
  }

  createMonthCalendar(currentMonth: number) {
    const daysInCurrentMonth = dayjs().set('month', currentMonth).daysInMonth();
    const daysInPreviousMonth = dayjs().set('month', currentMonth - 1).daysInMonth();

    const dayOfWeek = dayjs().set('month', currentMonth).startOf('month').day();
    //0 to 6

    const currentMonthCalendar = Array.from(Array(daysInCurrentMonth).keys()).map((val) => (val + 1));

    //Returns [0..6]
    const prevArray = Array.from(Array(dayOfWeek).keys());

    //Returns [6..0]
    prevArray.reverse()

    //Gives last month's calendar
    const lastMonthCalendar = prevArray.map((val) => daysInPreviousMonth - val);

    //For next month
    const lenOfNextMonth = 7 - ((currentMonthCalendar.length + lastMonthCalendar.length) % 7);

    const nextMonthCalendar = Array.from(Array(lenOfNextMonth).keys()).map((val) => val + 1);

    this.calendarToShow = [...lastMonthCalendar, ...currentMonthCalendar, ...nextMonthCalendar];
    console.log('calendarToShow', this.calendarToShow);
  }

  dateSelected(date: number) {
    this.selectedDate = date;
  }
}
