import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@babdev/translate';
import { of } from 'rxjs';

import { AppComponent } from '../app.component';

@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  transform(key: string): any {
    return of(key);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, TranslatePipeMock],
      providers: [
        {
          provide: TranslateService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it(`should have as title 'main-angular'`, () => {
    expect(component.title).toEqual('main-angular');
  });
});
