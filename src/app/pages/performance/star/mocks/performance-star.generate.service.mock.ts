import { Injectable } from '@angular/core';
import { IPerformanceStarData } from "../performance-star.interface";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PerformanceStarGenerateServiceMock {
    constructor() { }

    getPerformanceStar() {
        const mockData = {"paramOne":"Attendance","paramTwo":"HomeWork","paramThree":"Discipline","paramOneMonthColorCodes":["#7beded","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00"],"paramTwoMonthColorCodes":["#7beded","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00"],"paramThreeMonthColorCodes":["#7beded","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#7CFC00"]};
        return Observable.of(mockData);
    }

}