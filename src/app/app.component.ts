import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angular-api-consumption-example';
	authJwtToken: string = this.loadTokenFromLocalStorage();

	ngOnInit(): void {
	}

	updateToken(newToken: string): void {
		this.authJwtToken = newToken;
		this.saveTokenToLocalStorage(newToken);
	}

	loadTokenFromLocalStorage(): string  {
		return localStorage.getItem('token') || '';
	}

	saveTokenToLocalStorage(token: string): void {
		localStorage.setItem('token', token);
	}
}
