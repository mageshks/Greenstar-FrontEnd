import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { ISearchPerformanceData, IPerformanceDataTable } from '../performance-data.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerformanceDataServiceMock {
    constructor() { }

    public getExistingPerformanceMetricDatas(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        
        console.log(searchPerformanceData.week);

        if('01-Feb-2019' === searchPerformanceData.week) {
            const mockData = {"status":200,"message":null,"result":{"schoolId":42,"schoolName":null,"classId":37,"className":"I","section":null,"month":2,"monthName":null,"week":"01-Feb-2019","labelDateRange":null,"userId":null,"totalSubTitle":3,"headers":[{"title":"01-Feb-2019","alais":"01-Feb-2019","checkValue":false,"subTitleList":[{"title":"Attendance","alais":"Attendance","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"Discipline","alais":"Discipline","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"HomeWork","alais":"HomeWork","checkValue":false,"subTitleList":[],"workingDay":false}],"workingDay":false}],"performanceRows":[{"rollId":"IA333","studentName":"Akil","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA334","studentName":"Jishnuprasad","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA335","studentName":"Aadhi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA336","studentName":"Neethi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA337","studentName":"Deepthi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA338","studentName":"Aarav","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA339","studentName":"Prathiksha","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA340","studentName":"Aaradhanaa","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA341","studentName":"Paul","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]},{"rollId":"IA342","studentName":"Musthafa","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":null,"teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":true},{"key":"Discipline","value":true},{"key":"HomeWork","value":true}],"workingday":false}]}]}};
            return Observable.of(mockData);
        } else {
            const mockData = {"status":200,"message":null,"result":{"schoolId":42,"schoolName":null,"classId":37,"className":"I","section":null,"month":2,"monthName":null,"week":"01-Feb-2019","labelDateRange":null,"userId":null,"totalSubTitle":3,"headers":[{"title":"01-Feb-2019","alais":"01-Feb-2019","checkValue":false,"subTitleList":[{"title":"Attendance","alais":"Attendance","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"Discipline","alais":"Discipline","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"HomeWork","alais":"HomeWork","checkValue":false,"subTitleList":[],"workingDay":false}],"workingDay":false}],"performanceRows":[]}};
            return Observable.of(mockData);
        }
    }
    
    public getCreatePerformanceMetricDatas(searchPerformanceData: ISearchPerformanceData): Observable<any> {
      const mockData = {"status":200,"message":null,"result":{"schoolId":42,"schoolName":null,"classId":37,"className":"I","section":null,"month":2,"monthName":null,"week":"01-Feb-2019","labelDateRange":null,"userId":null,"totalSubTitle":3,"headers":[{"title":"01-Feb-2019","alais":"01-Feb-2019","checkValue":false,"subTitleList":[{"title":"Attendance","alais":"Attendance","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"Discipline","alais":"Discipline","checkValue":false,"subTitleList":[],"workingDay":false},{"title":"HomeWork","alais":"HomeWork","checkValue":false,"subTitleList":[],"workingDay":false}],"workingDay":false}],"performanceRows":[{"rollId":"IA333","studentName":"Akil","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA334","studentName":"Jishnuprasad","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA335","studentName":"Aadhi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA336","studentName":"Neethi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA337","studentName":"Deepthi","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Kalaam","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA338","studentName":"Aarav","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA339","studentName":"Prathiksha","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA340","studentName":"Aaradhanaa","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA341","studentName":"Paul","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]},{"rollId":"IA342","studentName":"Musthafa","schoolName":"Coimbatore Government Hr Sec School","className":"I","section":"A","teamName":"Teresa","performanceDays":[{"dateValue":"01-Feb-2019","performanceData":[{"key":"Attendance","value":false},{"key":"Discipline","value":false},{"key":"HomeWork","value":false}],"workingday":false}]}]}};  
      return Observable.of(mockData);
    }
    
    public savePerformanceMetricDatas(performanceDataTable: IPerformanceDataTable): Observable<any> {
        return Observable.of('SUCCESS');
    }

    public updatePerformanceMetricDatas(performanceDataTable: IPerformanceDataTable): Observable<any> {
        return Observable.of('SUCCESS');
    }    

    public getPerformanceDataTemplate(searchPerformanceData: ISearchPerformanceData): Observable<any> {

        // let excelFile = this.http.get("../../../assets/test_bulk_upload_template.xlsx");

        return null;

        //return this.http.get(API_URL + '/perfdata/downloadtemplate', searchPerformanceData, { responseType: 'blob' });    
    }

    /*
    public uploadBulkPerformanceData(formData: FormData): Observable<any> {
        
    }
    */

    public getWeekDaysByMonth(searchPerformanceData: ISearchPerformanceData): Observable<any> {
        const mockData =  {"status":200,"message":null,"result":{"Week-1":"01-Feb-2019","Week-2":"04-Feb-2019~05-Feb-2019~08-Feb-2019~09-Feb-2019","Week-3":"11-Feb-2019~12-Feb-2019~13-Feb-2019~14-Feb-2019~15-Feb-2019~16-Feb-2019","Week-4":"18-Feb-2019~19-Feb-2019~20-Feb-2019~21-Feb-2019~22-Feb-2019","Week-5":"25-Feb-2019~26-Feb-2019~27-Feb-2019~28-Feb-2019"}};
        return Observable.of(mockData);
    }

}