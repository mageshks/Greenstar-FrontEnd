import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from '../performance.service';
import { GreenstarComponent } from './greenstar/greenstar.component';

@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-star.component.scss'],
    templateUrl: './performance-star.component.html',
})
export class PerformanceStarComponent implements OnInit {

    public isSchoolViewable = false;
    public isClassViewable = false;
    public isSectionViewable = false;
    public isMonthViewable = false;
    public isTeamViewable = false;
    public isNameViewable = false;
    public calcType = "";
    
    //Parameter name
    public paramOne =  "HomeWork";
    public paramTwo =  "Discipline";
    public paramThree =  "Attendance";

    //Parameter data for each star
    public perfStarMonthDataParamOne = new Array("#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FF0000","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00",
    "#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FFFFFF","#FFFFFF");
    public perfStarMonthDataParamTwo = new Array("#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FF0000","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00",
    "#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FFFFFF","#FFFFFF");
    public perfStarMonthDataParamThree = new Array("#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00","#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FF0000","#7CFC00","#7CFC00","#7CFC00","#7beded","#7beded","#7CFC00",
    "#7CFC00","#7CFC00","#FFFF00","#7CFC00","#7beded","#7beded","#7CFC00","#FFFFFF","#FFFFFF");
    constructor() {
    }

    ngOnInit(): void {

    }

    public onChangeCalcType(selectedValue: string) {
        if (selectedValue == "Individual") {
            this.isSchoolViewable = true;
            this.isClassViewable = true;
            this.isSectionViewable = true;
            this.isMonthViewable = true;
            this.isNameViewable = true;
            this.isTeamViewable = false;
        } else if (selectedValue == "Team") {
            this.isSchoolViewable = true;
            this.isClassViewable = true;
            this.isSectionViewable = true;
            this.isMonthViewable = true;
            this.isNameViewable = false;
            this.isTeamViewable = true;
        } else if (selectedValue == "Class") {
            this.isSchoolViewable = true;
            this.isClassViewable = true;
            this.isSectionViewable = true;
            this.isMonthViewable = true;
            this.isNameViewable = false;
            this.isTeamViewable = false;
        } else if (selectedValue == "School") {
            this.isSchoolViewable = true;
            this.isMonthViewable = true;
            this.isClassViewable = false;
            this.isSectionViewable = false;
            this.isNameViewable = false;
            this.isTeamViewable = false;
        }
    }
}
