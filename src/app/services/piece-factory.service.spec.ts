import { TestBed } from '@angular/core/testing';

import { PieceFactoryService } from './piece-factory.service';

describe('PieceFactoryService', () => {
  let service: PieceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
