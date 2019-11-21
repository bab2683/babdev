import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkDirectiveStub } from '@babdev/testing';
import { TranslatePipeMock } from '@babdev/translate-testing';

import { PageListComponent } from '../page-list.component';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageListComponent, RouterLinkDirectiveStub, TranslatePipeMock]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
