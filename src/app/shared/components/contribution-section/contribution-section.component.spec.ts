import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionSectionComponent } from './contribution-section.component';

describe('ContributionSectionComponent', () => {
  let component: ContributionSectionComponent;
  let fixture: ComponentFixture<ContributionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
