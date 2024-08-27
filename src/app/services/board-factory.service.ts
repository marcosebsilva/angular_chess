import { Injectable } from '@angular/core';
import { PieceFactoryService } from './piece-factory.service';
import { Board, Colors } from '../core/types';

@Injectable({
  providedIn: 'root'
})
export class BoardFactoryService {

  constructor(
    public pieceFactory: PieceFactoryService
  ) {}

  public createBoard(): Board {
    return [
      // white pieces
      this.pieceFactory.createRook(Colors.WHITE),
      this.pieceFactory.createKnight(Colors.WHITE),
      this.pieceFactory.createBishop(Colors.WHITE),
      this.pieceFactory.createQueen(Colors.WHITE),
      this.pieceFactory.createKing(Colors.WHITE),
      this.pieceFactory.createBishop(Colors.WHITE),
      this.pieceFactory.createKnight(Colors.WHITE),
      this.pieceFactory.createRook(Colors.WHITE),
      // white pawns
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      this.pieceFactory.createPawn(Colors.WHITE),
      // empty tiles
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      // black pawns
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      this.pieceFactory.createPawn(Colors.BLACK),
      // black pieces
      this.pieceFactory.createRook(Colors.BLACK),
      this.pieceFactory.createKnight(Colors.BLACK),
      this.pieceFactory.createBishop(Colors.BLACK),
      this.pieceFactory.createQueen(Colors.BLACK),
      this.pieceFactory.createKing(Colors.BLACK),
      this.pieceFactory.createBishop(Colors.BLACK),
      this.pieceFactory.createKnight(Colors.BLACK),
      this.pieceFactory.createRook(Colors.BLACK),
    ]
  }
}
