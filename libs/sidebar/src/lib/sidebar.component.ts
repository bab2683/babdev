import { AnimationEvent } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest, fromEvent, Observable, of } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { overlayAnimation, sidebarTranslateAnimation } from './sidebar.animations';
import { SidebarPosition, SidebarStatus } from './sidebar.enum';
import { determineEvent, getTouchDirection } from './sidebar.utils';

@Component({
  selector: 'babdev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [overlayAnimation, sidebarTranslateAnimation]
})
export class SidebarComponent implements OnInit {
  @Input() public withOverlay: boolean = true;
  @Input() public initialState: SidebarStatus = SidebarStatus.CLOSE;
  @Input() public withTouch: boolean = true;
  @Input() public initialPosition: SidebarPosition = SidebarPosition.LEFT;
  @Output() public currentStatus: EventEmitter<SidebarStatus> = new EventEmitter();

  public sidebarStatus = SidebarStatus;
  public isClose$: Observable<boolean>;
  public sidebarClasses$: Observable<string[]>;
  public state$: Observable<SidebarStatus>;
  public closeButtonIconId: IconDefinition = faTimes;

  private position: SidebarPosition;
  private status: SidebarStatus;
  private moving: boolean = false;
  private classPrefix: string = 'babdev-sidebar--';
  private sidebarStaticClasses: string[] = [];
  private stateSubject: BehaviorSubject<SidebarStatus> = new BehaviorSubject(null);

  constructor() {
    this.state$ = this.stateSubject.asObservable();
    this.isClose$ = this.state$.pipe(map(status => status === this.sidebarStatus.CLOSE));
    this.sidebarClasses$ = this.state$.pipe(
      switchMap(status => {
        return of([
          ...this.sidebarStaticClasses,
          status === this.sidebarStatus.OPEN
            ? `${this.classPrefix}open`
            : `${this.classPrefix}close`
        ]);
      })
    );
  }

  public ngOnInit(): void {
    this.updateState(this.initialState);
    this.position = this.initialPosition;
    if (this.withTouch) {
      this.attachTouchEvents();
    }
  }

  public open(): void {
    if (this.status === SidebarStatus.CLOSE) {
      this.updateState(this.sidebarStatus.OPENING);
    }
  }
  public close(): void {
    if (this.status === SidebarStatus.OPEN) {
      this.updateState(this.sidebarStatus.CLOSING);
    }
  }

  public animationComplete({ toState }: AnimationEvent): void {
    switch (toState) {
      case this.sidebarStatus.OPENING:
        this.updateState(this.sidebarStatus.OPEN);
        break;

      case this.sidebarStatus.CLOSING:
        this.updateState(this.sidebarStatus.CLOSE);
        break;
    }
  }

  private attachTouchEvents(): void {
    combineLatest(this.touchEventListener('touchstart'), this.touchEventListener('touchmove'))
      .pipe(
        debounceTime(50),
        tap(([start, end]) => {
          const direction = getTouchDirection(start, end);
          const eventToTrigger = determineEvent(direction, this.position);

          eventToTrigger === SidebarStatus.OPEN ? this.open() : this.close();
        })
      )
      .subscribe();
  }

  private touchEventListener(event: string): Observable<Touch> {
    return fromEvent<TouchEvent>(document, event).pipe(
      filter(() => !this.moving),
      map(ev => ev.touches[0])
    );
  }

  private updateState(status: SidebarStatus): void {
    this.status = status;
    this.moving = status === SidebarStatus.CLOSING || status === SidebarStatus.OPENING;
    this.currentStatus.emit(status);
    this.stateSubject.next(status);
  }
}
