import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EventData } from '../types/EventData';
import { InputEventData } from '../types/InputEventData';
import { DateRange } from '../types/DateRange';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-events-list-page',
	templateUrl: './events-list-page.component.html',
	styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {
	@Input() token: string;
	@Output() updateTokenEvent = new EventEmitter<string>();
	eventsData: Array<EventData> = null;
	// the current tab index to use
	tabIndex: number = 0;

	dateFilterRange: DateRange = null;



	constructor(private http: HttpClient, private calendar: NgbCalendar) {
		this.dateFilterRange = {
			fromDate: this.calendar.getPrev(this.calendar.getToday(), 'm', 1),
			toDate: this.calendar.getToday()
		};
	}

	ngOnInit(): void {
		this.requestData();
	}

	private requestData() {
		const headers = new HttpHeaders()
			.set('Authorization', 'Bearer ' + this.token);

		this.http.get<Array<InputEventData>>(
			'https://localhost:44393/events',
			{ 'headers': headers },

		).toPromise().then(
			res => { // Success
				this.processData(res);
			},
			msg => { // Error
				console.log('error', msg);
			}
		);
	}

	private processData(data: Array<InputEventData>) {

		let eventsData: Array<EventData> = [];

		// maps InputEventData to EventData converting eventDate from string to date
		eventsData = data.map(x => {
			return {
				id: x.id,
				campaignName: x.campaignName,
				eventType: x.eventType,
				appUserId: x.appDeviceType,
				appUserGender: x.appUserGender,
				eventDate: new Date(x.eventDate),
				appDeviceType: x.appDeviceType,
			}
		});

		this.eventsData = eventsData;
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
