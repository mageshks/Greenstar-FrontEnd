import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { IState,IStaticData } from "./common.interface";

const API_URL: string = 'http://localhost:8765/api';

@Injectable()
export class CommonService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getStates(): Observable<any> {
        return this.http.post(API_URL+'/school/getStates', { headers: this.headerValue });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
