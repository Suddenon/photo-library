import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';
import { FavoritesService } from '../../core/services/favorites.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { IPhoto } from '../../core/models/photo.model';

const mockPhotos: IPhoto[] = [
    { id: '1', url: 'https://picsum.photos/seed/1/300/300' },
    { id: '2', url: 'https://picsum.photos/seed/2/300/300' },
];

describe('FavoritesPageComponent', () => {
    let component: FavoritesPageComponent;
    let fixture: ComponentFixture<FavoritesPageComponent>;
    let favoritesServiceMock: Partial<FavoritesService>;
    let routerMock: Partial<Router>;

    beforeEach(async () => {
        favoritesServiceMock = {
            favorites: signal<IPhoto[]>(mockPhotos).asReadonly(),
        };

        routerMock = {
            navigate: vi.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [FavoritesPageComponent],
            providers: [
                { provide: FavoritesService, useValue: favoritesServiceMock },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoritesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display favorites from service', () => {
        expect(component.favorites()).toEqual(mockPhotos);
    });

    it('should navigate to photo details on click', () => {
        component.onPhotoClick(mockPhotos[0]);
        expect(routerMock.navigate).toHaveBeenCalledWith(['/photos', '1']);
    });

    it('should show empty state when no favorites', async () => {
        await TestBed.resetTestingModule();
        await TestBed.configureTestingModule({
            imports: [FavoritesPageComponent],
            providers: [
                {
                    provide: FavoritesService,
                    useValue: { favorites: signal<IPhoto[]>([]).asReadonly() },
                },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FavoritesPageComponent);
        fixture.detectChanges();

        const empty = fixture.nativeElement.querySelector('.empty');
        expect(empty).toBeTruthy();
    });
});
