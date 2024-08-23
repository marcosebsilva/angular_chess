import { Injectable } from '@angular/core';
import { ChessPieces, Colors, IPiece } from '../core/models/types';

@Injectable({
  providedIn: 'root',
})
export class PieceFactoryService {
  public createQueen(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.QUEEN.name,
      ChessPieces.QUEEN.code,
      [1, 7, 8, 9]
    );
  }

  public createKing(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KING.name,
      ChessPieces.KING.code,
      [1, 7, 8, 9],
      false
    );
  }

  public createRook(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.ROOK.name,
      ChessPieces.ROOK.code,
      [1, 8]
    );
  }

  public createBishop(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.BISHOP.name,
      ChessPieces.BISHOP.code,
      [7, 9]
    );
  }

  public createKnight(color: Colors): IPiece {
    return new IPiece(
      color,
      ChessPieces.KNIGHT.name,
      ChessPieces.KNIGHT.code,
      [6, 10],
      false
    );
  }

  public createPawn(color: Colors): IPiece {
    return new IPiece(color, 'pawn', '', [8], false);
  }
}
