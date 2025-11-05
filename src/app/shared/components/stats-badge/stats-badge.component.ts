// src/app/shared/components/stats-badge/stats-badge.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-badge',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <span class="stats-badge">
      <span class="count">{{ count | number }}</span> {{ label }}
    </span>
  `,
  styleUrls: [ './stats-badge.component.scss' ]
})
export class StatsBadgeComponent {
  @Input() count: number = 0;
  @Input() label: string = '';
}