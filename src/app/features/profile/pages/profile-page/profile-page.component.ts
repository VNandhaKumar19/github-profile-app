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
  imports: [ RouterModule, ProfileCardComponent, NavTabsComponent ],
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
        this.user.set({
          "login": "shreeramk",
          "id": 5489153,
          "node_id": "MDQ6VXNlcjU0ODkxNTM=",
          "avatar_url": "https://avatars.githubusercontent.com/u/5489153?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/shreeramk",
          "html_url": "https://github.com/shreeramk",
          "followers_url": "https://api.github.com/users/shreeramk/followers",
          "following_url": "https://api.github.com/users/shreeramk/following{/other_user}",
          "gists_url": "https://api.github.com/users/shreeramk/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/shreeramk/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/shreeramk/subscriptions",
          "organizations_url": "https://api.github.com/users/shreeramk/orgs",
          "repos_url": "https://api.github.com/users/shreeramk/repos",
          "events_url": "https://api.github.com/users/shreeramk/events{/privacy}",
          "received_events_url": "https://api.github.com/users/shreeramk/received_events",
          "type": "User",
          // "user_view_type": "public",
          "site_admin": false,
          "name": "Shreeram Kushwaha",
          "company": "UptimeAI",
          "blog": "http://shreeramk.com",
          "location": "Bangalore, India",
          "email": null,
          "hireable": true,
          "bio": "Director of Engineering @UptimeAI\r\n\r\nPython, Angular, Javascript, NodeJS, MongoDB, Influx DB, TimescaleDB, Streamsets, Kafka, AWS, Azure, HTML5, CSS",
          "twitter_username": "pom_fret",
          "public_repos": 8,
          "public_gists": 1,
          "followers": 11,
          "following": 3,
          "created_at": "2013-09-18T18:46:47Z",
          "updated_at": "2025-10-03T17:43:20Z"
        });
        this.error.set('Failed to load GitHub profile.');
        this.isLoading.set(false);
      }
    });
  }
}