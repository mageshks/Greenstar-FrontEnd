export class ISchoolDetail {

    public schoolName: string;
    public address: string;
    public city: string;
    public state: string;
    public district: string;

    // class 
    public classList: IClass[];

    // perofrmance parameter
    public perfParamType: string
    public perfParamList: IPerformanceParam[];
}

export class IClass {
    public className: string;
    public sectionName: string;
}

export class IPerformanceParam {
    public paramTitle: string;
    public paramDesc: string;
}