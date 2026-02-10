import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(this.apiUrl + '/signup', user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/login', {
      email,
      password
    });
  }

}
