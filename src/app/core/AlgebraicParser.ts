
import { CastleCodes, Colors } from './enums';
import { Move } from './types';

export class AlgebraicParser {
  static kingSideCastle = 'O-O';
  static queenSideCastle = 'O-O-O';
// TODO: this is getting called for every move
// maybe it shouldnt compute all values every single time
  static parseMove(move: Move, index?: number): string {
    const moveNumber = index ? `${index}. ` : '';

    if (move.isCastle) {
      const code = move.castleSide == 'king' ? CastleCodes.king : CastleCodes.queen;
      return `${moveNumber}${code}`;
    }

    const to = `${String.fromCharCode(97 + (move.to % 8))}${
      8 - Math.floor(move.to / 8)
    }`;
    const code = move.piece.getCode();
    const checkType = move.isCheckmate ? '#' : move.isCheck ? '+' : '';

    return `${moveNumber} ${code}${to}${checkType}`;
  }

  static parseHistory(history: Move[]): string[] {
    if (history.length == 0) return [];

    const result: string[] = [];
    let counter = 1;

    history.forEach((move, index) => {
      const prevMove = history[index - 1];
      const prevMovePieceColor = prevMove?.piece.getColor();
      const currentMovePieceColor = move.piece.getColor();
      
      if(prevMove?.isCastle && move.isCastle && prevMovePieceColor == currentMovePieceColor) {
        return
      }

      if (move.piece.getColor() == Colors.WHITE) {
        result.push(this.parseMove(move, counter++));
      } else {
        result[result.length - 1] += ` ${this.parseMove(move)}`;
      }
    });

    return result;
  }
}
