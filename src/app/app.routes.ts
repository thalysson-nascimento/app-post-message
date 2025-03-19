import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent), // Lazy loading do HomeModule
  },
  {
    path: 'message',
    loadComponent: () =>
      import('./pages/message/message.component').then(
        (m) => m.MessageComponent
      ),
  },
];
