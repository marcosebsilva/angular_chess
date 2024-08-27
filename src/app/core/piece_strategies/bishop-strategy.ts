import { Directions } from "../types";
import { SlidingPieceStrategy } from "./sliding-piece-strategy";

export class BishopStrategy extends SlidingPieceStrategy {
    constructor() {
        super({
            UP_LEFT: Directions.UP_LEFT,
            UP_RIGHT: Directions.UP_RIGHT,
            DOWN_LEFT: Directions.DOWN_LEFT,
            DOWN_RIGHT: Directions.DOWN_RIGHT,
        });
    }
}