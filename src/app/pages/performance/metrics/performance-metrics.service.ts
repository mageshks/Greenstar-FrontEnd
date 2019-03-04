import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { IPerformanceDataTable, ISearchPerformanceData } from "./performance-metrics.interface";

const API_URL: string = 'http://localhost:2640';

@Injectable()
export class PerformanceMetricsService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getIndividualPerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/individual', searchPerformanceData, { headers: this.headerValue });
    }

    public getTeamwisePerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/teamwise', searchPerformanceData, { headers: this.headerValue });
    }

    public getClasswisePerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/classwise', searchPerformanceData, { headers: this.headerValue });
    }

    public getEncouragingPerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/encouraging', searchPerformanceData, { headers: this.headerValue });
    }
    public exportIndividualPerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadIndividualdata', searchPerformanceData, { responseType: 'blob' });
    }

    public exportTeamwisePerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadTeamwisedata', searchPerformanceData, { responseType: 'blob' });
    }

    public exportClasswisePerformanceMetrics(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadClasswisedata', searchPerformanceData, { responseType: 'blob' });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
