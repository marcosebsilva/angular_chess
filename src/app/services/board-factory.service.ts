import { Injectable } from '@angular/core';
import { PieceFactoryService } from './piece-factory.service';
import { Board } from '../core/models/types';

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
      this.pieceFactory.createRook('white'),
      this.pieceFactory.createKnight('white'),
      this.pieceFactory.createBishop('white'),
      this.pieceFactory.createQueen('white'),
      this.pieceFactory.createKing('white'),
      this.pieceFactory.createBishop('white'),
      this.pieceFactory.createKnight('white'),
      this.pieceFactory.createRook('white'),
      // white pawns
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      this.pieceFactory.createPawn('white'),
      // empty tiles
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      // black pawns
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createPawn('black'),
      this.pieceFactory.createRook('black'),
      // black pieces
      this.pieceFactory.createKnight('black'),
      this.pieceFactory.createBishop('black'),
      this.pieceFactory.createQueen('black'),
      this.pieceFactory.createKing('black'),
      this.pieceFactory.createBishop('black'),
      this.pieceFactory.createKnight('black'),
      this.pieceFactory.createRook('black'),
    ]
  }
}
