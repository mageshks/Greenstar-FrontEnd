import { ISchoolDetail, IClass, IPerformanceParam, IHoliday } from "./school.interface";
import { SmartTableDatePickerComponent } from "../../@theme/components/smart-table-date-picker-component/smart-table-date-picker.components";

export class SchoolData {
    public static schoolDetail: ISchoolDetail = {} as ISchoolDetail;

    public static getClassTableSetting(action: string): any {
        let settings: any;
        if (action == 'view') {
            settings = {
                actions: { add: false, edit: false, delete: false },
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
        } else {
            settings = {
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
        }
        return settings;
    }

    public static getPerfParamTableSetting(action: string): any {
        let settings: any;
        if (action == 'view') {
            settings = {
                actions: { add: false, edit: false, delete: false },
                hideSubHeader: true,
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
        } else {
            settings = {
                edit: {
                    editButtonContent: '<i class="ion-edit"></i>',
                    saveButtonContent: '<i class="nb-checkmark"></i>',
                    cancelButtonContent: '<i class="nb-close"></i>',
                    confirmSave: true
                },
                actions: { delete: false },
                hideSubHeader: true,
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
        }
        return settings;
    }

    public static getSchoolHolidaySetting(action: string): any {
        let settings: any;
        if (action == 'view') {
            console.log('action ==> ' + action);
            settings = {
                actions: { add: false, edit: false, delete: false },
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
        } else {
            settings = {
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
        }
        return settings;
    }

    public static getSchoolWeekendWorkingSetting(action: string): any {
        let settings: any;
        if (action == 'view') {
            settings = {
                actions: { add: false, edit: false, delete: false },
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
        } else {
            settings = {
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
        }
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
        this.schoolDetail.perfParamList = this.getDefaultPerfParamDetail();
        // holidays
        this.schoolDetail.holidays = [];

        // weekend working days
        this.schoolDetail.weekendWorkingDays = [];

        return this.schoolDetail;
    }

   public static getDefaultPerfParamDetail(): IPerformanceParam[] {

        var parameterList: IPerformanceParam[] = [
            { id: null, paramTitle: 'Attendance', paramDesc: 'Attendance Performance' },
            { id: null, paramTitle: 'Discipline', paramDesc: 'Discipline Performance' },
            { id: null, paramTitle: 'Homework', paramDesc: 'Homework Performance' }
        ];
        return parameterList;
    }
}