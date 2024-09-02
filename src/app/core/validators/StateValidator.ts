import { Board, Colors, Directions } from "../types";

export class StateValidator {
    public static isKingInCheck(
        color: Colors,
        board: Board,
      ): boolean {
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
}