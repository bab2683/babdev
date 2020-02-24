import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOrTextComponent } from '../link-or-text.component';

describe('LinkOrTextComponent', () => {
  let component: LinkOrTextComponent;
  let fixture: ComponentFixture<LinkOrTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkOrTextComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOrTextComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    component.source = {
      test: {
        link: 'https://angular.io/',
        name: 'angular'
      }
    };
    component.key = 'test';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    component.source = {
      test: {
        link: '',
        name: 'empty'
      }
    };
    component.key = 'test';

    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    component.source = {
      test: {
        link: '',
        name: 'empty'
      }
    };
    component.key = 'test2';

    expect(fixture).toMatchSnapshot();
  });
});
