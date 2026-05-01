import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCardComponent } from './photo-card.component';
import { IPhoto } from '../../../core/models/photo.model';

const mockPhoto: IPhoto = { id: '1', url: 'https://picsum.photos/seed/1/300/300' };

describe('PhotoCardComponent', () => {
    let component: PhotoCardComponent;
    let fixture: ComponentFixture<PhotoCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoCardComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('photo', mockPhoto);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render photo image', () => {
        const img = fixture.nativeElement.querySelector('img');
        expect(img.src).toContain(mockPhoto.url);
    });

    it('should emit photoClick on click', () => {
        const emitSpy = vi.fn();
        component.photoClick.subscribe(emitSpy);

        const card = fixture.nativeElement.querySelector('.card');
        card.click();

        expect(emitSpy).toHaveBeenCalledWith(mockPhoto);
    });
});
