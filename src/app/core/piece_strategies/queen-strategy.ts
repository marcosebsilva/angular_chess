import { Directions } from "../types";
import { SlidingPieceStrategy } from "./sliding-piece-strategy";

export class QueenStrategy extends SlidingPieceStrategy {
    constructor() {
        super(Directions);
    }
}