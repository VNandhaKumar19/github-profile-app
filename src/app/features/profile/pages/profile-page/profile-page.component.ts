// src/app/features/profile/pages/profile-page/profile-page.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfileCardComponent } from '../../../../shared/components/profile-card/profile-card.component';
import { NavTabsComponent } from '../../../../shared/components/nav-tabs/nav-tabs.component';
import { GitHubUser } from '../../../../core/models/user.interface';
import { GithubService } from '../../../../core/services/github.service';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterModule, ProfileCardComponent, NavTabsComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: [ './profile-page.component.scss' ]
})
export class ProfilePageComponent implements OnInit {
  user = signal<GitHubUser | undefined>(undefined);
  isLoading = signal(true);
  error = signal<string | null>(null);
  username: string = '';
  private route = inject(ActivatedRoute);
  private githubService = inject(GithubService);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || 'shreeramk';
      this.fetchData(this.username);
    });
  }

  fetchData(username: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.githubService.getUserProfile(username).subscribe({
      next: (data) => {
        this.user.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load GitHub profile.');
        this.isLoading.set(false);
      }
    });
  }
}