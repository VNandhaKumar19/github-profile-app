import { Component, inject, signal } from '@angular/core';
import { ContributionGraph } from '../../../../core/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../../core/services/github.service';
import { HeatmapGraphComponent } from "../../../../shared/components/heatmap-graph/heatmap-graph.component";
import { PinnedReposSectionComponent } from "../../../../shared/components/pinned-repos-section/pinned-repos-section.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [HeatmapGraphComponent, PinnedReposSectionComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  private route = inject(ActivatedRoute);
  private githubService = inject(GithubService);

  contributionData = signal<ContributionGraph | undefined>(undefined);
  username: string = '';

  ngOnInit(): void {
    // Get the username from the parent route (ProfilePage's route)
    this.route.parent!.paramMap.subscribe(params => {
      this.username = params.get('username') || 'shreeramk';
      this.fetchContributions(this.username);
    });
  }

  fetchContributions(username: string): void {
    this.githubService.getContributionGraph(username).subscribe(data => {
      this.contributionData.set(data);
    });
  }
}
