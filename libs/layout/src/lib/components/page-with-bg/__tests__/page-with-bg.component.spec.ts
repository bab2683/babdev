import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackGroundPositionXEnum, BackGroundPositionYEnum } from '../../../enum';
import { PageWithBgComponent } from '../page-with-bg.component';

describe('PageWithBgComponent', () => {
  let component: PageWithBgComponent;
  let fixture: ComponentFixture<PageWithBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageWithBgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithBgComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    component.bgPath = 'my_image_path';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    component.bgPath = 'my_image_path';
    component.bgPositionX = 10;
    component.bgPositionY = BackGroundPositionYEnum.TOP;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    component.isMobile = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
