import { King } from '../pieces/king';
import { Rook } from '../pieces/rook';
import { Board, Colors } from '../types';
import { StateValidator } from './StateValidator';

export class MoveValidator {
  public static validateMove (
    from: number,
    to: number,
    color: Colors,
    board: Board
  ): void {
    // source tile has no piece
    if (board[from] == null) {
      throw new Error('There is no piece in this tile');
    }
    // piece in source dont belong to player
    if (board[from].getColor() !== color) {
      throw new Error('This piece does not belong to ' + color);
    }
    // destination piece is from the same player
    if (board[from] !== null && board[to]?.getColor() == color) {
      throw new Error(
        "You can't move to a tile with a piece of the same color"
      );
    }
    // destination is not a legal move
    if (!board[from].getMoves(from, board).includes(to)) {
      throw new Error('This is not a legal move');
    }
    const boardCopy = board.slice();
    boardCopy[to] = boardCopy[from];
    boardCopy[from] = null;

    // check if the move puts the player in check
    // those are called pseudo-legal moves
    if (StateValidator.isKingInCheck(color, boardCopy)) {
      throw new Error('This move will put you in check');
    }
  }

  public static validateCastle (
    color: Colors,
    side: 'king' | 'queen',
    board: Board,
  ): boolean {
    const king = board.find(
      (piece) => piece instanceof King && piece.getColor() == color
    ) as King;

    if (!king) return false;

    if (king.getHasMoved()) {
      throw new Error(`castling not allowed`);
    }

    const expectedRookIndex =
      side == 'king' ? board.indexOf(king) + 3 : board.indexOf(king) - 4;
    const rook = board[expectedRookIndex] as Rook;
    const isNotRook = !(board[expectedRookIndex] instanceof Rook);

    // checks if is not a rook
    if (rook == null || isNotRook) {
      throw new Error(`ro rook on expected position in ${side} side.`);
    }

    // checks if the rook is from the same color
    if (rook.getColor() !== color) {
      throw new Error(`rook does not belong to ${color}`);
    }

    // checks if the rook has moved
    if (rook.getHasMoved()) {
      throw new Error(`castling not allowed`);
    }

    // check if the tiles between the king and the rook are empty
    const kingIndex = board.indexOf(king);
    const isBetweenEmpty = side == 'king' ? [1, 2] : [-1, -2, -3];
    const isOccupied = isBetweenEmpty.some(
      (index) => board[kingIndex + index] != null
    );

    if (isOccupied) {
      throw new Error('Path is not clear');
    }

    // check if the king is in check
    for (let index = 1; index <= 2; index++) {
      const boardCopy = board.slice();
      boardCopy[kingIndex + index] = king;
      boardCopy[kingIndex] = null;

      if (StateValidator.isKingInCheck(color, boardCopy)) {
        throw new Error('you will get checked during this castle');
      }
    }

    return true;
  }
}
