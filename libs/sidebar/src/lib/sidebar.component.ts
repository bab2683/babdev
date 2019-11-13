import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, combineLatest, fromEvent, Observable, of } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { SidebarMode, SidebarPosition, SidebarStatus } from './sidebar.enum';
import { determineEvent, getTouchDirection } from './sidebar.utils';

@Component({
  selector: 'babdev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() public withOverlay: boolean = false;
  @Input() public mode: SidebarMode = SidebarMode.SIDE;
  @Input() public openedAtInit: boolean = false;
  @Input() public withTouch: boolean = true;
  @Input() public initialPosition: SidebarPosition = SidebarPosition.LEFT;
  @Input() public touchTolerance: number = 100;
  @Output() public currentStatus: EventEmitter<SidebarStatus> = new EventEmitter();
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  public sidebarStatus = SidebarStatus;
  public sidebarClasses$: Observable<string[]>;
  public state$: Observable<SidebarStatus>;

  private position: SidebarPosition;
  private status: SidebarStatus;
  private moving: boolean = false;
  private stateSubject: BehaviorSubject<SidebarStatus> = new BehaviorSubject(null);

  constructor() {
    this.state$ = this.stateSubject.asObservable();
  }

  public ngOnInit(): void {
    this.status = this.openedAtInit ? SidebarStatus.OPEN : SidebarStatus.CLOSE;
    this.position = this.initialPosition;
    if (this.withTouch) {
      this.attachTouchEvents();
    }
  }

  public open(): void {
    if (this.status === SidebarStatus.CLOSE) {
      this.updateState(this.sidebarStatus.OPENING);
      this.sidenav.open();
    }
  }
  public close(): void {
    if (this.status === SidebarStatus.OPEN) {
      this.updateState(this.sidebarStatus.CLOSING);
      this.sidenav.close();
    }
  }

  public overlayClick(): void {
    this.updateState(SidebarStatus.CLOSING);
  }

  private attachTouchEvents(): void {
    combineLatest(this.touchEventListener('touchstart'), this.touchEventListener('touchmove'))
      .pipe(
        debounceTime(50),
        tap(([start, end]) => {
          const { direction, distance } = getTouchDirection(start, end);

          if (distance > this.touchTolerance) {
            const eventToTrigger = determineEvent(direction, this.position);

            eventToTrigger === SidebarStatus.OPEN ? this.open() : this.close();
          }
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
