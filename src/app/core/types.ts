import { Colors } from "./enums";

export type TileContent = null | Piece;

export type Board = TileContent[];

export abstract class GetPseudoLegalMovesStrategy {
  public abstract execute(
    piece: Piece,
    currPosition: number,
    board: Board
  ): number[];
}



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
