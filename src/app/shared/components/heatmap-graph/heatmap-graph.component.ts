import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import * as echarts from 'echarts';
import { ContributionGraph } from '../../../core/models/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-heatmap-graph',
  standalone: true,
  imports: [],
  template: `
    <div class="heatmap-scroll-wrapper">
      <div #chartContainer class="heatmap-chart-container"></div>
    </div>
  `,
  styleUrls: ['./heatmap-graph.component.scss']
})
export class HeatmapGraphComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) graphData!: ContributionGraph;
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  private chartInstance: echarts.ECharts | null = null;
  private resizeObserver?: ResizeObserver;

  private readonly contributionColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
      this.setupResizeHandling();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private transformDataForECharts(): [string, number][] {
    const data: [string, number][] = [];
    for (const week of this.graphData.weeks) {
      for (const day of week.days) {
        data.push([day.date, day.count]);
      }
    }
    return data;
  }

  private getResponsiveCellSize(): [number, number] {
    const width = window.innerWidth;
    if (width < 480) {
      return [10, 10];
    } else if (width < 768) {
      return [11, 11];
    } else if (width < 1012) {
      return [12, 12];
    }
    return [13, 13];
  }

  private getResponsiveFontSizes() {
    const width = window.innerWidth;
    if (width < 480) {
      return { day: 8, month: 9 };
    } else if (width < 768) {
      return { day: 8.5, month: 9.5 };
    }
    return { day: 9, month: 10 };
  }

  private renderChart(): void {
    const chartData = this.transformDataForECharts();
    const chartDom = this.chartContainer.nativeElement;
    this.chartInstance = echarts.init(chartDom);

    const allDates = chartData.map(item => item[0]);
    const startDate = allDates[0];
    const endDate = allDates[allDates.length - 1];

    const cellSize = this.getResponsiveCellSize();
    const fontSize = this.getResponsiveFontSizes();

    const option: echarts.EChartsOption = {
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const count = params.data[1];
          const date = params.data[0];
          return `<strong>${count}</strong> contribution${count !== 1 ? 's' : ''} on ${date}`;
        },
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderColor: 'rgba(0,0,0,0.9)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      visualMap: {
        min: 0,
        max: 20,
        type: 'piecewise',
        orient: 'horizontal',
        show: false,
        pieces: [
          { min: 20, color: this.contributionColors[4] },
          { min: 10, max: 19, color: this.contributionColors[3] },
          { min: 5, max: 9, color: this.contributionColors[2] },
          { min: 1, max: 4, color: this.contributionColors[1] },
          { max: 0, color: this.contributionColors[0] }
        ]
      },
      calendar: {
        top: 20,
        left: window.innerWidth < 480 ? 25 : 35,
        right: window.innerWidth < 480 ? 10 : 20,
        bottom: 20,
        cellSize: cellSize,
        range: [startDate, endDate],
        orient: 'horizontal',
        splitLine: { show: false },
        yearLabel: { show: false },
        dayLabel: {
          firstDay: 0,
          nameMap: window.innerWidth < 480 
            ? ['', 'M', '', 'W', '', 'F', ''] 
            : ['', 'Mon', '', 'Wed', '', 'Fri', ''],
          color: '#57606a',
          fontSize: fontSize.day,
          margin: 2
        },
        monthLabel: {
          nameMap: 'en',
          color: '#57606a',
          fontSize: fontSize.month,
          margin: window.innerWidth < 480 ? 8 : 10
        },
        itemStyle: {
          borderRadius: 3,
          borderWidth: window.innerWidth < 480 ? 1.5 : 2,
          borderColor: '#ffffff'
        }
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: chartData,
          itemStyle: {
            borderRadius: 3
          }
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  private setupResizeHandling(): void {
    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (this.chartInstance) {
          this.chartInstance.dispose();
          this.renderChart();
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.chartInstance?.resize();
      });
      this.resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }
}