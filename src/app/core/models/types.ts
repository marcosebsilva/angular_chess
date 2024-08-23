export type TileContent = null | IPiece

/** A 2D array representing the 8x8 chess board. */
export type Board = [
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, 
    TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent, TileContent 
]

/** A const assertion to build a ENUM-like type to be used elsewhere. */
export const ChessPieces = {
    KING: { name: 'king', code: 'k' },
    QUEEN: { name: 'queen', code: 'q' },
    ROOK: { name: 'rook', code: 'r' },
    BISHOP: { name: 'bishop', code: 'b' },
    KNIGHT: { name: 'knight', code: 'n' },
    PAWN: { name: 'pawn', code: '' },
} as const;

export type Colors = 'white' | 'black'

export class IPiece {
    public icon: string;
    constructor(
        public color: Colors,
        public name: string,
        public code: string,
        public legalMoveFormulas: number[],
        public slidable = true,
    ){
        this.icon = `assets/svg/chess_pieces/${color}_${name}.svg`
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

    getLegalMoveFormulas(): number[] {
        return this.legalMoveFormulas;
    }
}
