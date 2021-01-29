import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable()
export class UserService {

  baseUrl: string = environment.dev;
  headers: any = {
    "Authorization": localStorage.getItem("token")
    
  }
  id=localStorage.getItem('id');
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    return this.http.get(this.baseUrl + 'user', { headers: this.headers });
  }

  getBy(id: string | number | null): Observable<any> {
    return this.http.get<User>(this.baseUrl + 'user/' + id, { headers: this.headers });
  }

  post(user: User): Observable<User> {

    return this.http.post<User>(this.baseUrl + 'user/', user);
  }
  
  put(id: string | number | null, user: User): Observable<User> {

    return this.http.put<User>(this.baseUrl + 'user/' + id, user, { headers: this.headers });
  }

  delete(id: string | number | null): Observable<any> {
    return this.http.delete<User>(this.baseUrl + 'user/' + id, { headers: this.headers });
  }

}
