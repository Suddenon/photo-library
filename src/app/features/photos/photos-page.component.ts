import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    OnDestroy,
    signal,
    ViewChild,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { IPhoto } from '../../core/models/photo.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { PhotoApiService } from '../../core/services/photo-api.service';

const PAGE_SIZE = 9;

@Component({
    selector: 'app-photos-page',
    imports: [MatProgressSpinnerModule, MatIconModule],
    templateUrl: './photos-page.component.html',
    styleUrl: './photos-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosPageComponent implements AfterViewInit, OnDestroy {
    @ViewChild('sentinel', { static: false }) private _sentinel!: ElementRef<HTMLElement>;

    public readonly photos = signal<IPhoto[]>([]);
    public readonly loading = signal<boolean>(false);
    public readonly initialLoading = signal<boolean>(true);
    public readonly favoritesService = inject(FavoritesService);

    private readonly _photoApiService = inject(PhotoApiService);
    private readonly _destroyRef = inject(DestroyRef);
    private _observer!: IntersectionObserver;

    constructor() {
        this.loadMoreImages(false);
    }

    public ngAfterViewInit(): void {
        this.initObserver();
    }

    private initObserver(): void {
        if (!this._sentinel) return;

        this._observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.loadMoreImages();
                }
            },
            {
                rootMargin: '150px',
            },
        );

        this._observer.observe(this._sentinel.nativeElement);
    }

    private loadMoreImages(withDelay = true): void {
        if (this.loading()) return;

        this.loading.set(true);

        this._photoApiService
            .getPhotos(PAGE_SIZE, withDelay)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((data) => {
                this.photos.update((prev) => [...prev, ...data]);
                this.loading.set(false);
                this.initialLoading.set(false);
            });
    }

    public onPhotoClick(photo: IPhoto): void {
        this.favoritesService.addToFavorites(photo);
    }

    public ngOnDestroy(): void {
        this._observer?.disconnect();
    }
}
