import { CdkDragDrop, CdkDropList  } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { PieceComponent } from "../piece/piece.component";
import { GameControllerService } from '../../services/game-controller.service';
import { TileContent } from '../../core/models/types';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CdkDropList, PieceComponent, CdkDropList],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})

export class TileComponent {
  @Input({required: true}) color!: string;
  @Input({required: true}) index!: number;
  @Input({required: true}) content!: TileContent;

  constructor(private gameController: GameControllerService){}
  
  drop(event: CdkDragDrop<number>) {
    this.gameController.movePiece(event.previousContainer.data, this.index);  
  }
}
