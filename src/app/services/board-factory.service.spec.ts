import { TestBed } from '@angular/core/testing';
import { BoardFactoryService } from './board-factory.service';
import { Colors, ChessPieces } from '../core/enums';

describe('BoardFactoryService', () => {
  let service: BoardFactoryService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardFactoryService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('createStarterBoard', () => {
    describe('piece distribution', () => {
      const EXPECTED_AMOUNT_OF_TILES = 64;
      const EXPECTED_AMOUNT_OF_PIECES_PER_COLOR = 16;
      const EXPECTED_AMOUNT_OF_EMPTY_TILES = 32;
      const EXPECTED_AMOUNT_OF_PAWNS_PER_COLOR = 8;
      // i.e 2 rooks, 2 knights, 2 bishops
      const EXPECTED_AMOUNT_OF_EACH_NORMAL_PIECE_PER_COLOR = 2;
      const EXPECTED_AMOUNT_OF_KING_OR_QUEEN_PER_COLOR = 1;
      it('the board created should have 64 tiles', () => {
        const board = service.createStarterBoard();
        expect(board.length).toBe(EXPECTED_AMOUNT_OF_TILES);
      })
      it('should have 16 pieces of each color', () => {
        const board = service.createStarterBoard();
        const whitePieces = board.filter(piece => piece?.getColor() === 'white');
        const blackPieces = board.filter(piece => piece?.getColor() === 'black');
        expect(whitePieces.length).toBe(EXPECTED_AMOUNT_OF_PIECES_PER_COLOR);
        expect(blackPieces.length).toBe(EXPECTED_AMOUNT_OF_PIECES_PER_COLOR);
      })
      it('should have 32 empty tiles', () => {
        const board = service.createStarterBoard();
        const emptyTiles = board.filter(piece => piece === null);
        expect(emptyTiles.length).toBe(EXPECTED_AMOUNT_OF_EMPTY_TILES);
      })
      it('should have 8 pawns for each color', () => {
        const board = service.createStarterBoard();
        const whitePawns = board.filter(piece => piece?.getColor() === 'white' && piece?.getName() === 'pawn');
        const blackPawns = board.filter(piece => piece?.getColor() === 'black' && piece?.getName() === 'pawn');
        expect(whitePawns.length).toBe(EXPECTED_AMOUNT_OF_PAWNS_PER_COLOR);
        expect(blackPawns.length).toBe(EXPECTED_AMOUNT_OF_PAWNS_PER_COLOR);
      })
      it('should have 1 king for each color', () => {
        const board = service.createStarterBoard();
        const whiteKing = board.filter(piece => piece?.getColor() === 'white' && piece?.getName() === 'king');
        const blackKing = board.filter(piece => piece?.getColor() === 'black' && piece?.getName() === 'king');
        expect(whiteKing.length).toBe(EXPECTED_AMOUNT_OF_KING_OR_QUEEN_PER_COLOR);
        expect(blackKing.length).toBe(EXPECTED_AMOUNT_OF_KING_OR_QUEEN_PER_COLOR);
      })
      it('should have 1 queen for each color', () => {
        const board = service.createStarterBoard();
        const whiteQueen = board.filter(piece => piece?.getColor() === 'white' && piece?.getName() === 'queen');
        const blackQueen = board.filter(piece => piece?.getColor() === 'black' && piece?.getName() === 'queen');
        expect(whiteQueen.length).toBe(EXPECTED_AMOUNT_OF_KING_OR_QUEEN_PER_COLOR);
        expect(blackQueen.length).toBe(EXPECTED_AMOUNT_OF_KING_OR_QUEEN_PER_COLOR);
      })
      it('should have 2 rooks per color', () => {
        const board = service.createStarterBoard();
        const whiteRooks = board.filter(piece => piece?.getColor() === 'white' && piece?.getName() === 'rook');
        const blackRooks = board.filter(piece => piece?.getColor() === 'black' && piece?.getName() === 'rook');
        expect(whiteRooks.length).toBe(EXPECTED_AMOUNT_OF_EACH_NORMAL_PIECE_PER_COLOR);
        expect(blackRooks.length).toBe(EXPECTED_AMOUNT_OF_EACH_NORMAL_PIECE_PER_COLOR);
      })
      it('should have 2 knights per color', () => {
        const board = service.createStarterBoard();
        const whiteKnights = board.filter(piece => piece?.getColor() === 'white' && piece?.getName() === 'knight');
        const blackKnights = board.filter(piece => piece?.getColor() === 'black' && piece?.getName() === 'knight');
        expect(whiteKnights.length).toBe(EXPECTED_AMOUNT_OF_EACH_NORMAL_PIECE_PER_COLOR);
        expect(blackKnights.length).toBe(EXPECTED_AMOUNT_OF_EACH_NORMAL_PIECE_PER_COLOR);
      })
    });
    describe('piece positioning', () => {
      it('should render white pawns in the second row', () => {
        const board = service.createStarterBoard();
        const whitePawns = board.slice(8, 16);
        whitePawns.forEach(pawn => {
          expect(pawn?.getColor()).toBe(Colors.WHITE);
          expect(pawn?.getName()).toBe(ChessPieces.PAWN.name);
        })
      })
      it('should render black pawns in the seventh row', () => {
        const board = service.createStarterBoard();
        const blackPawns = board.slice(48, 56);
        blackPawns.forEach(pawn => {
          expect(pawn?.getColor()).toBe(Colors.BLACK);
          expect(pawn?.getName()).toBe(ChessPieces.PAWN.name);
        })
      })
      it('should render the rooks in the expected positions', () => {
        const board = service.createStarterBoard();
        expect(board[0]?.getName()).toBe(ChessPieces.ROOK.name)
        expect(board[0]?.getColor()).toBe(Colors.WHITE)
        expect(board[7]?.getName()).toBe(ChessPieces.ROOK.name)
        expect(board[7]?.getColor()).toBe(Colors.WHITE)

        expect(board[56]?.getName()).toBe(ChessPieces.ROOK.name)
        expect(board[56]?.getColor()).toBe(Colors.BLACK)
        expect(board[63]?.getName()).toBe(ChessPieces.ROOK.name)
        expect(board[63]?.getColor()).toBe(Colors.BLACK)
      })
      it('should render the knights in the expected positions', () => {
        const board = service.createStarterBoard();
        expect(board[1]?.getName()).toBe(ChessPieces.KNIGHT.name)
        expect(board[1]?.getColor()).toBe(Colors.WHITE)
        expect(board[6]?.getName()).toBe(ChessPieces.KNIGHT.name)
        expect(board[6]?.getColor()).toBe(Colors.WHITE)

        expect(board[57]?.getName()).toBe(ChessPieces.KNIGHT.name)
        expect(board[57]?.getColor()).toBe(Colors.BLACK)
        expect(board[62]?.getName()).toBe(ChessPieces.KNIGHT.name)
        expect(board[62]?.getColor()).toBe(Colors.BLACK)
      })
      it('should render the bishops in the expected positions', () => {
        const board = service.createStarterBoard();
        expect(board[2]?.getName()).toBe(ChessPieces.BISHOP.name)
        expect(board[2]?.getColor()).toBe(Colors.WHITE)
        expect(board[5]?.getName()).toBe(ChessPieces.BISHOP.name)
        expect(board[5]?.getColor()).toBe(Colors.WHITE)

        expect(board[58]?.getName()).toBe(ChessPieces.BISHOP.name)
        expect(board[58]?.getColor()).toBe(Colors.BLACK)
        expect(board[61]?.getName()).toBe(ChessPieces.BISHOP.name)
        expect(board[61]?.getColor()).toBe(Colors.BLACK)
      })
      it('should render the queens in the expected positions', () => {
        const board = service.createStarterBoard();
        expect(board[3]?.getName()).toBe(ChessPieces.QUEEN.name)
        expect(board[3]?.getColor()).toBe(Colors.WHITE)

        expect(board[59]?.getName()).toBe(ChessPieces.QUEEN.name)
        expect(board[59]?.getColor()).toBe(Colors.BLACK)
      })
      it('should render the kings in the expected positions', () => {
        const board = service.createStarterBoard();
        expect(board[4]?.getName()).toBe(ChessPieces.KING.name)
        expect(board[4]?.getColor()).toBe(Colors.WHITE)

        expect(board[60]?.getName()).toBe(ChessPieces.KING.name)
        expect(board[60]?.getColor()).toBe(Colors.BLACK)
      });
    });
  });
});
