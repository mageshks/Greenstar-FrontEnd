
export class IStudentSearchData {
    public schoolId: number;
    public classId: number;
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
    public studentList: IStudent[] = [];
    public teamList: string[];
}

export class IStudent {
    public id: number;
    public associationId: number;
    public classId: number;
    public teamName: string;
    public rollId: string;
    public studentName: string;  
}

