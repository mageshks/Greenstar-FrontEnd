export interface IPerformanceDataTable {
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
    name: string;
    performanceDays: IPerformanceDay[];
}

export interface IPerformanceDay {
    dateValue: string;
    performanceDatas: IPerformanceData[];
}

export interface IPerformanceData {

    key: string;
    value: boolean;
}
