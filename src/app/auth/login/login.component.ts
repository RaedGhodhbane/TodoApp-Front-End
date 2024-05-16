import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginError: string;
  loggedIn: boolean;

  constructor(private authService: AuthService,private http: HttpClient, private router : Router) { }

  logIn() {
    const obj = { 'email' : this.email , 'password' : this.password }    
    this.authService.login(obj)    
    .subscribe(
      success => {       
          console.log('success response :',success)
          localStorage.setItem('email', this.email);
          this.router.navigateByUrl('/todo')
          
        }, 
        error => {
          this.loginError = "Invalid email/password";
          console.log(error.error.error);
        }    
  );
  }

  onForgotPassword() {
    // Send a request to your backend service to trigger the email sending process
    this.http.post<any>('http://your-backend-api/forgot-password', { email: this.email })
      .subscribe(
        response => {
          console.log('Email sent successfully:', response);
          // Optionally, you can display a message to the user indicating that the email has been sent
        },
        error => {
          console.error('Error sending email:', error);
          // Optionally, you can display an error message to the user
        }
      );
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.loggedIn = status;
    });
  }

}
