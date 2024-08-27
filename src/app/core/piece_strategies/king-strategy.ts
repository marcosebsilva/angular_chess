import { Board, BoardBorders, Directions, GetMovesStrategy, IPiece } from '../types';

export class KingStrategy extends GetMovesStrategy {
  public override execute(
    piece: IPiece,
    currPosition: number,
    board: Board
  ): number[] {
    const moves = new Set<number>();
    const isOccupiedByFriendly = (index: number) =>
      board[index]?.getColor() === piece.getColor();
    const isOutOfBounds = (index: number) => index < 0 || index > 63;
    
    for (const [direction, offset] of Object.entries(Directions)) {
      const index = currPosition + offset;

      const isOnBorder = () => {
        // this is a hack to handle diagonal directions 
        const parsedDirection = direction.split('_').pop();
        
        return BoardBorders[parsedDirection as keyof typeof BoardBorders].includes(
          currPosition
        )
      };
  
      if (isOnBorder()) {
        continue;
      }

      if (isOutOfBounds(index) || isOccupiedByFriendly(index)) {
        continue;
      }

      moves.add(index);
    }

    return Array.from(moves);
  }
}
