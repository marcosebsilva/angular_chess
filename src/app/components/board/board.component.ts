import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { PieceComponent } from '../piece/piece.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { GameControllerService } from '../../services/game-controller.service';
import { TileContent } from '../../core/models/types';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TileComponent, PieceComponent, CdkDropListGroup],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameControllerService]
  
})
export class BoardComponent {
  constructor(
    private gameController: GameControllerService,
  ){
    this.gameController.board.subscribe((board) => {
      this.board = board;
    })
  }

  board: TileContent[] = [];

  defineTileColor(index: number){
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row + col) % 2 == 1 ? '#C3A082' : '#F2E1C3';
  }
}