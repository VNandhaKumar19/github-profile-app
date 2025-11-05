import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedReposSectionComponent } from './pinned-repos-section.component';

describe('PinnedReposSectionComponent', () => {
  let component: PinnedReposSectionComponent;
  let fixture: ComponentFixture<PinnedReposSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinnedReposSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinnedReposSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
