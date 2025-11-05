import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBadgeComponent } from './stats-badge.component';

describe('StatsBadgeComponent', () => {
  let component: StatsBadgeComponent;
  let fixture: ComponentFixture<StatsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
