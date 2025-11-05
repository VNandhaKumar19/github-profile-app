import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapGraphComponent } from './heatmap-graph.component';

describe('HeatmapGraphComponent', () => {
  let component: HeatmapGraphComponent;
  let fixture: ComponentFixture<HeatmapGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatmapGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
