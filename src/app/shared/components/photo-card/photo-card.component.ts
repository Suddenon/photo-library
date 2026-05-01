import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IPhoto } from '../../../core/models/photo.model';

@Component({
    selector: 'app-photo-card',
    imports: [],
    templateUrl: './photo-card.component.html',
    styleUrl: './photo-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent {
    public readonly photo = input.required<IPhoto>();
    public readonly photoClick = output<IPhoto>();

    public onClick(): void {
        this.photoClick.emit(this.photo());
    }
}
