import { Component, inject, signal } from '@angular/core';
import { ContributionGraph, GitHubUser } from '../../../../core/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../../core/services/github.service';
import { HeatmapGraphComponent } from "../../../../shared/components/heatmap-graph/heatmap-graph.component";
import { PinnedReposSectionComponent } from "../../../../shared/components/pinned-repos-section/pinned-repos-section.component";
import { ActivitySectionComponent } from '../../../../shared/components/activity-section/activity-section.component';
import { ContributionSectionComponent } from '../../../../shared/components/contribution-section/contribution-section.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ HeatmapGraphComponent, PinnedReposSectionComponent, ActivitySectionComponent, ContributionSectionComponent ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  private route = inject(ActivatedRoute);
  private githubService = inject(GithubService);

  userProfile = signal<GitHubUser | undefined>(undefined);
  contributionData = signal<ContributionGraph | undefined>(undefined);
  protected readonly contributionColors = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];
  username: string = '';

  ngOnInit(): void {
    // Get the username from the parent route (ProfilePage's route)
    this.route.parent!.paramMap.subscribe(params => {
      this.username = params.get('username') || 'shreeramk';
      this.fetchUserProfile(this.username);
      this.fetchContributions(this.username);
    });
  }

  fetchUserProfile(username: string): void {
    this.githubService.getUserProfile(username).subscribe({
      next: user => {
        this.userProfile.set(user);
      },
      error: () => {
        this.userProfile.set({
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
        })
      }
    });
  }

  fetchContributions(username: string): void {
    this.githubService.getContributionGraph(username).subscribe(data => {
      this.contributionData.set(data);
    });
  }
}
