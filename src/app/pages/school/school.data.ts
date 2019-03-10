import { ISchoolDetail, IClass, IPerformanceParam, IHoliday } from "./school.interface";
import { SmartTableDatePickerComponent } from "../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components";

export class SchoolData {

    public static PERF_PARAM_DEFAULT: string = 'DEFAULT';
    public static PERF_PARAM_CUSTOM: string = 'CUSTOMIZED';

    public static schoolDetail: ISchoolDetail = {} as ISchoolDetail;

    public static getClassTableSetting(): any {
        let settings: any = {
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true
            },
            columns: {
                className: {
                    title: 'Class',
                    type: 'string'
                },
                sectionName: {
                    title: 'Section',
                    type: 'string'
                }
            }
        };
        return settings;
    }

    public static getPerfParamTableSetting(): any {
        let settings: any = {
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                paramTitle: {
                    title: 'Parameter Title',
                    type: 'string',
                },
                paramDesc: {
                    title: 'Parameter Description',
                    type: 'string',
                }
            }
        };

        return settings;
    }

    public static getPerfParamTableSettingWithNoAction(): any {
        let settings: any = {
            actions: false,
            columns: {
                paramTitle: {
                    title: 'Parameter Title',
                    type: 'string',
                },
                paramDesc: {
                    title: 'Parameter Description',
                    type: 'string',
                }
            }
        };

        return settings;
    }

    public static getSchoolHolidaySetting(): any {
        let settings: any = {
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true
            },
            columns: {
                fromDate: {
                    title: 'From Date',
                    type: 'html',
                    editor: { type: 'custom', component: SmartTableDatePickerComponent }
                },
                toDate: {
                    title: 'To Date',
                    type: 'html',
                    editor: { type: 'custom', component: SmartTableDatePickerComponent }
                },
                description: {
                    title: 'Description',
                    type: 'string'
                }
            }
        };

        return settings;
    }

    public static getSchoolWeekendWorkingSetting(): any {
        let settings: any = {
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true
            },
            columns: {
                workingDate: {
                    title: 'Working Date',
                    type: 'html',
                    editor: { type: 'custom', component: SmartTableDatePickerComponent }
                },
                reason: {
                    title: 'Reason',
                    type: 'string'
                }
            }
        };

        return settings;
    }

    public static createSchoolDetailObject(): ISchoolDetail {

        // school information
        this.schoolDetail.schoolName = '';
        this.schoolDetail.address = '';
        this.schoolDetail.cityName = '';
        this.schoolDetail.state = '--Select State--';
        this.schoolDetail.district = '--Select District--';



        // class detail
        this.schoolDetail.classList = [];

        // default performance parameters initialized
        this.schoolDetail.perfParamType = this.PERF_PARAM_DEFAULT;
        this.schoolDetail.perfParamList = this.getDefaultPerfParamDetail();

        // holidays
        this.schoolDetail.holidays = [];

        // weekend working days
        this.schoolDetail.weekendWorkingDayes = [];

        return this.schoolDetail;
    }

    public static getTempSchoolDetails(): ISchoolDetail {

        // school information
        this.schoolDetail.schoolName = 'SSVM Matriculation';
        this.schoolDetail.address = 'Coimbatore';
        this.schoolDetail.cityName = 'Coimbatore';
        this.schoolDetail.state = 'Tamil Nadu';
        this.schoolDetail.district = 'Coimbatore';

        // class detail
        this.schoolDetail.classList = this.getTempClassDetail();

        // performance parameters
        this.schoolDetail.perfParamType = this.PERF_PARAM_DEFAULT;
        // this.schoolDetail.perfParamType = this.PERF_PARAM_CUSTOM;
        this.schoolDetail.perfParamList = [];

        return this.schoolDetail;
    }

    public static getTempClassDetail(): IClass[] {

        var classList: IClass[] = [];
        return classList;
    }

    public static getDefaultPerfParamDetail(): IPerformanceParam[] {

        var classList: IPerformanceParam[] = [
            { paramTitle: 'Attendance', paramDesc: 'Attendance Performance' },
            { paramTitle: 'Disciplain', paramDesc: 'Disciplain Performance' },
            { paramTitle: 'Homework', paramDesc: 'Homework Performance' }
        ];
        return classList;
    }

    public static getClassFieldValue(): any {

        var classValues: any[] = [
            { title: 'LKG', value: 'LKG' },
            { title: 'UKG', value: 'UKG' },
            { title: 'First', value: 'First' },
            { title: 'Second', value: 'Second' },
            { title: 'Third', value: 'Third' },
            { title: 'Fourth', value: 'Fourth' },
            { title: 'Fifth', value: 'Fifth' },
            { title: 'Sixth', value: 'Sixth' },
            { title: 'Seventh', value: 'Seventh' },
            { title: 'Eighth', value: 'Eighth' },
            { title: 'Ninth', value: 'Ninth' },
            { title: 'Tenth', value: 'Tenth' },
            { title: 'Eleventh', value: 'Eleventh' },
            { title: 'Twelveth', value: 'Twelveth' }
        ];
        return classValues;
    }

    public static getSectionFieldValue(): any {

        var sectionValues: any[] = [
            { title: 'A', value: 'A' },
            { title: 'B', value: 'B' },
            { title: 'C', value: 'C' },
            { title: 'D', value: 'D' },
            { title: 'E', value: 'D' }
        ];
        return sectionValues;
    }

    public static getTempHolidaysDetail(): IHoliday[] {

        var testHolidays: IHoliday[] = [
            { fromDate: '2019-01-10', toDate: '2019-01-15', description: 'aaa' },
            { fromDate: '2019-02-01', toDate: '2019-02-05', description: 'bbb' },
            { fromDate: '2019-03-25', toDate: '2019-03-30', description: 'ccc' }
        ];
        return testHolidays;
    }

    public static getTempSchoolValue(): any {

        var classValues: any[] = [
            { title: 'SSVM Matriculation School', value: 'SSVM Matriculation School' },
            { title: 'Nikita Matriculation School', value: 'Nikita Matriculation School' },
            { title: 'KV Matriculation School', value: 'KV Matriculation School' },
            { title: 'Govt.Her.Sec Matriculation School', value: 'Govt.Her.Sec Matriculation School' }
        ];
        return classValues;
    }

}