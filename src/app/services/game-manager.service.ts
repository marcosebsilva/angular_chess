import { Injectable, signal } from '@angular/core';
import { BoardFactoryService } from './board-factory.service';
import { Board, Move, Piece } from '../core/types';
import { MoveValidator } from '../core/validators/MoveValidator';
import { StateValidator } from '../core/validators/StateValidator';
import { Colors } from '../core/enums';

@Injectable()
export class GameManagerService {
  private board = signal<Board>([]);
  private moveHistory = signal<Move[]>([]);
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
    if (StateValidator.isKingInCheck(color, this.getBoard())) {
      this.updateFeedback('you will get checked during this castle');
    }

    const kingIndex = color == Colors.BLACK ? 60 : 4;
    const rookIndex = kingIndex + (side == 'king' ? 3 : -4);
    const newKingIndex = kingIndex + (side == 'king' ? 2 : -2);
    const newRookIndex = kingIndex + (side == 'king' ? 1 : -1);
    
    this.changeTurn();
    this.registerMove([
      {
        from: kingIndex,
        to: newKingIndex,
        isCastle: true,
        castleSide: side,
      },
      {
        from: rookIndex,
        to: newRookIndex,
        isCastle: true,
        castleSide: side,
      },
    ]);
  }

  public movePiece(from: number, to: number) {
    const board = this.getBoard();

    try {
      MoveValidator.validateMove(from, to, this.getTurn(), board);
      const isCastle =
        board[from]?.getName() == 'king' && Math.abs(from - to) == 2;
      if (isCastle) {
        this.handleCastling(
          this.currentTurnColor(),
          from - to > 0 ? 'queen' : 'king'
        );
        return;
      }

      this.changeTurn();
      this.registerMove({ from, to, isCastle: false, castleSide: null, });
    } catch (error: unknown) {
      this.updateFeedback((error as Error).message);
    }
  }

  private registerMove (
    move:
      | Omit<Move, 'piece' | 'capturedPiece' | 'isCheckmate' | 'isCheck'>
      | Omit<Move, 'piece' | 'capturedPiece'| 'isCheckmate' | 'isCheck'>[]
  ) {
    if (Array.isArray(move)) {
      move.forEach((m) => this.registerMove(m));
      return;
    }

    const currBoard = this.getBoard();
    const { from, to } = move;

    if (currBoard[from] == null) return;

    const piece = currBoard[from] as Piece;
    const capturedPiece = currBoard[to];

    this.board.update((board) => {
      board[to] = board[from];
      board[from] = null;

      if (piece.getName() == 'pawn') {
        piece.finalizeMove(from, to);
      }

      return [...board];
    });

    const isCheck = StateValidator.isKingInCheck(this.getTurn(), this.getBoard());
    const isCheckmate = StateValidator.isCheckmate(this.getTurn(), this.getBoard());

    if(isCheckmate) {
      alert('Checkmate!')
    }

    this.moveHistory.update((prev) => [
      ...prev,
      {
        from,
        to,
        piece,
        isCheck,
        isCheckmate,
        capturedPiece,
        isCastle: move.isCastle,
        castleSide: move.castleSide || null,
      },
    ]);

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

  public getMoveHistory() {
    return this.moveHistory();
  }
}
