import { Component, OnInit } from '@angular/core';
import { PerformanceStaticData } from '../performance/metrics/performance-metrics.constant';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    public monthList: Array<any>;
  constructor(
    private dashboardService: DashboardService) {
	}

  ngOnInit(): void {
    this.monthList = PerformanceStaticData.monthList;
    this.getSchoolByMonthMetrics();
  }

  // data goes here
public single = [
  {
    "name": "Attendance",
    "value": 155
  },
  {
    "name": "Homework",
    "value": 165
  },
  {
    "name": "Discipline",
    "value": 170
  }
];

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


  view: any[] = [700, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Schools using Greenstar application';
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
  private getSchoolByMonthMetrics() {
    this.dashboardService.getSchoolByMonthMetrics().subscribe((response) => {
        this.single = response.result;
    }, error => {
        console.log("Http Server error", error);
    });
}
}
