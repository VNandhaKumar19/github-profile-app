import { Routes } from '@angular/router';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'shreeramk', pathMatch: 'full' },
    {
        path: ':username',
        component: ProfilePageComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: ProfilePageComponent },
            { path: 'repositories', component: ProfilePageComponent },
            { path: 'projects', component: ProfilePageComponent },
            { path: 'packages', component: ProfilePageComponent },
        ],
    },
    { path: '**', redirectTo: 'shreeramk' },
];
