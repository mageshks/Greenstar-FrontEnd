export interface IPerformanceDataTable {
    headers: IPerformanceHeader[];
    performanceRows: IPerformanceRow[];
}

export interface IPerformanceHeader {
    title: string;
    subTitleList: IPerformanceHeader[];
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
