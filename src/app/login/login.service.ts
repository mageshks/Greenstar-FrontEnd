import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

const API_URL: string = 'http://localhost:2610';

@Injectable()
export class LoginService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' })

    constructor(private http: HttpClient) {
    }

    public userLogin(formData: FormData): Observable<any> {
        return this.http.post(API_URL + '/security/login', formData, { headers: this.headerValue });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
