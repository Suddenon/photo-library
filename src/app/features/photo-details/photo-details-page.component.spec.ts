import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailsPageComponent } from './photo-details-page.component';
import { FavoritesService } from '../../core/services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { signal } from '@angular/core';
import { IPhoto } from '../../core/models/photo.model';

const mockPhoto: IPhoto = { id: '1', url: 'https://picsum.photos/seed/1/300/300' };

describe('PhotoDetailsPageComponent', () => {
    let component: PhotoDetailsPageComponent;
    let fixture: ComponentFixture<PhotoDetailsPageComponent>;
    let favoritesServiceMock: Partial<FavoritesService>;
    let routerMock: Partial<Router>;
    let locationMock: Partial<Location>;

    beforeEach(async () => {
        favoritesServiceMock = {
            favorites: signal<IPhoto[]>([mockPhoto]).asReadonly(),
            isInFavorites: vi.fn().mockReturnValue(true),
            removeFromFavorites: vi.fn(),
        };

        routerMock = {
            navigate: vi.fn(),
        };

        locationMock = {
            back: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [PhotoDetailsPageComponent],
            providers: [
                { provide: FavoritesService, useValue: favoritesServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: Location, useValue: locationMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: vi.fn().mockReturnValue('1'),
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoDetailsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute photo from favorites', () => {
        expect(component.photo()).toEqual(mockPhoto);
    });

    it('should redirect to favorites if photo not in favorites', async () => {
        favoritesServiceMock.isInFavorites = vi.fn().mockReturnValue(false);

        await TestBed.resetTestingModule();
        await TestBed.configureTestingModule({
            imports: [PhotoDetailsPageComponent],
            providers: [
                { provide: FavoritesService, useValue: favoritesServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: Location, useValue: locationMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: vi.fn().mockReturnValue('1') } },
                    },
                },
            ],
        }).compileComponents();

        TestBed.createComponent(PhotoDetailsPageComponent);

        expect(routerMock.navigate).toHaveBeenCalledWith(['/favorites']);
    });

    it('should call removeFromFavorites and go back on remove', () => {
        component.onRemove();
        expect(favoritesServiceMock.removeFromFavorites).toHaveBeenCalledWith('1');
        expect(locationMock.back).toHaveBeenCalled();
    });
});
