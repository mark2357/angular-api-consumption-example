import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { EventFilterType } from '../enums/EventFilterType';
import { EventData } from '../types/EventData';
import { GraphData } from '../types/GraphData';
import { DateRange } from '../types/DateRange';
import { Filters } from '../types/Filters';

@Component({
	selector: 'app-summary-tab',
	templateUrl: './summary-tab.component.html',
	styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent implements OnInit {
	@Input() eventsData: Array<EventData>;
	@Input() dateFilterRange: DateRange;
	@Input() filters: Filters;
	@Output() addRemoveFilterEvent = new EventEmitter<{ type: EventFilterType, newFilterValue: string | null }>(); 

	faTimes = faTimes;

	EventFilterType = EventFilterType;

	campaignGraphData: Array<GraphData> = [];
	eventTypeGraphData: Array<GraphData> = [];
	genderGraphData: Array<GraphData> = [];
	deviceTypeGraphData: Array<GraphData> = [];
	

	constructor() {
	}
	
	ngOnInit(): void {
		if(this.eventsData !== null) {
			this.processData();
		}
	}
	
	ngOnChanges(changes) {
		if (this.eventsData !== null && (changes.eventsData || changes.dateFilterRange || changes.filters)) {
			this.processData();
		}
	}

	private processData(): void {
		let campaignData = {};
		let eventTypeData = {};
		let genderData = {};
		let deviceTypeData = {};

		// -1 is added to the month as Date uses 0 for Jan while NgbDate use 1 for Jan
		const fromDate = new Date(this.dateFilterRange.fromDate.year, this.dateFilterRange.fromDate.month - 1, this.dateFilterRange.fromDate.day);
		// to date uses 23:59:59 as the end time
		const toDate = new Date(this.dateFilterRange.toDate.year, this.dateFilterRange.toDate.month - 1, this.dateFilterRange.toDate.day, 23, 59, 59);


		const filteredData: Array<EventData> = this.eventsData.filter((event) => {
			if(this.filters.campaignFilter !== null && this.filters.campaignFilter !== event.campaignName) return false
			if(this.filters.eventTypeFilter !== null && this.filters.eventTypeFilter !== event.eventType) return false
			if(this.filters.genderFilter !== null && this.filters.genderFilter !== event.appUserGender) return false
			if(this.filters.deviceTypeFilter !== null && this.filters.deviceTypeFilter !== event.appDeviceType) return false
			if( fromDate > event.eventDate || toDate < event.eventDate) return false;			
			
			return true;
		})

		filteredData.forEach(event => {

			this.addCountToDataObject(campaignData, event.campaignName);
			this.addCountToDataObject(eventTypeData, event.eventType);
			this.addCountToDataObject(genderData, event.appUserGender);
			this.addCountToDataObject(deviceTypeData, event.appDeviceType);
		});
		this.campaignGraphData = Object.values(campaignData);
		this.eventTypeGraphData = Object.values(eventTypeData);
		this.genderGraphData = Object.values(genderData);
		this.deviceTypeGraphData = Object.values(deviceTypeData);
	}


	private addCountToDataObject(dataObj: object, name: string): void {
		if (dataObj.hasOwnProperty(name)) {
			dataObj[name].value += 1;
		}
		else {
			dataObj[name] = {
				'name': name,
				'value': 1
			};
		}
	}

	public handleAddRemoveFilter(type: EventFilterType, data): void {
		let newFilterValue = data === null ? null : JSON.parse(JSON.stringify(data)).name;
		this.addRemoveFilterEvent.emit({type: type, newFilterValue: newFilterValue});
	}
}
