import {
  Board,
  BoardBorders,
  Directions,
  GetMovesStrategy,
  IPiece,
} from '../types';

export class RookStrategy implements GetMovesStrategy {
  execute(piece: IPiece, currPosition: number, board: Board): number[] {
    const moves = new Set<number>();
    
    const possibleDirections = {
      UP: Directions.UP,
      DOWN: Directions.DOWN,
      LEFT: Directions.LEFT,
      RIGHT: Directions.RIGHT,
    };
    
    const isOccupiedByFriendly = (index: number) =>
      board[index]?.getColor() === piece.getColor();
    
    const isOutOfBounds = (index: number) => index < 0 || index > 63;
    
    // REFACTOR: there is some type gymnastics to avoid code duplication
    // this should probably be refactored
    for (const [direction, offset] of Object.entries(possibleDirections)) {
      const isOnBorder = (position: number) =>
        BoardBorders[direction as keyof typeof BoardBorders].includes(position);
      
      if(isOnBorder(currPosition)) {
        continue;
      }
      
      let index = currPosition + offset;

      while (!isOutOfBounds(index) && !isOccupiedByFriendly(index)) {
        if (isOnBorder(index)) {
          moves.add(index);
          break;
        }

        moves.add(index);

        if (board[index] != null) break;

        index += offset;
      }
    }

    return Array.from(moves);
  }
}
