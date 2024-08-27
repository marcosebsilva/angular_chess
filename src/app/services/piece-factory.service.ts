import { Injectable } from '@angular/core';
import { ChessPieces, Colors, IPiece } from '../core/types';
import { PawnStrategy } from '../core/piece_strategies/pawn-strategy';
import { RookStrategy } from '../core/piece_strategies/rook-strategy';
import { QueenStrategy } from '../core/piece_strategies/queen-strategy';
import { BishopStrategy } from '../core/piece_strategies/bishop-strategy';

@Injectable({
  providedIn: 'root',
})

export class PieceFactoryService {
  private pawnMoveStrategy = new PawnStrategy();
  private rookMoveStrategy = new RookStrategy();
  private queenMoveStrategy = new QueenStrategy();
  private bishopMoveStrategy = new BishopStrategy();

  //TODO: implement the rest of the strategies
  private kingMoveStrategy = new PawnStrategy();
  private knightMoveStrategy = new PawnStrategy();

  public createQueen(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.QUEEN.name,
      ChessPieces.QUEEN.code,
      this.queenMoveStrategy,
    );
  }

  public createKing(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KING.name,
      ChessPieces.KING.code,
      this.kingMoveStrategy
    );
  }

  public createRook(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.ROOK.name,
      ChessPieces.ROOK.code,
      this.rookMoveStrategy
    );
  }

  public createBishop(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.BISHOP.name,
      ChessPieces.BISHOP.code,
      this.bishopMoveStrategy
    );
  }

  public createKnight(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KNIGHT.name,
      ChessPieces.KNIGHT.code,
      this.knightMoveStrategy
    );
  }

  public createPawn(color: Colors): IPiece {
    return new IPiece(color, 'pawn', '', this.pawnMoveStrategy);
  }
}
