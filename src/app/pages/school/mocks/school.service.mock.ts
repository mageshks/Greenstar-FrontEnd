import { Injectable } from '@angular/core';
import { ISchoolSearchData, ISchoolDetail } from '../school.interface';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SchoolServiceMock {

    constructor() { }

    public getSchoolsForSearch(schoolSearchData: ISchoolSearchData): Observable<any> {
        const mockData = '[{"id":42,"userId":null,"action":null,"schoolName":"Coimbatore Government Hr Sec School","district":"COIMBATORE","state":"TAMIL NADU","cityName":"COIMBATORE","address":"COIMBATORE","schoolTeamList":null,"classList":null,"holidays":null,"weekendWorkingDays":null,"perfParamList":null},{"id":43,"userId":null,"action":null,"schoolName":"Annur Government Hr Sec School","district":"COIMBATORE","state":"TAMIL NADU","cityName":"ANNUR","address":"ANNUR","schoolTeamList":null,"classList":null,"holidays":null,"weekendWorkingDays":null,"perfParamList":null},{"id":50,"userId":null,"action":null,"schoolName":"SSVM Matriculation school","district":"COIMBATORE","state":"TAMIL NADU","cityName":"Mettupalayam","address":"Alangombu (Post),\nMettupalayam - 641 302.\nCoimbatore (Dt.), Tamil Nadu","schoolTeamList":null,"classList":null,"holidays":null,"weekendWorkingDays":null,"perfParamList":null}]';
        return Observable.of(mockData);
    }

    public submitSchool(schoolDetail: ISchoolDetail): Observable<any> {
        const mockData = '';
        return Observable.of(mockData);
    }

    public retrieveSchool(schoolId: number): Observable<any> {
        const mockData = '';
        return Observable.of(mockData);
    }

}