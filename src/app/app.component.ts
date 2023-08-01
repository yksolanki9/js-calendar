import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  days: string[] = [];

  monthDetails: any[] = [];

  selectedDate: Dayjs = dayjs();

  calendarToShow: Dayjs[] = [];

  currentMonth: number = 0;

  currentDate: Dayjs = dayjs();

  today: Dayjs = dayjs();

  constructor() {}

  ngOnInit() {
    this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    this.currentMonth = dayjs().month();
    this.createMonthCalendar(this.currentMonth);

    this.today = dayjs();
  }

  setCurrentMonth(val: number){
    this.currentMonth = val;
    this.createMonthCalendar(val);
  }

  createMonthCalendar(currentMonth: number) {
    console.log('CURRENT MONTH IS', currentMonth, 'and dayjsmonth is', dayjs().month());
    this.currentDate = dayjs().add(currentMonth - dayjs().month(), 'month');
    const currentYear = this.currentDate.year();

    const daysInCurrentMonth = dayjs().set('month', currentMonth).daysInMonth();
    const daysInPreviousMonth = dayjs().set('month', currentMonth - 1).daysInMonth();

    const dayOfWeek = dayjs().set('month', currentMonth).startOf('month').day();
    //0 to 6

    const currentMonthCalendar = Array.from(Array(daysInCurrentMonth).keys()).map((val) => dayjs(new Date(currentYear, currentMonth, val+1)));

    //Returns [0..6]
    const prevArray = Array.from(Array(dayOfWeek).keys());

    //Returns [6..0]
    prevArray.reverse()
    const prevYear = currentMonth - 1  < 0 ? currentYear - 1 : currentYear;

    //Gives last month's calendar
    const lastMonthCalendar = prevArray.map((val) => dayjs(new Date(prevYear, currentMonth - 1, daysInPreviousMonth - val)));

    //For next month. Got 42 as google calendar always shows 6 weeks to maintain the same height of calendar
    const lenOfNextMonth = 42 - (currentMonthCalendar.length + lastMonthCalendar.length);

    const nextYear = currentMonth + 1  > 11 ? currentYear + 1 : currentYear;
    const nextMonthCalendar = Array.from(Array(lenOfNextMonth).keys()).map((val) => dayjs(new Date(nextYear, currentMonth + 1, val + 1)));

    this.calendarToShow = [...lastMonthCalendar, ...currentMonthCalendar, ...nextMonthCalendar];
    console.log('calendarToShow', this.calendarToShow);
  }

  dateSelected(dayjsObj: Dayjs) {
    if(dayjsObj.month() !== this.currentMonth) {
      this.setCurrentMonth(dayjsObj.month());
    }
    this.selectedDate = dayjsObj;
  }
}
