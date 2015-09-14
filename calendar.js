"use strict";

export default class Calendar {
	constructor(date) {
		this.years = [];
		// 这里直接生成二维数组？好纠结啊
		this.months = Array.from(Array(4), (m, i) => Array.from(Array(3), (n, j) => i * 3 + j));

		this.days = [];
		this.dateMap = new Map();

		this.currentDate = date || new Date();
	}

	get currentDate() {
		return new Date(this._year, this._month, this._date);
	}

	set currentDate(val) {
		if (val) {
			this.year = val.getFullYear();
			this.month = val.getMonth();
			this.date = val.getDate();
		}
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

		let offset = new Date(new Date(this._year, val, 1)).getDay();
		let lastDay = new Date(new Date(this._year, val + 1, 1) - 1);

		this.days = [];
		this.dateMap.clear();

		for (let day = offset; day < lastDay.getDate() + offset; day++) {
			var dayObj = new Day(new Date(this.year, this.month, day - offset + 1), {});

			if (!this.days[Math.floor(day / 7)]) {
				this.days[Math.floor(day / 7)] = [];
			}

			this.days[Math.floor(day / 7)][day % 7] = dayObj;
			this.dateMap.set(day - offset + 1, dayObj);
		}
	}

	get date() {
		return this._date;
	}

	set date(val) {
		this._date = val;
		this.selectedDate = this.dateMap.get(val);
	}

	previousAge() {
		this.year -= 10;
	}

	nextAge() {
		this.year += 10;
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

class Day {
	constructor(date, data) {
		this.date = date;
		this.data = data;
	}

	valueOf() {
		return this.date.valueOf();
	}
}
