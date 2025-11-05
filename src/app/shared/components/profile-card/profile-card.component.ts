// src/app/shared/components/profile-card/profile-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatsBadgeComponent } from '../stats-badge/stats-badge.component'; // We'll create this helper next
import { GitHubUser } from '../../../core/models/user.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ CommonModule, RouterModule, StatsBadgeComponent ],
  templateUrl: './profile-card.component.html',
  styleUrls: [ './profile-card.component.scss' ]
})
export class ProfileCardComponent {
  // Use non-null assertion (!) since the parent component checks for the user data
  @Input({ required: true }) user!: GitHubUser;
}