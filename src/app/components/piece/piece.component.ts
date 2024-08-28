import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { TileContent } from '../../core/types';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [CdkDrag, CdkDragPlaceholder],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.scss'
})
export class PieceComponent {
  @Input({required: true}) piece!: TileContent;
  @Output() startDragging = new EventEmitter();

  dragStart(){
    this.startDragging.emit();
  }
}