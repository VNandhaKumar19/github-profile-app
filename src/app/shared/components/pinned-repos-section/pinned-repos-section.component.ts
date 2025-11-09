// src/app/shared/components/pinned-repos-section/pinned-repos-section.component.ts (Updated)

import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoListItemComponent } from '../repo-list-item/repo-list-item.component';
import { GithubService } from '../../../core/services/github.service';
import { Repository } from '../../../core/models/user.interface';

@Component({
  selector: 'app-pinned-repos-section',
  standalone: true,
  imports: [CommonModule, RepoListItemComponent],
  templateUrl: './pinned-repos-section.component.html',
  styleUrls: ['./pinned-repos-section.component.scss']
})
export class PinnedReposSectionComponent implements OnInit {
  private githubService = inject(GithubService);
  repositories = signal<Repository[]>([]);

  // Input to receive the repos URL from the parent OverviewComponent
  @Input({ required: true }) reposUrl!: string;
  @Input({ required: true }) name!: string;

  ngOnInit(): void {
    if (this.reposUrl) {
      // Use the real API call
      this.githubService.getRepositoriesByUrl(this.reposUrl).subscribe({
        next: repos => this.repositories.set(repos),
        error: err => console.error('Error fetching repositories:', err)
      });
    }
  }
}