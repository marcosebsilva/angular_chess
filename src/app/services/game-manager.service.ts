import { Injectable, signal } from '@angular/core';
import { BoardFactoryService } from './board-factory.service';
import { Board, Colors, Move } from '../core/types';
import { MoveValidator } from '../core/validators/MoveValidator';
import { StateValidator } from '../core/validators/StateValidator';

@Injectable()
export class GameManagerService {
  private board = signal<Board>([]);
  private moveHistory: Move[] = [];
  private currentTurnColor = signal<Colors>(Colors.WHITE);
  private feedback = signal<string>('');

  constructor(private boardFactory: BoardFactoryService) {
    this.board.set(this.boardFactory.createStarterBoard());
  }

  private updateFeedback(message: string) {
    this.feedback.set(message);
  }

  public getFeedback() {
    return this.feedback();
  }

  private handleCastling(color: Colors, side: 'king' | 'queen') {
    if(StateValidator.isKingInCheck(color, this.getBoard())) {
      this.updateFeedback('you will get checked during this castle');
    };

    let kingIndex;
    switch (color) {
      case Colors.WHITE:
        kingIndex = side == 'king' ? 4 : 60;
        break;
      case Colors.BLACK:
        kingIndex = side == 'king' ? 60 : 4;
    }

    const rookIndex = kingIndex + (side == 'king' ? 3 : -4);
    const newKingIndex = kingIndex + (side == 'king' ? 2 : -2);
    const newRookIndex = kingIndex + (side == 'king' ? 1 : -1);

    this.registerMove([
      {
        from: kingIndex,
        to: newKingIndex,
      },
      {
        from: rookIndex,
        to: newRookIndex,
      },
    ]);
    this.changeTurn();
  }

  public movePiece(from: number, to: number) {
    const board = this.getBoard();

    try {
      MoveValidator.validateMove(from, to, this.getTurn(), board);
      const isCastle =
        board[from]?.getName() == 'king' && Math.abs(from - to) == 2;
      if (isCastle) {
        this.handleCastling(this.currentTurnColor(), from - to > 0 ? 'queen' : 'king');
        return;
      }
  
      this.registerMove({ from, to });
      this.changeTurn();

      if(StateValidator.isKingInCheck(this.getTurn(), this.getBoard())) {
        if(StateValidator.isCheckmate(this.getTurn(), this.getBoard())) {
          this.updateFeedback('Checkmate!');
        }
      }
    } catch (error: unknown) {
      this.updateFeedback((error as Error).message);
    }
  }

  private registerMove(
    move: { from: number; to: number } | { from: number; to: number }[]
  ) {
    if (Array.isArray(move)) {
      move.forEach((m) => {
        this.registerMove({ from: m.from, to: m.to });
      });
      return;
    }

    const currBoard = this.getBoard();
    const { from, to } = move;

    if (currBoard[from] == null) return;

    this.board.update((board) => {
      board[to] = board[from];
      board[from] = null;

      board[to]?.finalizeMove();
      return [...board];
    });

    this.moveHistory.push({
      from,
      to,
      piece: currBoard[from],
      capturedPiece: currBoard[to],
    });

    this.feedback.set('');
  }

  private changeTurn() {
    if (this.currentTurnColor() == Colors.WHITE) {
      this.currentTurnColor.set(Colors.BLACK);
      return;
    }

    this.currentTurnColor.set(Colors.WHITE);
  }

  public getTurn(): Colors {
    return this.currentTurnColor();
  }

  public getBoard() {
    return this.board();
  }
}
