// src/app/shared/components/heatmap-graph/heatmap-graph.component.ts
import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts'; // Import Echarts library
import { ContributionGraph } from '../../../core/models/user.interface';

// Helper function to process data for Echarts Calendar
function getEchartsData(graph: ContributionGraph): [ string, number ][] {
  const data: [ string, number ][] = [];
  graph.weeks.forEach(week => {
    week.days.forEach(day => {
      data.push([ day.date, day.count ]);
    });
  });
  return data;
}

@Component({
  selector: 'app-heatmap-graph',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <div #chartContainer class="heatmap-chart-container"></div>
  `,
  styleUrls: [ './heatmap-graph.component.scss' ]
})
export class HeatmapGraphComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) graphData!: ContributionGraph;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private chartInstance: echarts.ECharts | null = null;

  // Custom GitHub Green colors
  private readonly contributionColors = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }

  private renderChart(): void {
    if (!this.chartContainer || !this.graphData) return;

    const dom = this.chartContainer.nativeElement;
    this.chartInstance = echarts.init(dom);

    const chartData = getEchartsData(this.graphData);
    const today = new Date();
    const endDate = today.toISOString().split('T')[ 0 ];
    const startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[ 0 ]; // Start of the year

    const option: echarts.EChartsOption = {
      tooltip: {
        formatter: (params: any) => {
          return `${params.value[ 1 ]} contributions on ${params.value[ 0 ]}`;
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 9, // Assuming max contributions is around 9
        inRange: {
          color: this.contributionColors
        }
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: [ 12, 12 ],
        range: [ startDate, endDate ],
        splitLine: { show: false },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#f6f8fa' // Light border to separate cells
        },
        yearLabel: { show: false },
        monthLabel: {
          nameMap: 'en',
          position: 'start',
          margin: 10
        },
        dayLabel: {
          nameMap: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          firstDay: 0 // Sunday start (GitHub style)
        }
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: chartData,
        }
      ]
    };

    this.chartInstance.setOption(option);

    // Add resize listener for responsiveness
    window.addEventListener('resize', () => {
      this.chartInstance?.resize();
    });
  }
}