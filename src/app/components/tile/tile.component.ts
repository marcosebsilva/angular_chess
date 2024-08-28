import { CdkDragDrop, CdkDropList  } from '@angular/cdk/drag-drop';
import { Component, computed, Input } from '@angular/core';
import { PieceComponent } from "../piece/piece.component";
import { GameManagerService } from '../../services/game-manager.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CdkDropList, PieceComponent, CdkDropList, NgClass],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})

export class TileComponent {
  @Input({required: true}) index!: number;

  constructor(private gameManager: GameManagerService){}

  isBlack = computed(() => {
    const row = Math.floor(this.index / 8);
    const col = this.index % 8;
  
    return (row + col) % 2 == 1;
  });

  isHighlighted = computed(() => {
    return this.gameManager.getHighlightedTiles().includes(this.index);
  })

  piece = computed(() => {
    return this.gameManager.getBoard()[this.index];
  });

  drop(event: CdkDragDrop<number>) {
    const from = event.previousContainer.data;
    const to = event.container.data;

    this.gameManager.movePiece(from, to);
    this.gameManager.clearHighlightedSquares(); 
  }

  highlightSquares(){
    const piece = this.piece();
    if(!piece) return;
    
    const board = this.gameManager.getBoard();
    const legalMoves = piece.getMoves(this.index, board);
    this.gameManager.setHighlightedTiles(legalMoves);
  }
}
