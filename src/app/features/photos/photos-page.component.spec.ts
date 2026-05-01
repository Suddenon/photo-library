import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosPageComponent } from './photos-page.component';
import { PhotoApiService } from '../../core/services/photo-api.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { IPhoto } from '../../core/models/photo.model';

const mockPhotos: IPhoto[] = Array.from({ length: 9 }, (_, i) => ({
    id: `${i + 1}`,
    url: `https://picsum.photos/seed/${i + 1}/300/300`,
}));

describe('PhotosPageComponent', () => {
    let component: PhotosPageComponent;
    let fixture: ComponentFixture<PhotosPageComponent>;
    let photoApiServiceMock: Partial<PhotoApiService>;
    let favoritesServiceMock: Partial<FavoritesService>;

    beforeEach(async () => {
        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            value: vi.fn(function () {
                return {
                    observe: vi.fn(),
                    disconnect: vi.fn(),
                    unobserve: vi.fn(),
                };
            }),
        });

        photoApiServiceMock = {
            getPhotos: vi.fn().mockReturnValue(of(mockPhotos)),
        };

        favoritesServiceMock = {
            favorites: signal<IPhoto[]>([]).asReadonly(),
            addToFavorites: vi.fn(),
            isInFavorites: vi.fn().mockReturnValue(false),
        };

        await TestBed.configureTestingModule({
            imports: [PhotosPageComponent],
            providers: [
                { provide: PhotoApiService, useValue: photoApiServiceMock },
                { provide: FavoritesService, useValue: favoritesServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PhotosPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getPhotos on init without delay', () => {
        expect(photoApiServiceMock.getPhotos).toHaveBeenCalledWith(9, false);
    });

    it('should populate photos after loading', () => {
        expect(component.photos()).toEqual(mockPhotos);
    });

    it('should set loading to false after photos loaded', () => {
        expect(component.loading()).toBe(false);
    });

    it('should set initialLoading to false after first load', () => {
        expect(component.initialLoading()).toBe(false);
    });

    it('should call addToFavorites on photo click', () => {
        const photo = mockPhotos[0];
        component.onPhotoClick(photo);
        expect(favoritesServiceMock.addToFavorites).toHaveBeenCalledWith(photo);
    });

    it('should not call getPhotos if already loading', () => {
        component.loading.set(true);
        (photoApiServiceMock.getPhotos as ReturnType<typeof vi.fn>).mockClear();

        (component as any).loadMoreImages();

        expect(photoApiServiceMock.getPhotos).not.toHaveBeenCalled();
    });

    it('should disconnect observer on destroy', () => {
        const disconnectSpy = vi.fn();
        (component as any)._observer = { disconnect: disconnectSpy };

        component.ngOnDestroy();

        expect(disconnectSpy).toHaveBeenCalled();
    });
});
