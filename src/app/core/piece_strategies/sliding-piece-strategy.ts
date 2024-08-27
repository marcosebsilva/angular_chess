import {
  Board,
  BoardBorders,
  Directions,
  GetMovesStrategy,
  IPiece,
} from '../types';

export abstract class SlidingPieceStrategy implements GetMovesStrategy {
  constructor(
    private directions: Partial<Record<keyof typeof Directions, number>>
  ) {}
  execute(piece: IPiece, currPosition: number, board: Board): number[] {
    const moves = new Set<number>();

    const isOccupiedByFriendly = (index: number) =>
      board[index]?.getColor() === piece.getColor();

    const isOutOfBounds = (index: number) => index < 0 || index > 63;

    // REFACTOR: there is some type gymnastics to avoid code duplication
    // this should probably be refactored
    for (const [direction, offset] of Object.entries(this.directions)) {
      const isOnBorder = (position: number) => {
        // this is a hack to handle diagonal directions 
        const parsedDirection = direction.split('_').pop();

        return BoardBorders[parsedDirection as keyof typeof BoardBorders].includes(
          position
        );
      };

      if (isOnBorder(currPosition)) {
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
