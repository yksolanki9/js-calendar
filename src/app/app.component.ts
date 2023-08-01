import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nameOfDays: string[] = [];

  selectedDate: Dayjs | null = null;

  calendarToShow: Dayjs[] = [];

  currentDate: Dayjs = dayjs();

  today: Dayjs = dayjs();

  constructor() {}

  ngOnInit() {
    this.nameOfDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.today = dayjs();
    this.createAndShowCalendar();
  }

  dateSelected(dayjsObj: Dayjs) {
    if(dayjsObj.isBefore(this.currentDate, 'month')) {
      this.changeMonth('PREV');
    } else if(dayjsObj.isAfter(this.currentDate, 'month')) {
       this.changeMonth('NEXT');
    }
    this.selectedDate = dayjsObj;
  }

  changeMonth(month: 'NEXT' | 'PREV') {
    this.currentDate = this.currentDate.add(month === 'NEXT' ? 1 : -1, 'month') ;
    this.createAndShowCalendar();
  }

  createAndShowCalendar() {
    const daysInCurrentMonth = this.currentDate.daysInMonth();
    const startOfMonth = this.currentDate.startOf('month');

    //Create dayjs[] for days in current month
    const currentMonth = this.currentDate.month();
    const currentYear = this.currentDate.year();
    const currentMonthCalendar = Array.from(Array(daysInCurrentMonth).keys()).map((val) => dayjs(new Date(currentYear, currentMonth, val+1)));
    
    /*
    * Create dayjs[] for days in prev month
    * - First, create an array of size equal to the no. of days of prev month that will be shown
    * - Then, get the last day of prev month
    * - With this, we can subtract the days in previous month from each value in this array to get date of prev month
    */
    const prevArray = Array.from(Array(startOfMonth.day()).keys());
    const endOfPrevMonth = startOfMonth.subtract(1, 'day');
    const prevMonthCalendar = prevArray.map((val) => dayjs(endOfPrevMonth).subtract(val, 'day'));
    prevMonthCalendar.reverse();

    /*
    * Create dayjs[] for days in next month
    * - Subtract the total days from 42 as we'll show 42 days everytime to maintain the height of calendar
    * - Calculate the next month's calendar using the same procedure
    */
    const lenOfNextMonth = 42 - (currentMonthCalendar.length + prevMonthCalendar.length);
    const startOfNextMonth = startOfMonth.add(1, 'month');
    const nextMonthCalendar = Array.from(Array(lenOfNextMonth).keys()).map((val) => startOfNextMonth.add(val, 'day'));

    //Combine the arrays to get the calendar that will be shown
    this.calendarToShow = [...prevMonthCalendar, ...currentMonthCalendar, ...nextMonthCalendar];
  }
}
