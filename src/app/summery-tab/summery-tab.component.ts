import { Component, OnInit, Input } from '@angular/core';
import { EventData } from '../types/EventData';
import { GraphData } from '../types/GraphData';

@Component({
	selector: 'app-summery-tab',
	templateUrl: './summery-tab.component.html',
	styleUrls: ['./summery-tab.component.scss']
})
export class SummeryTabComponent implements OnInit {
	@Input() eventsData: Array<EventData>;

	campaignGraphData: Array<GraphData> = []
	eventTypeGraphData: Array<GraphData> = []
	genderGraphData: Array<GraphData> = []
	deviceTypeGraphData: Array<GraphData> = []


	constructor() { }

	ngOnChanges(changes) {
		if(this.eventsData !== null) {
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

		this.eventsData.forEach(event => {
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

}
