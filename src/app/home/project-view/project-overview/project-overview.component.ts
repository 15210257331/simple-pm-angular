import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/store';
import { map } from 'rxjs/operators';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  projectDetail: any;

  taskList: any[] = [];

  chartOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['未开始', '进行中', '已完成', '已作废'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '任务',
        type: 'bar',
        barWidth: '30%',
        data: []
      }
    ]
  };

  constructor(
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    const projectDetail$ = this.store
      .pipe(
        map(data => data.projectState.projectDetail),
      )
      .subscribe(res => {
        this.projectDetail = res;
        this.taskList = this.projectDetail.task;
        this.initEcharts();
      });
  }

  initEcharts() {
    const arr = [
      {
        value: this.taskList.filter(item => item.status === 1).length,
        itemStyle: {
          color: '#2db7f5'
        }
      },
      {
        value: this.taskList.filter(item => item.status === 2).length,
        itemStyle: {
          color: '#22d7bb'
        }
      },
      {
        value: this.taskList.filter(item => item.status === 3).length,
        itemStyle: {
          color: '#87d068'
        }
      },
      {
        value: this.taskList.filter(item => item.status === 4).length,
        itemStyle: {
          color: '#f50'
        }
      },
    ];
    this.chartOption = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['未开始', '进行中', '已完成', '已作废'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '任务',
          type: 'bar',
          barWidth: '30%',
          data: arr
        }
      ]
    };
  }

}
