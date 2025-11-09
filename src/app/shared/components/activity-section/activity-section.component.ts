import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-activity-section',
  imports: [],
  standalone: true,
  templateUrl: './activity-section.component.html',
  styleUrl: './activity-section.component.scss',
})
export class ActivitySectionComponent implements AfterViewInit {
  activityOverview = {
    organizations: [ '@UptimeAI', '@timescale' ],
    contributions: {
      repositories: [
        'UptimeAI/uptime_webapp',
        'UptimeAI/uptime_server',
        'UptimeAI/uptime_ml'
      ],
      othersCount: 13
    },
    stats: {
      commits: 83,
      pullRequests: 17,
      issues: 0,
      codeReview: 0
    }
  };

  @ViewChild('activityRadarChart', { static: true }) activityRadarChart!: ElementRef;

  ngAfterViewInit(): void {
    this.renderActivityChart();
  }

  renderActivityChart(): void {
    const chartDom = this.activityRadarChart.nativeElement;
    const chart = echarts.init(chartDom);

    const stats = this.activityOverview.stats;

    const option: echarts.EChartsOption = {
      radar: {
        indicator: [
          { name: `Code review (${stats.codeReview}%)`, max: 100 },
          { name: `Commits (${stats.commits}%)`, max: 100 },
          { name: `Pull requests (${stats.pullRequests}%)`, max: 100 },
          { name: `Issues (${stats.issues}%)`, max: 100 }
        ],
        axisName: {
          color: '#57606a',
          fontSize: 12
        },
        axisLine: {
          lineStyle: { color: '#2ea043' }
        },
        splitLine: {
          lineStyle: { color: '#2ea04344' }
        },
        splitArea: { show: false },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [ stats.codeReview, stats.commits, stats.pullRequests, stats.issues ],
              areaStyle: { color: 'rgba(46, 160, 67, 0.3)' },
              lineStyle: { color: '#2ea043' },
              symbol: 'circle',
              symbolSize: 4,
              itemStyle: { color: '#2ea043' }
            }
          ]
        }
      ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
  }
}
