import { OnInit, Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { SchoolComponent } from './school.component';
import { SchoolService } from './school.service';
import { NbDialogService } from '@nebular/theme';
import { ISchoolDetail, ISchoolSearchData } from './school.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common/common.service';
import { IState } from '../common/common.interface';

@Component({
  selector: 'ngx-school',
  styleUrls: ['./school.component.scss'],
  templateUrl: './school-list.component.html',
})
export class SchoolListComponent implements OnInit {

  public schoolSearchData: ISchoolSearchData = {} as ISchoolSearchData;

  public stateList: IState[];

  public districtList: string[];

  public searchDropdownLoading: boolean;
  public searchDataLoading: boolean;

  public isSearchError:boolean;


  // performance param table setting
  public schoolTableData: LocalDataSource = null;
  public schoolTableParamSetting: any = this.getSchoolTableSetting();

  constructor(private modalService: NgbModal,
     private commonService: CommonService,
     private schoolService: SchoolService) {

  }

  ngOnInit(): void {
    this.isSearchError=false;
    this.searchDropdownLoading = false;
    this.searchDataLoading= false;
    this.loadSearchDropDowns();
    this.schoolSearchData.stateName = "--Select State--";
    this.schoolSearchData.district = "--Select District--";
  }

  private loadSearchDropDowns() {
    this.searchDropdownLoading = true;
    this.commonService.getStates().subscribe(
      (response) => {
        this.stateList = response;
        this.searchDropdownLoading = false;
      },
      error => {
        console.log("Http Server error", error);
        this.searchDropdownLoading = false;
      }
    );
  }


  public getSchoolTableSetting(): any {
    let settings: any = {
      edit: {
        editButtonContent: '<i class="ion-edit"></i>'
      },
      delete: {
        deleteButtonContent: '<i class="ion-eye"></i>'
      },
      mode: 'external',
      pager: {display: true,perPage: 5},
      actions: { add: false,position: 'right' },

      columns: {
        schoolName: {
          title: 'School Name',
          type: 'string',
        },
        address: {
          title: 'Address',
          type: 'string',
        },
        district: {
          title: 'District',
          type: 'string',
        }
      }
    };

    return settings;
  }

  // On change of state set corresponding district to the district dropdown
  public onStateChange() {
    this.searchDropdownLoading = true;
    if (this.schoolSearchData.stateName == '--Select State--') {
      this.districtList = [];
    } else {
      this.isSearchError=false;
      this.stateList.forEach((state) => {
        if (state.stateName == this.schoolSearchData.stateName) {
          this.districtList = state.districts;
        }
      });
    }
    this.searchDropdownLoading = false;
  }

  public onSearch(){
    if (this.schoolSearchData.stateName == '--Select State--') {
      this.isSearchError=true;
    } else{
      this.searchDataLoading = true;
      this.schoolService.getSchoolsForSearch(this.schoolSearchData).subscribe(
        (response) => {
          console.log(JSON.stringify(response));
          this.schoolTableData =  new LocalDataSource(response);
          this.searchDataLoading = false;
        },
        error => {
          this.searchDataLoading = false;
          console.log("Http Server error", error);
          this.searchDataLoading = false;
        }
      );
    }
  }

  public editSchool($event){
    console.log($event.data);
    this.createSchool();
  }

  public viewSchool($event){
    console.log($event.data);
    this.createSchool();
  }

  public createSchool(): void {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Add School & Class';
    activeModal.componentInstance.action = 'create';
  }

  public editSchool1(schoolDetail: ISchoolDetail): void {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Edit School & Class';
    activeModal.componentInstance.action = 'edit';
    activeModal.componentInstance.schoolId = schoolDetail.id;
  }

}
