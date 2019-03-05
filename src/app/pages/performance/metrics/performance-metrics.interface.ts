export interface ISearchPerformanceData {
    schoolId: number;
    classId: string;
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
    userId: string;
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

export interface IEncouragingMetricsDataTable {
    metrics: IEncouragingMetrics[];
}

export interface IEncouragingMetrics {
    metricsType: string;
    classs: string;
    sectionData: ISection[];
    averageRow: IAverageRow;
}

export interface ISection {
    section: string;
    month1percentage: string;
    month2percentage: string;
    changeinpercentage: string;
}

export interface IAverageRow {
    month1average: string;
    month2average: string;
    changeinaverage: string;
}