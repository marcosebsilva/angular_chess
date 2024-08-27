import { CdkDragDrop, CdkDropList  } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { PieceComponent } from "../piece/piece.component";
import { TileContent } from '../../core/types';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CdkDropList, PieceComponent, CdkDropList],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})

export class TileComponent implements OnInit {
  @Input({required: true}) index!: number;
  @Input({required: true}) content!: TileContent;
  style = {};

  constructor(private gameManager: GameManagerService){
    this.gameManager.highlightedTilesObservable.subscribe((tiles: number[]) => {
      this.style = {
        'background-color': tiles.includes(this.index) ? 'green' : this.getTileColor()
      }
    })
  }

  getTileColor(){
    const row = Math.floor(this.index / 8);
    const col = this.index % 8;

    return (row + col) % 2 == 1 ? '#C3A082' : '#F2E1C3';
  }
  
  drop(event: CdkDragDrop<number>) {
    const from = event.previousContainer.data;
    const to = event.container.data;

    this.gameManager.movePiece(from, to);
    this.gameManager.highlightedTilesObservable.next([]); 
  }

  highlightSquares(){
    const board = this.gameManager.getBoard();
    if(this.content == undefined) return;
    
    const legalMoves = this.content?.getMoves(this.index, board);
    this.gameManager.setHighlightedTiles(legalMoves);
  }


  ngOnInit(){
    this.style = {
      'background-color': this.getTileColor()
    }
  }
}
