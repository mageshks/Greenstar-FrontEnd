import { ISchoolDetail, IClass, IPerformanceParam } from "./school.interface";

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
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                className: {
                    title: 'Class',
                    type: 'number',
                },
                sectionName: {
                    title: 'Section',
                    type: 'string',
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
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
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

    public static getSchoolDetails(): ISchoolDetail {

        this.schoolDetail.schoolName = 'SSVM Matriculation';
        this.schoolDetail.address = 'Coimbatore';
        this.schoolDetail.city = 'Coimbatore';
        this.schoolDetail.state = 'Tamil Nadu';
        this.schoolDetail.district = 'Coimbatore';

        // class detail
        this.schoolDetail.classList = this.getClassDetail();

        // performance parameters
        this.schoolDetail.perfParamType = this.PERF_PARAM_DEFAULT;
        // this.schoolDetail.perfParamType = this.PERF_PARAM_CUSTOM;
        this.schoolDetail.perfParamList = [];

        return this.schoolDetail;
    }

    public static getClassDetail(): IClass[] {

        var classList: IClass[] = [
            { className: 'First', sectionName: 'A' },
            { className: 'First', sectionName: 'B' },
            { className: 'First', sectionName: 'C' },
            { className: 'Second', sectionName: 'A' },
            { className: 'Second', sectionName: 'B' },
        ];
        return classList;
    }

    public static getDefaultPerfParamDetail(): IPerformanceParam[] {

        var classList: IPerformanceParam[] = [
            { paramTitle: 'Attendence', paramDesc: 'Attendence Performance' },
            { paramTitle: 'Desciplan', paramDesc: 'Desciplan Performance' },
            { paramTitle: 'Home Work', paramDesc: 'Home Work' }
        ];
        return classList;
    }

}