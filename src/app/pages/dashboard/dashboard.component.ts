import { Component, OnInit } from '@angular/core';
import { PerformanceStaticData } from '../performance/metrics/performance-metrics.constant';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public totalNoOfSchools:String;

    view: any[] = [800, 600];
    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabelForSchoolMonth = 'Month';
    yAxisLabelForSchoolMonth = 'Number of Schools using Greenstar application';
    xAxisLabel = 'X' ;
    showYAxisLabel = true;
    yAxisLabel = 'Y' ;
    timeline = true;
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
  
    // line, area
    autoScale = true;
  
    //pie
    showLabels = true;
    explodeSlices = false;
    doughnut = false;
    public schoolByMonthSingle: Array<any>;
    public topSchoolByMonthSingle: Array<any>;

  constructor(
    private dashboardService: DashboardService) {
	}

  ngOnInit(): void {
    this.getTotalNoOfSchools(); 
    this.getSchoolByMonthMetrics();
    this.getTopPerformingSchools();
  }
  private getTotalNoOfSchools(): void {
    this.dashboardService.getTotalNoOfSchools().subscribe((response) => {
      this.totalNoOfSchools = response.result;
    }, error => {
        console.log("Http Server error", error);
    });
  }

  private getTopPerformingSchools(): void{
    this.dashboardService.getTopPerformingSchools().subscribe((response) => {
      this.topSchoolByMonthSingle = response.result;
    }, error => {
      console.log("Http Server error", error);
    });
  }

  // data goes here

public multi = [
  {
    "name": "5th Standard",
    "series": [
      {
        "name": "Attendance",
        "value": 165
      },
      {
        "name": "Homework",
        "value": 170
      },
      {
        "name": "Discipline",
        "value": 162
      }
    ]
  },

  {
    "name": "6th Standard",
    "series": [
      {
        "name": "Attendance",
        "value": 105
      },
      {
        "name": "Homework",
        "value": 120
      },
      {
        "name": "Discipline",
        "value": 152
      }
    ]
  },

  {
    "name": "7th Standard",
    "series": [
      {
        "name": "Attendance",
        "value": 125
      },
      {
        "name": "Homework",
        "value": 130
      },
      {
        "name": "Discipline",
        "value": 112
      }
    ]
  },
  {
    "name": "8th Standard",
    "series": [
      {
        "name": "Attendance",
        "value": 185
      },
      {
        "name": "Homework",
        "value": 130
      },
      {
        "name": "Discipline",
        "value": 122
      }
    ]
  },
  {
    "name": "9th Standard",
    "series": [
      {
        "name": "Attendance",
        "value": 115
      },
      {
        "name": "Homework",
        "value": 107
      },
      {
        "name": "Discipline",
        "value": 126
      }
    ]
  }
];

  private getSchoolByMonthMetrics() {
    this.dashboardService.getSchoolByMonthMetrics().subscribe((response) => {
        this.schoolByMonthSingle = response.result;
    }, error => {
        console.log("Http Server error", error);
    });
}
}
