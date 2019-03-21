import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { IState } from '../common/common.interface';
import { CommonService } from '../common/common.service';
import { SchoolComponent } from './school.component';
import { ISchoolSearchData } from './school.interface';
import { SchoolService } from './school.service';

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
  public isSearchError: boolean;

  // performance param table setting
  public schoolTableData: LocalDataSource = new LocalDataSource();
  public schoolTableParamSetting: any = this.getSchoolTableSetting();

  constructor(private modalService: NgbModal,
    private commonService: CommonService,
    private schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.isSearchError = false;
    this.searchDropdownLoading = false;
    this.searchDataLoading = false;
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
      pager: { display: true, perPage: 5 },
      actions: { add: false, position: 'right' },

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
      this.isSearchError = false;
      this.stateList.forEach((state) => {
        if (state.stateName == this.schoolSearchData.stateName) {
          this.districtList = state.districts;
        }
      });
    }
    this.searchDropdownLoading = false;
  }

  public onSearch() {
    if (this.schoolSearchData.stateName == '--Select State--') {
      this.isSearchError = true;
    } else {
      this.searchDataLoading = true;
      this.schoolService.getSchoolsForSearch(this.schoolSearchData).subscribe(
        (response) => {
          this.schoolTableData = new LocalDataSource(response);
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

  public editSchool(event) {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Edit School Detail';
    activeModal.componentInstance.action = 'edit';
    activeModal.componentInstance.schoolId = event.data.id;
    activeModal.componentInstance.stateList = this.stateList;
  }

  public viewSchool(event) {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'View School Detail';
    activeModal.componentInstance.action = 'view';
    activeModal.componentInstance.schoolId = event.data.id;
    activeModal.componentInstance.stateList = this.stateList;
  }

  public createSchool(): void {
    const activeModal = this.modalService.open(SchoolComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Add School Detail';
    activeModal.componentInstance.action = 'create';
    activeModal.componentInstance.stateList = this.stateList;
  }

  public isGrantedRole(): boolean {
    const restrictedRole = 'Event POC';
    //const restrictedRole = 'PMO';
    if (restrictedRole === localStorage.getItem('roleName')) {
      return false;
    } else {
      return true;
    }
  }

}
