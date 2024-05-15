import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private readonly userApiUrl = 'http://localhost:8080/auth';



  constructor(private httpClient : HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userApiUrl}/users`);
  }

  createUser(user : User): Observable<User>{
    return this.httpClient.post<User>(`${this.userApiUrl}/register`, user);

  }


}
