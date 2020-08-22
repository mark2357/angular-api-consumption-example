import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { EventFilterType } from '../enums/EventFilterType';
import { EventData } from '../types/EventData';
import { GraphData } from '../types/GraphData';
import { DateRange } from '../types/DateRange';

@Component({
	selector: 'app-summary-tab',
	templateUrl: './summary-tab.component.html',
	styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent implements OnInit {
	@Input() eventsData: Array<EventData>;
	@Input() dateFilterRange: DateRange;
	@Output() setDateFilterRangeEvent = new EventEmitter<DateRange>(); 

	faTimes = faTimes;

	EventFilterType = EventFilterType;

	campaignFilter: string = null;
	eventTypeFilter: string = null;
	genderFilter: string = null;
	deviceTypeFilter: string = null;
	campaignGraphData: Array<GraphData> = [];
	eventTypeGraphData: Array<GraphData> = [];
	genderGraphData: Array<GraphData> = [];
	deviceTypeGraphData: Array<GraphData> = [];
	

	constructor() {
	}

	ngOnChanges(changes) {
		if (changes.eventsData && changes.eventsData.previousValue === null && changes.eventsData.currentValue !== null) {
			this.processData();
		}
		if (changes.dateFilterRange && changes.dateFilterRange.previousValue !== changes.dateFilterRange.currentValue && changes.dateFilterRange.previousValue !== undefined) {
			this.processData();
		}
	}

	ngOnInit(): void {
		if(this.eventsData !== null) {
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
			if(this.campaignFilter !== null && this.campaignFilter !== event.campaignName) return false
			if(this.eventTypeFilter !== null && this.eventTypeFilter !== event.eventType) return false
			if(this.genderFilter !== null && this.genderFilter !== event.appUserGender) return false
			if(this.deviceTypeFilter !== null && this.deviceTypeFilter !== event.appDeviceType) return false
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

		let jsonData = data === null ? null : JSON.parse(JSON.stringify(data));

		switch (type) {
			case EventFilterType.CAMPAIGN_NAME:	
			if(jsonData === null || this.campaignFilter === jsonData.name)
				this.campaignFilter = null;
			else
				this.campaignFilter = jsonData.name;
				break;
			case EventFilterType.EVENT_TYPE:
				if (jsonData === null || this.eventTypeFilter === jsonData.name)
				this.eventTypeFilter = null;
			else
				this.eventTypeFilter = jsonData.name;
				break;
			case EventFilterType.GENDER:
				if (jsonData === null || this.genderFilter === jsonData.name)
				this.genderFilter = null;
			else
				this.genderFilter = jsonData.name;
				break;
			case EventFilterType.APP_DEVICE_TYPE:
				if (jsonData === null || this.deviceTypeFilter === jsonData.name)
				this.deviceTypeFilter = null;
			else
				this.deviceTypeFilter = jsonData.name;
				break;
			default:
				break;
		}
		this.processData();
	}

	public updateDateRange(dateRange: DateRange): void {
		this.setDateFilterRangeEvent.emit(dateRange);
	}
}
