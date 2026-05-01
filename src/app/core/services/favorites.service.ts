import { Injectable, signal } from '@angular/core';
import { IPhoto } from '../models/photo.model';

@Injectable({
    providedIn: 'root',
})
export class FavoritesService {
    private readonly _storageKey = 'favorites';
    private readonly _favorites = signal<IPhoto[]>(this.loadFromStorage());

    public readonly favorites = this._favorites.asReadonly();

    public addToFavorites(photo: IPhoto): void {
        if (this.isInFavorites(photo.id)) return;

        this._favorites.update((list) => [...list, photo]);
        this.saveToStorage();
    }

    public removeFromFavorites(id: string): void {
        this._favorites.update((list) => list.filter((p) => p.id !== id));
        this.saveToStorage();
    }

    public isInFavorites(id: string): boolean {
        return this._favorites().some((p) => p.id === id);
    }

    private saveToStorage(): void {
        localStorage.setItem(this._storageKey, JSON.stringify(this._favorites()));
    }

    private loadFromStorage(): IPhoto[] {
        const raw: string | null = localStorage.getItem(this._storageKey);
        return raw ? (JSON.parse(raw) as IPhoto[]) : [];
    }
}
