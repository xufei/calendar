"use strict";

export default class Calendar {
	constructor(year, month) {
		this.years = [];
		this.months = Calendar._months;
		this.weekdays = Calendar._weekdays;
		this.days = [];

		this.year = year;
		this.month = month;
	}

	get year() {
		return this._year;
	}

	set year(val) {
		this._year = val;

		this.years.length = 0;
		let startIndex = Math.floor(val / 10) * 10 + 1;

		for (let year = 0; year < 10; year++) {
			this.years.push(startIndex + year);
		}
	}

	get month() {
		return this._month;
	}

	set month(val) {
		this._month = val;

		this.days.length = 0;

		let offset = new Date(new Date(this._year, val, 1)).getDay();
		let lastDay = new Date(new Date(this._year, val + 1, 1) - 1);

		for (let day = offset; day < lastDay.getDate() + offset; day++) {
			if (!this.days[Math.floor(day / 7)]) {
				this.days[Math.floor(day / 7)] = [];
			}
			this.days[Math.floor(day / 7)][day % 7] = day - offset + 1;
		}
	}

	previousAge() {
		this.year-=10;
	}

	nextAge() {
		this.year+=10;
	}

	previousYear() {
		this.year++;
		this.month = this.month;
	}

	nextYear() {
		this.year--;
		this.month = this.month;
	}

	previousMonth() {
		this.month--;
	}

	nextMonth() {
		this.month++;
	}
}

Calendar._months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
Calendar._weekdays = ["日", "一", "二", "三", "四", "五", "六"];
