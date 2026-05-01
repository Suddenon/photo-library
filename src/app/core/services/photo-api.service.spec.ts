import { TestBed } from '@angular/core/testing';
import { PhotoApiService } from './photo-api.service';
import { firstValueFrom } from 'rxjs';

describe('PhotoApiService', () => {
    let service: PhotoApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PhotoApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return correct number of photos', async () => {
        const photos = await firstValueFrom(service.getPhotos(9, false));
        expect(photos.length).toBe(9);
    });

    it('should return photos with id and url', async () => {
        const photos = await firstValueFrom(service.getPhotos(3, false));
        photos.forEach((photo) => {
            expect(photo.id).toBeTruthy();
            expect(photo.url).toContain('picsum.photos');
        });
    });

    it('should return unique photo ids', async () => {
        const photos = await firstValueFrom(service.getPhotos(9, false));
        const ids = photos.map((p) => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(9);
    });

    it('should return photos without delay when withDelay is false', async () => {
        const start = Date.now();
        await firstValueFrom(service.getPhotos(9, false));
        const elapsed = Date.now() - start;
        expect(elapsed).toBeLessThan(100);
    });
});
