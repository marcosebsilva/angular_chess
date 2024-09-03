import { Colors } from "./enums";

export type TileContent = null | Piece;

/** A 2D array representing the 8x8 chess board. */
export type Board = TileContent[];


export abstract class GetPseudoLegalMovesStrategy {
  public abstract execute(
    piece: Piece,
    currPosition: number,
    board: Board
  ): number[];
}

export const BoardBorders = {
  LEFT: [0, 8, 16, 24, 32, 40, 48, 56],
  RIGHT: [7, 15, 23, 31, 39, 47, 55, 63],
  DOWN: [0, 1, 2, 3, 4, 5, 6, 7],
  UP: [56, 57, 58, 59, 60, 61, 62, 63],
};


export abstract class Piece {
  public icon: string;
  constructor(
    private color: Colors,
    private name: string,
    private code: string
  ) {
    this.icon = `assets/svg/chess_pieces/${color}_${name}.svg`;
  }

  getColor(): Colors {
    return this.color;
  }

  getName(): string {
    return this.name;
  }

  getCode(): string {
    return this.code;
  }

  getIcon(): string {
    return this.icon;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  finalizeMove(from: number, to: number): void {
    return;
  }

  abstract getMoves(currPosition: number, board: Board): number[];
}

export interface Move {
  from: number;
  to: number;
  piece: Piece;
  capturedPiece: Piece | null;
  isCheck: boolean;
  isCheckmate: boolean;
  isCastle: boolean;
  castleSide: 'king' | 'queen' | null;
}
