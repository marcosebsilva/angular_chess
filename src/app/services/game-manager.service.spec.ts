import { TestBed } from '@angular/core/testing';
import { GameManagerService } from './game-manager.service';

describe('BoardManagerService', () => {
  let service: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
