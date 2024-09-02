import { Injectable } from '@angular/core';
import { Board, Colors } from '../core/types';
import { Pawn } from '../core/pieces/pawn';
import { Bishop } from '../core/pieces/bishop';
import { King } from '../core/pieces/king';
import { Knight } from '../core/pieces/knight';
import { Queen } from '../core/pieces/queen';
import { Rook } from '../core/pieces/rook';

@Injectable({
  providedIn: 'root'
})
export class BoardFactoryService {
  public createStarterBoard(): Board {
    return [
      // white pieces
      new Rook(Colors.WHITE),
      new Knight(Colors.WHITE),
      new Bishop(Colors.WHITE),
      new Queen(Colors.WHITE),
      new King(Colors.WHITE),
      new Bishop(Colors.WHITE),
      new Knight(Colors.WHITE),
      new Rook(Colors.WHITE),
      // white pawns
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      new Pawn(Colors.WHITE),
      // empty tiles
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      // black pawns
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      new Pawn(Colors.BLACK),
      // black pieces
      new Rook(Colors.BLACK),
      new Knight(Colors.BLACK),
      new Bishop(Colors.BLACK),
      new Queen(Colors.BLACK),
      new King(Colors.BLACK),
      new Bishop(Colors.BLACK),
      new Knight(Colors.BLACK),
      new Rook(Colors.BLACK),
    ]
  }
}
