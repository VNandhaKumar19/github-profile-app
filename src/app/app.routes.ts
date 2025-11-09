// src/app/app.routes.ts (FIXED AND FINALIZED)

import { Routes } from '@angular/router';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page.component';
import { OverviewComponent } from './features/profile/pages/overview/overview.component';
import { RepositoriesComponent } from './features/profile/pages/repositories/repositories.component';
import { ProjectsComponent } from './features/profile/pages/projects/projects.component';
import { PackagesComponent } from './features/profile/pages/packages/packages.component';


export const routes: Routes = [
    { path: '', redirectTo: 'shreeramk', pathMatch: 'full' },
    {
        path: ':username',
        component: ProfilePageComponent,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent },
            { path: 'repositories', component: RepositoriesComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'packages', component: PackagesComponent },
        ],
    },

    { path: '**', redirectTo: 'shreeramk' },
];