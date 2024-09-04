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

export const BoardBorders = {
  LEFT: [0, 8, 16, 24, 32, 40, 48, 56],
  RIGHT: [7, 15, 23, 31, 39, 47, 55, 63],
  DOWN: [0, 1, 2, 3, 4, 5, 6, 7],
  UP: [56, 57, 58, 59, 60, 61, 62, 63],
};


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
