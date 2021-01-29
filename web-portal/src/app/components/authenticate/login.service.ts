import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthenticationService {

  baseUrl: string = environment.dev;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'authentication', { username: username, password: password }, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
      .pipe(map(user => {
        
        if(user) {
          user.token="Bearer "+user.token;
          localStorage.setItem("token", user.token);
          localStorage.setItem("id",user.id);
          
        }
        return user;
        
        
      }));
  }

}