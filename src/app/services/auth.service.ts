import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri = environment.apiUrl;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {

   }

   isLoggedIn():Observable<boolean>{
    return this.loggedIn.asObservable();
   }



   login(obj:any): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post<any>(this.uri + 'auth/login', obj) 
    
   }

   logout() {   
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
   }
}
