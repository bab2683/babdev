import { async, TestBed } from '@angular/core/testing';

import { RequestModule } from '../request.module';

describe('RequestModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RequestModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RequestModule).toBeDefined();
  });
});
