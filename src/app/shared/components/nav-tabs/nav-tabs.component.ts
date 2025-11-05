// src/app/shared/components/nav-tabs/nav-tabs.component.ts
import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-tabs',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="github-tabs-nav">
      <ul>
        @for (tab of tabs; track tab.id) {
          <li>
            <a [routerLink]="['/', username, tab.route]" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{ exact: tab.exact }"
               class="tab-link">
              {{ tab.label }}
              @if (tab.count !== undefined) {
                <span class="count-badge">{{ tab.count }}</span>
              }
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrls: [ './nav-tabs.component.scss' ]
})
export class NavTabsComponent {
  @Input() username: string = '';
  @Input() repoCount: number = 0;

  tabs = [
    { id: 1, label: 'Overview', route: 'overview', count: undefined, exact: false },
    { id: 2, label: 'Repositories', route: 'repositories', count: this.repoCount, exact: false },
    { id: 3, label: 'Projects', route: 'projects', count: undefined, exact: false },
    { id: 4, label: 'Packages', route: 'packages', count: undefined, exact: false },
  ];
}