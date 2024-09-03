import { Component, computed } from '@angular/core';
import { AlgebraicParser } from '../../core/AlgebraicParser';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor(private gameManager: GameManagerService) {}
  history = computed(() =>
    AlgebraicParser.parseHistory(this.gameManager.getMoveHistory())
  );
}
