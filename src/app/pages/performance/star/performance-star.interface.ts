export interface ISearchPerformanceStarData {
    calcType: string;
    schoolId: number;
    studentId: number;
    classId: number;
    sectionId: number;
    month: number
}

export class ISchoolDetail {
    public id: number;
    public schoolName: string;
    public classList: IClassDetail[];
}

export class IClassDetail {
    public id: number;
    public className: string;
    public sectionList: ISection[];
}

export class ISection {
    public id: number;
    public sectionName: string;
    public studentList: IStudent[];
    public teamList: string[];
}

export class IStudent {
    public id: number;
    public studentName: string;
}
