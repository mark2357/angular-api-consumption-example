import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-events-list-page',
	templateUrl: './events-list-page.component.html',
	styleUrls: ['./events-list-page.component.scss']
})
export class EventsListPageComponent implements OnInit {
	@Input() token: string;
	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.requestData();
	}

	public requestData() {
		const headers = new HttpHeaders()
   			.set('Authorization', 'Bearer ' + this.token);
	   		
		this.http.get<any>(
			'https://localhost:44393/events',
			{ 'headers': headers },
			 
		).toPromise().then(
			res => { // Success
			console.log('success', res);
			},
			msg => { // Error
			console.log('error', msg);
			}
		  );
		
	}

}
