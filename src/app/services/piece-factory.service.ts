import { Injectable } from '@angular/core';
import { ChessPieces, Colors, IPiece } from '../core/types';
import { PawnStrategy } from '../core/piece_strategies/pawn-strategy';
import { RookStrategy } from '../core/piece_strategies/rook-strategy';
import { QueenStrategy } from '../core/piece_strategies/queen-strategy';
import { BishopStrategy } from '../core/piece_strategies/bishop-strategy';
import { KingStrategy } from '../core/piece_strategies/king-strategy';
import { KnightStrategy } from '../core/piece_strategies/knight-strategy';

@Injectable({
  providedIn: 'root',
})
export class PieceFactoryService {
  static pawnMoveStrategy = new PawnStrategy();
  static rookMoveStrategy = new RookStrategy();
  static queenMoveStrategy = new QueenStrategy();
  static bishopMoveStrategy = new BishopStrategy();
  static kingMoveStrategy = new KingStrategy();
  static knightMoveStrategy = new KnightStrategy();

  public createQueen(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.QUEEN.name,
      ChessPieces.QUEEN.code,
      PieceFactoryService.queenMoveStrategy,
    );
  }

  public createKing(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KING.name,
      ChessPieces.KING.code,
      PieceFactoryService.kingMoveStrategy
    );
  }

  public createRook(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.ROOK.name,
      ChessPieces.ROOK.code,
      PieceFactoryService.rookMoveStrategy
    );
  }

  public createBishop(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.BISHOP.name,
      ChessPieces.BISHOP.code,
      PieceFactoryService.bishopMoveStrategy
    );
  }

  public createKnight(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KNIGHT.name,
      ChessPieces.KNIGHT.code,
      PieceFactoryService.knightMoveStrategy
    );
  }

  public createPawn(color: Colors): IPiece {
    return new IPiece(color, 'pawn', '', PieceFactoryService.pawnMoveStrategy);
  }
}
