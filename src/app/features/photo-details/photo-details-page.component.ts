import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
    selector: 'app-photo-details-page',
    imports: [],
    templateUrl: './photo-details-page.component.html',
    styleUrl: './photo-details-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsPageComponent {
    private readonly _route = inject(ActivatedRoute);
    private readonly _favoritesService = inject(FavoritesService);
    private readonly _location = inject(Location);
    private readonly _router = inject(Router);
    private readonly _id = this._route.snapshot.paramMap.get('id')!;

    public readonly photo = computed(() =>
        this._favoritesService.favorites().find((p) => p.id === this._id),
    );

    constructor() {
        if (!this._favoritesService.isInFavorites(this._id)) {
            this._router.navigate(['/favorites']);
        }
    }

    public onRemove(): void {
        this._favoritesService.removeFromFavorites(this._id);
        this._location.back();
    }
}
