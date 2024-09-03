import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, computed, Input } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { GameManagerService } from '../../services/game-manager.service';
import { NgClass } from '@angular/common';
import { StateValidator } from '../../core/validators/StateValidator';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CdkDropList, PieceComponent, CdkDropList, NgClass],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})

// REFACTOR: every single tile is being rerendered a bazillion times
export class TileComponent {
  @Input({ required: true }) index!: number;

  constructor(private gameManager: GameManagerService) {}

  isBlack = computed(() => {
    const row = Math.floor(this.index / 8);
    const col = this.index % 8;

    return (row + col) % 2 == 1;
  });

  isHighlighted = computed(() => {
    return this.gameManager.getHighlightedTiles().includes(this.index);
  });

  isLastMove = computed(() => {
    const history = this.gameManager.getMoveHistory();
    if (history.length == 0) return false;
    return (
      history.at(-1)?.to == this.index || history.at(-1)?.from == this.index
    );
  });

  highlightTiles(event: number) {
    const board = this.gameManager.getBoard();
    const piece = board[event];
    if (!piece) return;
    if (piece.getColor() !== this.gameManager.getTurn()) return;
    
    const pieceMoves = piece.getMoves(event, board).filter((move) => {
      const newBoard = [...board];
      newBoard[move] = piece;
      newBoard[event] = null;

      return !StateValidator.isKingInCheck(piece.getColor(), newBoard);
    });

    this.gameManager.highlightTiles(pieceMoves);
  }

  piece = computed(() => {
    return this.gameManager.getBoard()[this.index];
  });

  drop(event: CdkDragDrop<number>) {
    const from = event.previousContainer.data;
    const to = event.container.data;

    this.gameManager.movePiece(from, to);
    this.gameManager.clearHighlightedTiles();
  }
}
