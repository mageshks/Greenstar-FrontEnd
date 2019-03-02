export class ISchoolDetail {


    public id: number;
    public schoolName: string;
    public address: string;
    public cityName: string;
    public state: string;
    public district: string;

    // class 
    public classList: IClass[];

    // perofrmance parameter
    public perfParamType: string
    public perfParamList: IPerformanceParam[];

    // holiday information
    public holidays: IHoliday[];

    // weekend working day information
    public weekendWorkingDayes: IWeekendWorkingDay[];
}

export class IClass {
    public className: string;
    public sectionName: string;
}

export class IPerformanceParam {
    public paramTitle: string;
    public paramDesc: string;
}

export class IHoliday {
    public fromDate: string;
    public toDate: string;
    public description: string;
}

export class IWeekendWorkingDay {
    public workingDate: string;
    public reason: string;
}
