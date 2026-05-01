import { Injectable } from '@angular/core';
import { IPhoto } from '../models/photo.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PhotoApiService {
    public getPhotos(count: number, withDelay = true): Observable<IPhoto[]> {
        const photos = Array.from({ length: count }).map(() => {
            const id = crypto.randomUUID();

            return {
                id,
                url: `https://picsum.photos/seed/${id}/300/300`,
            };
        });

        if (!withDelay) return of(photos);

        const delayMs: number = 200 + Math.floor(Math.random() * 101);

        return of(photos).pipe(delay(delayMs));
    }
}
