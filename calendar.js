"use strict";

export default class Calendar {
	constructor(year, month) {
		this.year = year;
		this.month = month;
	}

	static months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	static weekdays = ["日", "一", "二", "三", "四", "五", "六"];

	get year() {
		return this._year;
	}

	set year(val) {
		this._year = val;
		
		this.years = [];
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
		
		this.calendar = [];

		let offset = new Date(new Date(this._year, val, 1)).getDay();
		let lastDay = new Date(new Date(this._year, val + 1, 1) - 1);

		for (let day = offset; day < lastDay.getDate() + offset; day++) {
			if (this.calendar[Math.floor(day / 7)]) {
				this.calendar[Math.floor(day / 7)] = [];
			}
			this.calendar[Math.floor(day / 7)][day % 7] = day - offset + 1;
		}
	}

	previousMonth() {
		this.month--;
	}

	nextMonth() {
		this.month++;
	}
}