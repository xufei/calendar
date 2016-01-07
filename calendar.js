export class Calendar {
	constructor(date) {
		this.years = [];
		this.months = Array.from(Array(12), (v, i) => i);
		this.days = [];
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
		if ((typeof(val) == "number") && (val > 0)) {
			this._year = val;
	
			let startIndex = Math.floor(val / 10) * 10 + 1;
			this.years = Array.from(Array(10), (v, k) => k + startIndex);
		}
	}

	get month() {
		return this._month;
	}

	set month(val) {
		if ((typeof(val) == "number") && (val >= 0) && (val < 12)) {
			this._month = val;
	
			let offset = new Date(new Date(this._year, val, 1).valueOf()).getDay();
			let lastDay = new Date(new Date(this._year, val + 1, 1).valueOf() - 1);
	
			this.days = [];
	
			for (let day = offset; day < lastDay.getDate() + offset; day++) {
				if (!this.days[Math.floor(day / 7)]) {
					this.days[Math.floor(day / 7)] = [];
				}
	
				this.days[Math.floor(day / 7)][day % 7] = day;
			}
		}
	}

	get date() {
		return this._date;
	}

	set date(val) {
		if ((typeof(val) == "number") && (val > 0) && (val < 32)) {
			this._date = val;
		}
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