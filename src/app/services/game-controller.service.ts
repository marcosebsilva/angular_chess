import { Injectable } from '@angular/core';
import { BoardFactoryService } from './board-factory.service';
import { Board } from '../core/models/types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameControllerService {
  private boardSubject: BehaviorSubject<Board>;
  board;
  constructor(
    private boardFactory: BoardFactoryService
  ){
    this.boardSubject = new BehaviorSubject(this.boardFactory.createBoard());
    this.board = this.boardSubject.asObservable();
  }

  public movePiece(from: number, to: number){
    if(from === to) return;
    // console.log(from, to);
    const currentBoard = this.boardSubject.getValue();
    const piece = currentBoard[from];

    currentBoard[to] = piece;
    currentBoard[from] = null;
    
    console.log(piece);

    
    this.boardSubject.next(currentBoard);
  }
}
