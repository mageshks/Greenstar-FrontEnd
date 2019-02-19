import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { IStudentDetail } from "./student.interface";

const API_URL: string = 'http://localhost:9001/greenstarapp';

@Injectable()
export class StudentService {

    private headerValue: HttpHeaders = new HttpHeaders({ 'Accept': 'application/json' });

    constructor(private http: HttpClient) {
    }

    public getStudents(): Observable<any> {
        return this.http.get(API_URL + 'student', { headers: this.headerValue });
    }

    public getSchoolNames(): Observable<any> {
        return this.http.get(API_URL + 'student', { headers: this.headerValue });
    }

    public saveStudent(studentDetail: IStudentDetail): Observable<any> {
        return this.http.post(API_URL + 'student', studentDetail, { headers: this.headerValue });
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
