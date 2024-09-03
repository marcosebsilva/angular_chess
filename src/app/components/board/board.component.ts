import { Component, computed } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { PieceComponent } from '../piece/piece.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { GameManagerService } from '../../services/game-manager.service';
import { AlgebraicParser } from '../../core/AlgebraicParser';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TileComponent, PieceComponent, CdkDropListGroup, HistoryComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameManagerService],
})
export class BoardComponent {
  constructor(private gameManager: GameManagerService) {}
  board = computed(() => this.gameManager.getBoard());
  feedback = computed(() => this.gameManager.getFeedback());

  history = computed(() =>
    AlgebraicParser.parseHistory(this.gameManager.getMoveHistory())
  );

  tileShouldBeBlack(index: number) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row + col) % 2 == 1;
  }
}
