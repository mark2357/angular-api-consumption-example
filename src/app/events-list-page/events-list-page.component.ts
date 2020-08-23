import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { InputEventData } from '../types/InputEventData';
import { DateRange } from '../types/DateRange';
import { EventData } from '../types/EventData';
import { Logger } from '../helpers/Logger';
import { EventFilterType } from '../enums/EventFilterType';
import { Filters } from '../types/Filters';

@Component({
	selector: 'app-events-list-page',
	templateUrl: './events-list-page.component.html',
	styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {
	@Input() token: string;
	@Output() updateTokenEvent = new EventEmitter<string>();

	faTimes = faTimes;
	EventFilterType = EventFilterType;

	eventsData: Array<EventData> = null;
	// the current tab index to use
	tabIndex: number = 0;

	dateFilterRange: DateRange = null;

	// used filters
	filters: Filters;

	constructor(private http: HttpClient, private calendar: NgbCalendar) {
		this.dateFilterRange = {
			fromDate: this.calendar.getPrev(this.calendar.getToday(), 'm', 1),
			toDate: this.calendar.getToday()
		};
		this.filters = {
			campaignFilter: null,
			eventTypeFilter: null,
			genderFilter: null,
			deviceTypeFilter: null
		}
	}

	ngOnInit(): void {
		this.requestData();
	}

	private requestData(): void {
		const headers = new HttpHeaders()
			.set('Authorization', 'Bearer ' + this.token);

		this.http.get<Array<InputEventData>>(
			environment.endpointURL + '/events',
			{ 'headers': headers },

		).toPromise().then(
			res => { // Success
				Logger.log('success', res);
				this.processData(res);
			},
			msg => { // Error
				Logger.error('error', msg);
				// error retrieving dat logs out user
				this.updateTokenEvent.emit('');
			}
		);
	}

	private processData(data: Array<InputEventData>): void {

		let eventsData: Array<EventData> = [];

		// maps InputEventData to EventData converting eventDate from string to date
		eventsData = data.map(x => {
			return {
				id: x.id,
				campaignName: x.campaignName,
				eventType: x.eventType,
				appUserId: x.appUserId,
				appUserGender: x.appUserGender,
				eventDate: new Date(x.eventDate),
				appDeviceType: x.appDeviceType,
			}
		});

		this.eventsData = eventsData;
	}

	public addRemoveFilter(eventData: { type: EventFilterType, newFilterValue: string | null }): void {
		const type: EventFilterType = eventData.type;
		const newFilterValue: string | null = eventData.newFilterValue;

		// creating new filters object and assigning it below is required to have the changes propagate to the child components
		let newFilters: Filters = {
			...this.filters
		}


		switch (type) {
			case EventFilterType.CAMPAIGN_NAME:
				if (this.filters.campaignFilter === newFilterValue)
					newFilters.campaignFilter = null;
				else
					newFilters.campaignFilter = newFilterValue;
				break;
			case EventFilterType.EVENT_TYPE:
				if (this.filters.eventTypeFilter === newFilterValue)
					newFilters.eventTypeFilter = null;
				else
					newFilters.eventTypeFilter = newFilterValue;
				break;
			case EventFilterType.GENDER:
				if (this.filters.genderFilter === newFilterValue)
					newFilters.genderFilter = null;
				else
					newFilters.genderFilter = newFilterValue;
				break;
			case EventFilterType.APP_DEVICE_TYPE:
				if (this.filters.deviceTypeFilter === newFilterValue)
					newFilters.deviceTypeFilter = null;
				else
					newFilters.deviceTypeFilter = newFilterValue;
				break;
			default:
				break;
		}

		this.filters = newFilters;
	}


	public setDateFilterRange(newRange: DateRange): void {
		this.dateFilterRange = newRange;
	}

	public handleChangeTab(newTabIndex: number): void {
		this.tabIndex = newTabIndex;
	}

	public handleLogoutClick(): void {
		this.updateTokenEvent.emit('');
	}
}
