import { Colors, ChessPieces, Directions } from "../enums";
import { SlidingPiece } from "./sliding-piece";

export class Rook extends SlidingPiece {
  private hasMoved = false;
  constructor(color: Colors) {
    super(color, ChessPieces.ROOK.name, ChessPieces.ROOK.code, {
      UP: Directions.UP,
      DOWN: Directions.DOWN,
      LEFT: Directions.LEFT,
      RIGHT: Directions.RIGHT,
    });
  }

  override finalizeMove(): void {
    this.hasMoved = true;
  }

  getHasMoved() {
    return this.hasMoved;
  }
}