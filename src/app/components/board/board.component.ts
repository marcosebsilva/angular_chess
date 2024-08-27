import { Component, OnDestroy } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { PieceComponent } from '../piece/piece.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { GameManagerService } from '../../services/game-manager.service';
import { Board, TileContent } from '../../core/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TileComponent, PieceComponent, CdkDropListGroup],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameManagerService],
})
export class BoardComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private gameManager: GameManagerService) {
    this.subscription.add(
      this.gameManager.boardObservable.subscribe((board: Board) => {
        this.board = board;
      })
    );
  }

  board: TileContent[] = [];

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
