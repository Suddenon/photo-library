import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favorites-page',
    imports: [],
    templateUrl: './favorites-page.component.html',
    styleUrl: './favorites-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent {
    private readonly _favoritesService = inject(FavoritesService);
    private readonly _router = inject(Router);

    public readonly favorites = this._favoritesService.favorites;

    public onPhotoClick(id: string): void {
        this._router.navigate(['/photos', id]);
    }
}
