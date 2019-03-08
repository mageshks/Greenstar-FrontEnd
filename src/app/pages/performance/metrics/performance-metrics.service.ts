import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { IPerformanceDataTable, ISearchPerformanceMetrics } from "./performance-metrics.interface";

const API_URL: string = 'http://localhost:2640';

@Injectable()
export class PerformanceMetricsService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getIndividualPerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL+'/perfdata/existingmetricdatas', searchPerformanceData, { headers: this.headerValue });
    }

    public getTeamwisePerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/teamwise', searchPerformanceData, { headers: this.headerValue });
    }

    public getClasswisePerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/classwise', searchPerformanceData, { headers: this.headerValue });
    }

    public getEncouragingPerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL+'/perfmetrics/encouraging', searchPerformanceData, { headers: this.headerValue });
    }
    public exportIndividualPerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadIndividualdata', searchPerformanceData, { responseType: 'blob' });
    }

    public exportTeamwisePerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadTeamwisedata', searchPerformanceData, { responseType: 'blob' });
    }

    public exportClasswisePerformanceMetrics(searchPerformanceData: ISearchPerformanceMetrics): Observable<any> {
        return this.http.post(API_URL + '/perfmetrics/downloadClasswisedata', searchPerformanceData, { responseType: 'blob' });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
