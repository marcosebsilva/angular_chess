import { Injectable } from '@angular/core';
import { BoardFactoryService } from './board-factory.service';
import { Board, Colors, IPiece, Move } from '../core/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GameManagerService {
  private boardSubject: BehaviorSubject<Board>;
  public boardObservable: Observable<Board>;
  private moveHistory: Move[] = []
  private currentTurnoColor: Colors = Colors.WHITE;

  constructor(
    private boardFactory: BoardFactoryService,
  ) {
    this.boardSubject = new BehaviorSubject(this.boardFactory.createBoard());
    this.boardObservable = this.boardSubject.asObservable();
  }

  /**TODO: implement this function */
  private verifyCheck(color: Colors, board: Board = this.boardSubject.getValue()): boolean {
    return false;
  }

  private getPieceIndex(piece: IPiece) {
    return this.getBoard().indexOf(piece);
  }

  private handleError(message: string){
    console.log(message);
  }
 

  public movePiece(from: number, to: number) {
    /**TODO: fix the return to show a error of some kind */
    const board = this.getBoard();
    // source tile has no piece
    if (board[from] == null) {
      this.handleError("There is no piece in this tile");
      return
    };
    // piece in source dont belong to player
    if (board[from].getColor() !== this.currentTurnoColor) {
      this.handleError("This piece does not belong to" + this.currentTurnoColor);
      return
    };
    // destination piece is from the same player
    if (board[from] !== null && board[to]?.getColor() == this.currentTurnoColor) {
      this.handleError("You can't move to a tile with a piece of the same color");
      return;
    } 
    
    // destination is not a legal move 
    if(!board[from].getMoves(from, board).includes(to)) {
      this.handleError("This is not a legal move");
      return;
    }

    const newBoard = board.slice();
    newBoard[to] = newBoard[from];
    newBoard[from] = null;

    // check if the move puts the player in check
    // those are called pseudo-legal moves
    if (this.verifyCheck(this.currentTurnoColor, newBoard)) return;

    this.registerMove({
      from,
      to,
      piece: board[from],
      capturedPiece: board[to]
    })

    this.changeTurn();
    this.boardSubject.next(newBoard);
  }

  private changeTurn() {
    if(this.currentTurnoColor == Colors.WHITE) {
      this.currentTurnoColor = Colors.BLACK;
      return;
    }

    this.currentTurnoColor = Colors.WHITE;
  }

  private registerMove(move: Move) {
    this.moveHistory.push(move);
  }

  public getBoard() {
    return this.boardSubject.getValue();
  }
}
