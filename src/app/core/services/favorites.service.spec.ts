import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { IPhoto } from '../models/photo.model';

const mockPhoto: IPhoto = { id: '1', url: 'https://picsum.photos/seed/1/300/300' };

describe('FavoritesService', () => {
    let service: FavoritesService;

    beforeEach(() => {
        localStorage.clear();

        TestBed.configureTestingModule({});
        service = TestBed.inject(FavoritesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add photo to favorites', () => {
        service.addToFavorites(mockPhoto);
        expect(service.favorites()).toContain(mockPhoto);
    });

    it('should not add duplicate photo', () => {
        service.addToFavorites(mockPhoto);
        service.addToFavorites(mockPhoto);
        expect(service.favorites().length).toBe(1);
    });

    it('should remove photo from favorites', () => {
        service.addToFavorites(mockPhoto);
        service.removeFromFavorites(mockPhoto.id);
        expect(service.favorites()).not.toContain(mockPhoto);
    });

    it('should return true if photo is in favorites', () => {
        service.addToFavorites(mockPhoto);
        expect(service.isInFavorites(mockPhoto.id)).toBe(true);
    });

    it('should return false if photo is not in favorites', () => {
        expect(service.isInFavorites(mockPhoto.id)).toBe(false);
    });

    it('should persist favorites to localStorage', () => {
        service.addToFavorites(mockPhoto);
        const stored = JSON.parse(localStorage.getItem('favorites')!);
        expect(stored).toEqual([mockPhoto]);
    });

    it('should load favorites from localStorage on init', () => {
        localStorage.setItem('favorites', JSON.stringify([mockPhoto]));

        const newService = new FavoritesService();
        expect(newService.favorites()).toEqual([mockPhoto]);
    });
});
