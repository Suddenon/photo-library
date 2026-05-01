import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render two navigation buttons', () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(2);
    });

    it('should have Photos button', () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons[0].textContent.trim()).toBe('Photos');
    });

    it('should have Favorites button', () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons[1].textContent.trim()).toBe('Favorites');
    });
});
