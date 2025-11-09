import { Component, inject, Input, OnInit } from '@angular/core';
import { Fork, Repository } from '../../../core/models/user.interface';
import { DecimalPipe } from '@angular/common';
import { GithubService } from '../../../core/services/github.service';

@Component({
  selector: '[app-repo-list-item]',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './repo-list-item.component.html',
  styleUrl: './repo-list-item.component.scss'
})
export class RepoListItemComponent implements OnInit {

  private service = inject(GithubService);

  @Input({ required: true }) repo!: Repository;
  @Input({ required: true }) name!: string;

  forkData!: Fork

  getLanguageColor(language: string): string {
    switch (language) {
      case 'Jupyter Notebook': return '#DA5B0B';
      case 'Dart': return '#00B4AB';
      case 'Shell': return '#89e051';
      case 'JavaScript': return '#f1e05a';
      case 'TypeScript': return '#2b7489';
      default: return '#ccc';
    }
  }

  ngOnInit(): void {
    this.getForkData();  
  }

  getForkData() {
    this.service.getForkDataByUrl(this.repo.url).subscribe({
      next: (res) => {
        this.forkData = res;
      }
    })
  }
}
