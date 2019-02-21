import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AdminData } from './admin.data';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './admin.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  // user role table setting
  public userRoleDetail: LocalDataSource = new LocalDataSource();
  public userRoleTableSetting: any = AdminData.getUserRoleMappingTableSetting();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.userRoleDetail.load(AdminData.getTempUserRoleDetail());
  }

  
  public onPostCallForUserRoleMap(event): void {
    // todo: implement validation
    console.log(event);
    event.confirm.resolve();
  }

  public onDeleteConfirmForUserRoleMap(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
