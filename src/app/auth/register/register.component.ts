import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  users: User[];

  constructor(private userRegistrationService: UserRegistrationService, private router : Router) { }

  register() {
    // Check if password and confirm password match
    if (this.passwordsDoNotMatch()) {
      alert('Password and confirm password do not match');
      return;
    }
    this.userRegistrationService.createUser(this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful!', response);
          // Optionally, redirect to another page or display a success message
          this.fetchUsers(); // Fetch users after successful registration
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle error, e.g., display error message to the user
        }
      );
  }
  fetchUsers() {
    this.userRegistrationService.getUsers()
      .subscribe(
        (users) => {
          this.users = users
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

  passwordsDoNotMatch(): boolean {
    return this.user.password !== this.user.confirmPassword;
  }
  
}
