import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { GitHubUser, ContributionGraph, ContributionWeek, ContributionDay, Repository, Fork } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly USER_API_URL = 'https://api.github.com/users/';
  private readonly MOCK_USER_NAME = 'shreeramk';

  constructor(private http: HttpClient) { }

  getUserProfile(username: string = this.MOCK_USER_NAME): Observable<GitHubUser> {
    const url = `${this.USER_API_URL}${username}`;
    return this.http.get<GitHubUser>(url);
  }

  getContributionGraph(username: string): Observable<ContributionGraph> {
    const mockData: ContributionGraph = {
      totalContributions: 1245,
      weeks: this.generateMockWeeks(53),
    };
    return of(mockData).pipe(delay(500));
  }

  private generateMockWeeks(numWeeks: number): ContributionWeek[] {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const startDate = new Date(today);
    const oneYearDate = new Date(today);
    oneYearDate.setDate(today.getDate() - (numWeeks - 1) * 7);
    const dayOfWeek = oneYearDate.getDay();
    startDate.setDate((today.getDate() - (numWeeks - 1) * 7) - dayOfWeek);

    for (let w = 0; w < numWeeks; w++) {
      const days: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (w * 7) + d);

        const count = Math.floor(Math.random() * 21);
        let colorLevel: 0 | 1 | 2 | 3 | 4;

        if (count === 0) colorLevel = 0;
        else if (count <= 4) colorLevel = 1;
        else if (count <= 9) colorLevel = 2;
        else if (count <= 15) colorLevel = 3;
        else colorLevel = 4;

        days.push({
          date: date.toISOString().split('T')[ 0 ],
          count,
          colorLevel,
        });
      }
      weeks.push({ days });
    }
    return weeks;
  }

  getRepositoriesByUrl(reposUrl: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(reposUrl).pipe(
      map(repos =>
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      ),
      map(sortedRepos =>
        sortedRepos.slice(0, 6)
      )
    );
  }

  getForkDataByUrl(forkUrl: string): Observable<Fork> {
    return this.http.get<Fork>(forkUrl);
  }
}