import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from '../types/DateRange';

@Component({
	selector: 'app-date-range-picker',
	templateUrl: './date-range-picker.component.html',
	styleUrls: ['./date-range-picker.component.scss']
})

// component based on example from https://ng-bootstrap.github.io/#/components/datepicker/examples#range
export class DateRangePickerComponent implements OnInit {
	@Input() initialDateRange: DateRange;
	@Output() updateDateRangeEvent = new EventEmitter<DateRange>();
	@ViewChild('dpFromDate') fromInput; 
	@ViewChild('dpToDate') toInput; 
	toDate: NgbDate | null;
	fromDate: NgbDate | null;

	// font awesome icon
	faCalendarAlt = faCalendarAlt;

	hoveredDate: NgbDate | null = null;


	constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
	}
	ngOnInit(): void {
		this.fromDate = this.initialDateRange.fromDate;
		this.toDate = this.initialDateRange.toDate;
	}

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
			this.checkUpdateDateRangeEvent();
		} else if (this.fromDate && !this.toDate && date && (date.after(this.fromDate) || date == this.fromDate)) {
			this.toDate = date;
			this.checkUpdateDateRangeEvent();
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
	}

	handleValidateFromDate(input: string) : void {
		this.fromDate = this.validateInput(this.fromDate, input);
		this.fromInput.nativeElement.value = `${this.fromDate.year.toString().padStart(2, '0')}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`;
		this.checkUpdateDateRangeEvent();
	}

	handleValidateToDate(input: string) : void {
		this.toDate = this.validateInput(this.toDate, input);
		this.toInput.nativeElement.value = `${this.toDate.year.toString().padStart(2, '0')}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`;
		this.checkUpdateDateRangeEvent();
	}

	private validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

	checkUpdateDateRangeEvent() {
		if(this.toDate && this.fromDate) {
			this.updateDateRangeEvent.emit({toDate: this.toDate, fromDate: this.fromDate});
		}
	}
}
