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

  completeNum = 0;

  penddingNum = 0;

  notStartNum = 0;

  invalidNum = 0;

  chartOption2 = {
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

  chartOption1 = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: '20%',
      top: 'middle',
      data: ['未开始', '进行中', '已完成', '已作废']
    },
    series: [
      {
        name: '任务状态',
        type: 'pie',
        radius: '70%',
        center: ['70%', '60%'],
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  constructor(
    private store: Store<Appstate>,
  ) { }

  ngOnInit() {
    this.store.pipe(map(data => data.projectState.projectDetail)).subscribe(res => {
      this.projectDetail = res;
      this.taskList = res.task || [];
      this.notStartNum = this.taskList.filter(item => item.status === 1).length;
      this.penddingNum = this.taskList.filter(item => item.status === 2).length;
      this.completeNum = this.taskList.filter(item => item.status === 3).length;
      this.invalidNum = this.taskList.filter(item => item.status === 4).length;
      this.initEcharts();
    });
  }

  initEcharts() {
    const data = [
      {
        value: this.notStartNum,
        name: '未开始',
        itemStyle: {
          color: '#2db7f5'
        }
      },
      {
        value: this.penddingNum,
        name: '进行中',
        itemStyle: {
          color: '#22d7bb'
        }
      },
      {
        value: this.completeNum,
        name: '已完成',
        itemStyle: {
          color: '#87d068'
        }
      },
      {
        value: this.invalidNum,
        name: '已作废',
        itemStyle: {
          color: '#f50'
        }
      },
    ];
    this.chartOption2 = {
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
          data: data
        }
      ]
    };

    this.chartOption1 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '20%',
        top: 'middle',
        data: ['未开始', '进行中', '已完成', '已作废']
      },
      series: [
        {
          name: '任务状态',
          type: 'pie',
          radius: '70%',
          center: ['60%', '60%'],
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
