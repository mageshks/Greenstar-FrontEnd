import { OnInit, Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { NbDialogService, NbStepperComponent, NbSpinnerComponent } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceService } from '../performance.service';
import { GreenstarComponent } from './greenstar/greenstar.component';

import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
@Component({
    selector: 'ngx-performance',
    styleUrls: ['./performance-star.component.scss'],
    templateUrl: './performance-star.component.html',
})
export class PerformanceStarComponent implements OnInit {

    // Enable indicators for search inputs
    public isSchoolViewable = false;
    public isClassViewable = false;
    public isSectionViewable = false;
    public isMonthViewable = false;
    public isTeamViewable = false;
    public isNameViewable = false;

    //Value holders for search input

    public calcType = "";

    // Loading indicator used on printing pdf
    public loading = false;

    //Parameter name
    public paramOne = "HomeWork";
    public paramTwo = "Discipline";
    public paramThree = "Attendance";

    public isDataAvailable = true;
    public isNoPerfData = false;

    //Parameter data for each star
    public perfStarMonthDataParamOne = new Array("#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FF0000", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00",
        "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FFFFFF", "#FFFFFF");
    public perfStarMonthDataParamTwo = new Array("#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FF0000", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00",
        "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FFFFFF", "#FFFFFF");
    public perfStarMonthDataParamThree = new Array("#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FF0000", "#7CFC00", "#7CFC00", "#7CFC00", "#7beded", "#7beded", "#7CFC00",
        "#7CFC00", "#7CFC00", "#FFFF00", "#7CFC00", "#7beded", "#7beded", "#7CFC00", "#FFFFFF", "#FFFFFF");
    constructor() {
    }
    /**
    * Method to print the star for each param on each page, to change the 
    * svg size while printing the svg size is set to the required size and
    * reset back to support responsiveness
    * */
    public printStar() {
        this.loading= true;
        let starSVGS = document.getElementsByClassName("svgClass");
        console.log("Star Svg's count ==> " + starSVGS.length);
        console.log("starSVGS[0] ==> " + starSVGS[0]);
        // Set the height and width of the star so that the svg will render properly in pdf
        starSVGS[0].setAttribute("width", "500");
        starSVGS[0].setAttribute("height", "500");
        //Dynamically choose the parent since the second step content won't be enabled on the first rendering
        let  paramContent = document.getElementsByName("starDisplayContent")[0];
        console.log("Content to be printed ==> " + paramContent.id);

        html2canvas(paramContent,{logging:true}).then(canvas => {
            const paramStar = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4');
            pdf.addImage(paramStar, 'PNG', 20, 50, 0, 0);// change x and y coordinates to print star in centre
            pdf.save('PerformanceStar.pdf'); // Generated PDF
            // Reset the height and width of svg to be responsive
            starSVGS[0].setAttribute("width", "100%");
            starSVGS[0].setAttribute("height", "100%");
            this.loading= false;   
        });
    }
    ngOnInit(): void {
    }

    // Method to enable disable input based on the type selection
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
