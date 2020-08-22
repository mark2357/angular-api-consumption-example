import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { env } from 'process';
import { Logger } from '../helpers/Logger';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	@Output() updateTokenEvent = new EventEmitter<string>();

	// font awesome icons
	faEye = faEye;
	faEyeSlash = faEyeSlash;

	loginForm: FormGroup;

	showPassword: boolean = false;

	// set to true if the user fails a login attempt
	showFailedLoginAlert: boolean = false;

	constructor(private http: HttpClient, private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}
	
	private updateToken(newToken: string): void {
		this.updateTokenEvent.emit(newToken);
	}

	public handleLoginClick(loginData): void {
		this.http.post<any>(
			environment.endpointURL + '/users/authenticate',
			{
				"username": loginData.email,
				"password": loginData.password
			}
		).toPromise().then(
			res => { // Success
				Logger.log('success', res);
				this.updateToken(res.token)
			},
			msg => { // Error
				this.showFailedLoginAlert = true;
				Logger.error('error', msg);
			}
		);
	}

	public handleTogglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
	}

	public handleCloseLoginFailedAlert(): void {
		this.showFailedLoginAlert = false;
	}
}
