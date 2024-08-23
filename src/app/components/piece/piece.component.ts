import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { IPiece } from '../../core/models/types';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [CdkDrag, CdkDragPlaceholder],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {
  @Input({required: true}) piece!: IPiece;
}