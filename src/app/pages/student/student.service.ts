import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ISchoolDetail,IStudentDetail,IClassSectionDetail } from "./student.interface";

const API_URL: string = 'http://localhost:2620';

@Injectable()
export class StudentService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getSchools(): Observable<any> {
        return this.http.post(API_URL+'/school/getSchools', { headers: this.headerValue });
    }

    public getClassList(school: ISchoolDetail): Observable<any> {
        return this.http.post(API_URL+'/school/getClassList',school,{ headers: this.headerValue });
    }

    public getClassDetail(classInfo: IClassSectionDetail): Observable<any> {
        return this.http.post(API_URL+'/school/getClassDetail',classInfo,{ headers: this.headerValue });
    }

    public updateStudent(studentDetail: IStudentDetail): Observable<any> {
        return this.http.post(API_URL + 'student', studentDetail, { headers: this.headerValue });
    }

    public deleteStudent(studentDetail: IStudentDetail): Observable<any> {
        return this.http.post(API_URL + 'student', studentDetail, { headers: this.headerValue });
    }

    public saveBulkData(formData: FormData): Observable<any> {
        return this.http.post(API_URL + 'student', formData, { headers: this.headerValue });
    }

    public getStudentUploadTemplate(): Observable<any> {
        return this.http.get(API_URL + 'student', { responseType: 'blob' });
    }

    private handleError(error: Response | any): any {
        console.log('API Service :: Handle Error' + error);
        return Observable.throw(error);
    }

}
