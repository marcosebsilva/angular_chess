/** A const assertion to build a ENUM-like type to be used elsewhere. */
export const ChessPieces = {
  KING: { name: 'king', code: 'K' },
  QUEEN: { name: 'queen', code: 'Q' },
  ROOK: { name: 'rook', code: 'R' },
  BISHOP: { name: 'bishop', code: 'B' },
  KNIGHT: { name: 'knight', code: 'N' },
  PAWN: { name: 'pawn', code: '' },
} as const;

export enum Colors {
  WHITE = 'white',
  BLACK = 'black',
}

export const Directions = {
  UP: 8,
  DOWN: -8,
  LEFT: -1,
  RIGHT: 1,
  UP_LEFT: 7,
  UP_RIGHT: 9,
  DOWN_LEFT: -9,
  DOWN_RIGHT: -7,
};

export enum CastleCodes {
  king = 'O-O',
  queen = 'O-O-O',
}
