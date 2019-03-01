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

export interface IPerformanceMetricsDataTable {
    headers: IPerformanceHeader[];
    performanceRows: IPerformanceMetricsRow[];
}

export interface IPerformanceMetricsRow {
    rollId: string;
    name: string;
    performanceMetricsDays: IPerformanceMetricsDay[];
}


export interface IPerformanceMetricsDay {
    dateValue: string;
    performanceDatas: IPerformanceMetricsData[];
}

export interface IPerformanceMetricsWeek {
    weekName: string;
    performanceDatas: IPerformanceMetricsData[];
}



export interface IPerformanceMetricsData {
    
        key: string;
        value: number;
    }


    export interface IPerformanceMetricsDataTable {
    headers: IPerformanceHeader[];
    performanceRows: IPerformanceMetricsRow[];
}

export interface IPerformanceMetricsRow {
    rollId: string;
    name: string;
    performanceMetricsDays: IPerformanceMetricsDay[];
}


export interface IPerformanceMetricsDay {
    dateValue: string;
    performanceDatas: IPerformanceMetricsData[];
}

export interface IPerformanceMetricsWeek {
    weekName: string;
    performanceDatas: IPerformanceMetricsData[];
}

export interface IPerformanceMetricsData {
    
        key: string;
        value: number;
    }

export interface IClassWiseHeader {
    title: string;
    alias: string;
}

export interface IClassWiseMetricsDataTable {
    headers: IClassWiseHeader[];
    performanceRows: IClassWiseMetricsRow[];
}


export interface IClassWiseMetricsRow {
    class: string;
    attendance: number;
    discipline: number;
    homework: number;
    total: number;
}


export interface ITeamWiseHeader {
    title: string;
    alias: string;
}

export interface ITeamWiseMetricsDataTable {
    headers: ITeamWiseHeader[];
    performanceRows: ITeamWiseMetricsRow[];
}


export interface ITeamWiseMetricsRow {
    team: string;
    attendance: number;
    discipline: number;
    homework: number;
    total: number;
}