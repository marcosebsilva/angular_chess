import { Colors, Directions } from '../enums';
import { Board } from '../types';

export class StateValidator {
  // REFACTOR: it doesn't seem to properly validate board border moves
  public static isKingInCheck(color: Colors, board: Board): boolean {
    const king = board.find(
      (piece) => piece?.getName() == 'king' && piece.getColor() == color
    );
    if (!king) return false;

    const kingIndex = board.indexOf(king);

    const isOutOfBounds = (index: number) => index < 0 || index > 63;

    let isInCheck = false;

    // check for knights
    const knightOffsets = [-17, -15, -10, -6, 6, 10, 15, 17];
    knightOffsets.forEach((offset) => {
      const target = kingIndex + offset;
      if (isOutOfBounds(target)) return;
      if (
        board[target]?.getName() == 'knight' &&
        board[target]?.getColor() !== color
      ) {
        isInCheck = true;
      }
    });

    // all the other pieces
    Object.values(Directions).forEach((offset) => {
      for (let index = 1; !isOutOfBounds(index); index++) {
        const target = kingIndex + offset * index;

        if (isOutOfBounds(target)) break;
        if (board[target] == null) continue;
        if (board[target]?.getColor() == color) break;
        if (board[target]?.getMoves(target, board).includes(kingIndex)) {
          isInCheck = true;
          break;
        }
      }
    });

    return isInCheck;
  }

  public static isCheckmate(color: Colors, board: Board): boolean {
    const pieces = board.filter((piece) => piece?.getColor() == color);

    for (const piece of pieces) {
      if (!piece) continue;
      const moves = piece.getMoves(board.indexOf(piece), board);
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = piece;
        newBoard[board.indexOf(piece)] = null;

        if (!this.isKingInCheck(color, newBoard)) {
          return false;
        }
      }
    }

    return true;
  }
}
