import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faSortUp, faSortDown, faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { SortColumn } from '../enums/SortColumn';
import { EventData } from '../types/EventData';
import { DateRange } from '../types/DateRange';

@Component({
	selector: 'app-list-tab',
	templateUrl: './list-tab.component.html',
	styleUrls: ['./list-tab.component.scss']
})
export class ListTabComponent implements OnInit {
	@Input() eventsData: Array<EventData>;
	@Input() dateFilterRange: DateRange;
	@Output() setDateFilterRangeEvent = new EventEmitter<DateRange>();

	SortColumn = SortColumn;

	currentSortDirectionUp: boolean = false;
	currentSortColumn: SortColumn = SortColumn.ID;

	sortedData: Array<EventData> = [];
	constructor() { }

	ngOnInit(): void {
		if (this.eventsData !== null) {
			this.processData();
		}
	}


	ngOnChanges(changes) {
		if (changes.eventsData && changes.eventsData.previousValue === null && changes.eventsData.currentValue !== null) {
			this.processData();
		}
		if (changes.dateFilterRange && changes.dateFilterRange.previousValue !== changes.dateFilterRange.currentValue && changes.dateFilterRange.previousValue !== undefined) {
			this.processData();
		}
	}

	private processData(): void {
		// -1 is added to the month as Date uses 0 for Jan while NgbDate use 1 for Jan
		const fromDate = new Date(this.dateFilterRange.fromDate.year, this.dateFilterRange.fromDate.month - 1, this.dateFilterRange.fromDate.day);
		// to date uses 23:59:59 as the end time
		const toDate = new Date(this.dateFilterRange.toDate.year, this.dateFilterRange.toDate.month - 1, this.dateFilterRange.toDate.day, 23, 59, 59);


		let filteredData: Array<EventData> = this.eventsData.filter((event) => {
			if (fromDate > event.eventDate || toDate < event.eventDate) return false;
			return true;
		})

		let sortedData = filteredData.sort((eventA: EventData, eventB: EventData) => {
			let valueA = null;
			let valueB = null;
			switch (this.currentSortColumn) {
				case SortColumn.ID:
					valueA = eventA.id;
					valueB = eventB.id;
					break;
				case SortColumn.CAMPAIGN_NAME:
					valueA = eventA.campaignName;
					valueB = eventB.campaignName;
					break;
				case SortColumn.EVENT_TYPE:
					valueA = eventA.eventType;
					valueB = eventB.eventType;
					break;
				case SortColumn.APP_USER_ID:
					valueA = eventA.appUserId;
					valueB = eventB.appUserId;
					break;
				case SortColumn.APP_USER_GENDER:
					valueA = eventA.appUserGender;
					valueB = eventB.appUserGender;
					break;
				case SortColumn.EVENT_TYPE:
					valueA = eventA.eventType;
					valueB = eventB.eventType;
					break;
				case SortColumn.EVENT_DATE:
					valueA = eventA.eventDate;
					valueB = eventB.eventDate;
					break;
				case SortColumn.APP_DEVICE_TYPE:
					valueA = eventA.appDeviceType;
					valueB = eventB.appDeviceType;
					break;
				default:
					break;
			}
			if ((valueA > valueB && this.currentSortDirectionUp) ||
				(valueA < valueB && !this.currentSortDirectionUp)) {
				return -1;
			}
			return 1;
		});

		this.sortedData = sortedData;
	}

	public getSortIcon(column: SortColumn): IconDefinition {
		if (column == this.currentSortColumn) {
			if (this.currentSortDirectionUp)
				return faSortUp;
			else
				return faSortDown;
		}
		else return faSort;
	}

	public handleSortColumn(column: SortColumn) {
		if (this.currentSortColumn === column) {
			this.currentSortDirectionUp = !this.currentSortDirectionUp;
		}
		else {
			this.currentSortColumn = column;
			this.currentSortDirectionUp = false;
		}
		this.processData();
	}


	public updateDateRange(dateRange: DateRange): void {
		this.setDateFilterRangeEvent.emit(dateRange);
	}
}
