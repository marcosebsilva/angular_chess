import { TestBed } from '@angular/core/testing';
import { BoardFactoryService } from './board-factory.service';

describe('BoardFactoryService', () => {
  let service: BoardFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
