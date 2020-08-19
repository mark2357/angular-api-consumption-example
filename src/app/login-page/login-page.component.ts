import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators} from '@angular/forms';

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

	// login form
	loginForm;
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

	public handleLoginClick(loginData): void {
		console.log(loginData);
		this.http.post<any>(
			'https://localhost:44393/users/authenticate',
			{
				"username": loginData.email,
				"password": loginData.password
			}
		).toPromise().then(
			res => { // Success
			console.log('success', res);
			this.updateToken(res.token)
			},
			msg => { // Error
			this.showFailedLoginAlert = true;
			console.log('error', msg);
			}
		  );
		}

	updateToken(newToken: string) {
		this.updateTokenEvent.emit(newToken);
	}

	public handleTogglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
	}

	public handleCloseLoginFailedAlert(): void {
		this.showFailedLoginAlert = false;
	}
}
