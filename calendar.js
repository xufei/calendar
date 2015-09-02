"use strict";

export default class Calendar {
	constructor() {
		this.years = [];
		this.months = Calendar._months;
		this.weekdays = Calendar._weekdays;
		this.days = [];

		var now = new Date();
		this.year = now.getFullYear();
		this.month = now.getMonth();
		//this.date = this.days.find(d => d.date.getDate()==now.getDate());
	}

	get year() {
		return this._year;
	}

	set year(val) {
		this._year = val;

		let startIndex = Math.floor(val / 10) * 10 + 1;
		this.years = Array.from(Array(10), (v, k) => k + startIndex);
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

			this.days[Math.floor(day / 7)][day % 7] = new Day(new Date(this.year, this.month, day - offset + 1), {});
		}
	}

	get date() {
		return this._date;
	}

	set date(val) {
		this._date = date;
	}

	previousAge() {
		this.year-=10;
	}

	nextAge() {
		this.year+=10;
	}

	previousYear() {
		this.year--;
		this.month = this.month;
	}

	nextYear() {
		this.year++;
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

class Day {
	constructor(date, data) {
		this.date = date;
		this.data = data;
	}
}
