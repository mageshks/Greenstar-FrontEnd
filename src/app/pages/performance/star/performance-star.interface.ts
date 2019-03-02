// Holds the data used to display star
export interface IPerformanceStarData {
    paramOne: string;
    paramTwo: string;
    paramThree: string;
    paramOneMonthColorCodes: string[];
    paramTwoMonthColorCodes: string[];
    paramThreeMonthColorCodes: string[];
}

export interface ISearchPerformanceStarData {
    calcType: string;
    schoolId: number;
    studentId: number;
    classId: number;
    teamName: string;
    month: number
}

export class ISchoolDetail {
    public id: number;
    public schoolName: string;
}

export class IClassSectionDetail {
    public id: number;
    public className: string;
    public sectionName: string;
    public classAndSectionName: string;
    public studentList: IStudent[];
    public teamList: string[];
}

export class IStudent {
    public id: number;
    public studentName: string;
}
