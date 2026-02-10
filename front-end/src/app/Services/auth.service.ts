import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/users';
  user: User | undefined;
  constructor(private http: HttpClient) { }

  signup(userData: User) {
    return this.http.post<User>(this.apiUrl + '/signup', userData);
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/all');
  }
}
