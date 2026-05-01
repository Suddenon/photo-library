import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Router } from '@angular/router';
import { PhotoCardComponent } from '../../shared/components/photo-card/photo-card.component';
import { IPhoto } from '../../core/models/photo.model';

@Component({
    selector: 'app-favorites-page',
    imports: [PhotoCardComponent],
    templateUrl: './favorites-page.component.html',
    styleUrl: './favorites-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent {
    private readonly _favoritesService = inject(FavoritesService);
    private readonly _router = inject(Router);

    public readonly favorites = this._favoritesService.favorites;

    public onPhotoClick(photo: IPhoto): void {
        this._router.navigate(['/photos', photo.id]);
    }
}
