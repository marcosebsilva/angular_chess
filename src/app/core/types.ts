export type TileContent = null | IPiece

/** A 2D array representing the 8x8 chess board. */
export type Board = TileContent[]

/** A const assertion to build a ENUM-like type to be used elsewhere. */
export const ChessPieces = {
    KING: { name: 'king', code: 'k' },
    QUEEN: { name: 'queen', code: 'q' },
    ROOK: { name: 'rook', code: 'r' },
    BISHOP: { name: 'bishop', code: 'b' },
    KNIGHT: { name: 'knight', code: 'n' },
    PAWN: { name: 'pawn', code: '' },
} as const;

export enum Colors {
    WHITE = 'white',
    BLACK = 'black',
}

export abstract class GetPseudoLegalMovesStrategy {
    public abstract execute(piece: IPiece, currPosition: number, board: Board): number[];
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
}

export class IPiece {
    public icon: string;
    constructor(
        private color: Colors,
        private name: string,
        private code: string,
        public getPseudoLegalMovesStrategy: GetPseudoLegalMovesStrategy,
    ){
        this.icon = `assets/svg/chess_pieces/${color}_${name}.svg`
    }

    setMoveStrategy(strategy: GetPseudoLegalMovesStrategy): void {
        this.getPseudoLegalMovesStrategy = strategy;
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

    getMoves(currPosition: number, board: Board): number[] {
        return this.getPseudoLegalMovesStrategy.execute(this, currPosition, board);
    }  
}

export interface Move {
    from: number,
    to: number,
    piece: IPiece,
    capturedPiece: IPiece | null
}