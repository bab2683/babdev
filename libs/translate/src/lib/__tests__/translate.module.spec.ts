import { async, TestBed } from '@angular/core/testing';

import { TranslateModule } from '../translate.module';

describe('TranslateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TranslateModule).toBeDefined();
  });
});
