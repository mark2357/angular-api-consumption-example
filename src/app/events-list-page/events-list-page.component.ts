import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventData } from '../types/EventData';



@Component({
	selector: 'app-events-list-page',
	templateUrl: './events-list-page.component.html',
	styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {
	@Input() token: string;
	@Output() updateTokenEvent = new EventEmitter<string>();
	eventsData : Array<EventData> = [];
	constructor(private http: HttpClient) { }
	// the current tab index to use
	tabIndex: number = 0;
	
	ngOnInit(): void {
		this.requestData();
	}

	private requestData() {
		const headers = new HttpHeaders()
   			.set('Authorization', 'Bearer ' + this.token);
	   		
		this.http.get<Array<EventData>>(
			'https://localhost:44393/events',
			{ 'headers': headers },
			 
		).toPromise().then(
			res => { // Success
			console.log('success', res);
			this.eventsData = res;
			},
			msg => { // Error
			console.log('error', msg);
			}
		  );
	}

	private processData(data) {

	}

	public handleChangeTab(newTabIndex: number) : void {
		this.tabIndex = newTabIndex;
	}

	public handleLogoutClick(): void {
		this.updateTokenEvent.emit('');
	}

}
