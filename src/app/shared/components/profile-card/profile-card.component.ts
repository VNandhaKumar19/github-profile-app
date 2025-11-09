import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GitHubUser } from '../../../core/models/user.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ DecimalPipe, DatePipe, RouterModule ],
  templateUrl: './profile-card.component.html',
  styleUrls: [ './profile-card.component.scss' ]
})
export class ProfileCardComponent {
  @Input({ required: true }) user!: GitHubUser;
}