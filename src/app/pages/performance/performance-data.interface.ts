export interface ISearchPerformanceData {
    schoolId: number;
    className: string;
    sectionName: string;
    month: number;
    week: string;    
}

export interface IPerformanceDataTable {
    schoolId: number;
    className: string;
    section: string;
    month: number;
    week: string;
    headers: IPerformanceHeader[];
    performanceRows: IPerformanceRow[];
}

export interface IPerformanceHeader {
    title: string;
    alais: string;
    subTitleList: IPerformanceHeader[];
    checkValue: boolean;
}

export interface IPerformanceRow {
    rollId: string;
    studentName: string;
    performanceDays: IPerformanceDay[];
}

export interface IPerformanceDay {
    dateValue: string;
    performanceData: IPerformanceData[];
}

export interface IPerformanceData {
    key: string;
    value: boolean;
}
