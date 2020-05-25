import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentServiceMock } from '@babdev/layout-testing';

import { ClickableActions } from '../../enums';
import { DynamicComponentService } from '../../services';
import { ClickableDirective } from './clickable.directive';

describe('ClickableDirective', () => {
  let directive: ClickableDirective;
  let fixture: ComponentFixture<ClickableDirective>;
  let serviceMock: DynamicComponentServiceMock;

  beforeEach(() => {
    serviceMock = new DynamicComponentServiceMock();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClickableDirective],
      providers: [
        {
          provide: DynamicComponentService,
          useValue: serviceMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableDirective);
    directive = fixture.componentInstance;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  describe('on init', () => {
    it('should call the service', () => {
      directive.clickableActions = [
        {
          type: ClickableActions.COPY
        },
        {
          type: ClickableActions.MAIL
        },
        {
          type: ClickableActions.HYPERLINK
        }
      ];
      directive.ngOnInit();
      expect(serviceMock.addComponentToRef).toHaveBeenCalled();
      expect(serviceMock.addComponentToRef).toHaveBeenCalledTimes(3);
    });

    it('should not call the service if no actions are present', () => {
      directive.ngOnInit();
      expect(serviceMock.addComponentToRef).not.toHaveBeenCalled();
    });
  });
});
