import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ISchoolDetail,ISchoolSearchData } from "./school.interface";

const API_URL: string = 'http://localhost:8765/api';

@Injectable()
export class SchoolService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' })

    constructor(private http: HttpClient) {
    }

    public getSchoolsForSearch(schoolSearchData: ISchoolSearchData): Observable<any> {
        return this.http.post(API_URL+'/school/getSchoolsForSearch',schoolSearchData,{ headers: this.headerValue });
    }

    public submitSchool(schoolDetail: ISchoolDetail): Observable<any> {
        return this.http.post(API_URL + '/school/submitschool', schoolDetail, { headers: this.headerValue });
    }

    public retrieveSchool(schoolId: number): Observable<any> {
        return this.http.post(API_URL + '/school/getschooldetail', schoolId, { headers: this.headerValue });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
