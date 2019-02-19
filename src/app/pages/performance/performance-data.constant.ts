import { IPerformanceHeader, IPerformanceDataTable, IPerformanceData, IPerformanceRow, IPerformanceDay } from "./performance-data.interface";

export class PerformanceStaticData {

    public static performanceSource: IPerformanceDataTable = {} as IPerformanceDataTable;

    public static getTestTableContent(): IPerformanceDataTable {

        // table dynamic headers - start
        let dynamicHeaders: IPerformanceHeader[] = [
            { title: '18-Feb-2019', subTitleList: this.getSubTitle() },
            { title: '19-Feb-2019', subTitleList: this.getSubTitle() },
            { title: '20-Feb-2019', subTitleList: this.getSubTitle() }
        ];

        this.performanceSource.headers = dynamicHeaders;
        // table dynamic headers - end

        this.performanceSource.performanceRows = this.getPerformanceContents();

        return this.performanceSource;
    }

    public static getSubTitle(): IPerformanceHeader[] {

        let dynamicTitle: IPerformanceHeader[] = [
            { title: 'Home Work', subTitleList: [] },
            { title: 'Deciplain', subTitleList: [] },
            { title: 'Attendance', subTitleList: [] }
        ];
        return dynamicTitle;
    }

    public static getPerformanceContents(): IPerformanceRow[] {

        let performanceRowArray: IPerformanceRow[] = [];

        performanceRowArray.push(this.getPerformanceRowObject1());
        performanceRowArray.push(this.getPerformanceRowObject2());

        return performanceRowArray;
    }

    public static getPerformanceRowObject1(): IPerformanceRow {

        let performanceRow: IPerformanceRow = {} as IPerformanceRow;
        performanceRow.rollId = "LKG01";
        performanceRow.name = "Panneer";
        performanceRow.performanceDays = this.getPerformanceDays();

        return performanceRow;
    }

    public static getPerformanceRowObject2(): IPerformanceRow {

        let performanceRow: IPerformanceRow = {} as IPerformanceRow;
        performanceRow.rollId = "LKG02";
        performanceRow.name = "Magesh";
        performanceRow.performanceDays = this.getPerformanceDays();

        return performanceRow;
    }

    public static getPerformanceDays(): IPerformanceDay[] {

        let performanceDayArray: IPerformanceDay[] = [];

        let performanceDay1: IPerformanceDay = {} as IPerformanceDay;
        performanceDay1.dateValue = "18-Feb-2019";
        performanceDay1.performanceDatas = this.getPerformanceData();
        performanceDayArray.push(performanceDay1);

        let performanceDay2: IPerformanceDay = {} as IPerformanceDay;
        performanceDay2.dateValue = "19-Feb-2019";
        performanceDay2.performanceDatas = this.getPerformanceData();
        performanceDayArray.push(performanceDay2);

        let performanceDay3: IPerformanceDay = {} as IPerformanceDay;
        performanceDay3.dateValue = "20-Feb-2019";
        performanceDay3.performanceDatas = this.getPerformanceData();
        performanceDayArray.push(performanceDay3);

        return performanceDayArray;
    }

    public static getPerformanceData(): IPerformanceData[] {

        let performanceDataArray: IPerformanceData[] = [];

        let performanceData1: IPerformanceData = {} as IPerformanceData;
        performanceData1.key = "HomeWork";
        performanceData1.value = true;
        performanceDataArray.push(performanceData1);

        let performanceData2: IPerformanceData = {} as IPerformanceData;
        performanceData2.key = "Disciplain";
        performanceData2.value = false;
        performanceDataArray.push(performanceData2);

        let performanceData3: IPerformanceData = {} as IPerformanceData;
        performanceData3.key = "Attendance";
        performanceData3.value = true;
        performanceDataArray.push(performanceData3);

        return performanceDataArray;
    }

}
