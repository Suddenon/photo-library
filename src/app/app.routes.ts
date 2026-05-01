import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/photos/photos-page.component').then((m) => m.PhotosPageComponent),
    },
    {
        path: 'favorites',
        loadComponent: () =>
            import('./features/favorites/favorites-page.component').then(
                (m) => m.FavoritesPageComponent,
            ),
    },
    {
        path: 'photos/:id',
        loadComponent: () =>
            import('./features/photo-details/photo-details-page.component').then(
                (m) => m.PhotoDetailsPageComponent,
            ),
    },
];
