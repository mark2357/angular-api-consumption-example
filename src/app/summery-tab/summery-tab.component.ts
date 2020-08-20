import { Component, OnInit, Input } from '@angular/core';
import { EventData } from '../types/EventData';
import { GraphData } from '../types/GraphData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventFilterType } from '../enums/EventFilterType';


@Component({
	selector: 'app-summery-tab',
	templateUrl: './summery-tab.component.html',
	styleUrls: ['./summery-tab.component.scss']
})
export class SummeryTabComponent implements OnInit {
	@Input() eventsData: Array<EventData>;

	EventFilterType = EventFilterType;

	campaignFilter: string = null;
	eventTypeFilter: string = null;
	genderFilter: string = null;
	deviceTypeFilter: string = null;
	campaignGraphData: Array<GraphData> = [];
	eventTypeGraphData: Array<GraphData> = [];
	genderGraphData: Array<GraphData> = [];
	deviceTypeGraphData: Array<GraphData> = [];


	constructor(private modalService: NgbModal) { }

	ngOnChanges(changes) {
		if (this.eventsData !== null) {
			this.processData();
		}
	}

	ngOnInit(): void {
	}

	private processData(): void {
		let campaignData = {};
		let eventTypeData = {};
		let genderData = {};
		let deviceTypeData = {};

		const filteredData: Array<EventData> = this.eventsData.filter((event) => {
			if(this.campaignFilter !== null && this.campaignFilter !== event.campaignName) return false
			if(this.eventTypeFilter !== null && this.eventTypeFilter !== event.eventType) return false
			if(this.genderFilter !== null && this.genderFilter !== event.appUserGender) return false
			if(this.deviceTypeFilter !== null && this.deviceTypeFilter !== event.appDeviceType) return false

			return true;
		})

		filteredData.forEach(event => {

			this.addCountToDataObject(campaignData, event.campaignName);
			this.addCountToDataObject(eventTypeData, event.eventType);
			this.addCountToDataObject(genderData, event.appUserGender);
			this.addCountToDataObject(deviceTypeData, event.appDeviceType);
		});
		// console.log(Object.values(campaignData));
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

	public handleOpenModal(context) {
		this.modalService.open(context);
	}

	public handleAddFilter(type: EventFilterType, data) {
		let jsonData = JSON.parse(JSON.stringify(data));

		switch (type) {
			case EventFilterType.CAMPAIGN_NAME:
				this.campaignFilter = jsonData.name;
				break;
			case EventFilterType.EVENT_TYPE:
				this.eventTypeFilter = jsonData.name;
				break;
			case EventFilterType.GENDER:
				this.genderFilter = jsonData.name;
				break;
			case EventFilterType.APP_DEVICE_TYPE:
				this.deviceTypeFilter = jsonData.name;
				break;
			default:
				break;
		}
		console.log('Item clicked', JSON.parse(JSON.stringify(data)));
		this.processData();
	}

	public handleRemoveFilter(type: EventFilterType) {
		switch (type) {
			case EventFilterType.CAMPAIGN_NAME:
				this.campaignFilter = null;
				break;
			case EventFilterType.EVENT_TYPE:
				this.eventTypeFilter = null;
				break;
			case EventFilterType.GENDER:
				this.genderFilter = null;
				break;
			case EventFilterType.APP_DEVICE_TYPE:
				this.deviceTypeFilter = null;
				break;
			default:
				break;
		}
		this.processData();
	}
}
