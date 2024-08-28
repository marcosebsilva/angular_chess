import { Component, computed, Signal } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { PieceComponent } from '../piece/piece.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { GameManagerService } from '../../services/game-manager.service';
import { Board } from '../../core/types';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TileComponent, PieceComponent, CdkDropListGroup],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameManagerService],
})
export class BoardComponent {
  constructor(private gameManager: GameManagerService) {}
  board: Signal<Board> = computed(() => this.gameManager.getBoard());
  highlightedTiles: Signal<number[]> = computed(() => this.gameManager.getHighlightedTiles());
  
  tileShouldBeBlack(index: number){
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row + col) % 2 == 1
  }
}
