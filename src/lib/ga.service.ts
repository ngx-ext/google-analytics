import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import { interval, ReplaySubject, throwError, timer } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GA_OPTIONS, GA_TOKEN } from './ga.token';
import { Event } from './interfaces/event';
import { PageView } from './interfaces/page-view';
import { TrackingOptions } from './interfaces/tracking-options';

@Injectable()
export class GoogleAnalyticsService {
  public event: EventEmitter<Event> = new EventEmitter<Event>();
  public pageView: EventEmitter<PageView> = new EventEmitter<PageView>();
  private readonly queue: ReplaySubject<unknown[]> = new ReplaySubject();

  constructor(
    @Optional() @Inject(GA_TOKEN) trackingId: string,
    @Optional() @Inject(GA_OPTIONS) options: TrackingOptions | string,
  ) {
    if (trackingId) {
      this.configure(trackingId, options);
    }
  }

  public configure(trackingId: string, options: TrackingOptions | string = 'auto'): void {
    this.ga('create', trackingId, options);
    this.ga('send', 'pageview');

    this.event.subscribe((x: Event) => {
      this.onEvent(x);
    });

    this.pageView.subscribe((x: PageView) => {
      this.onPageView(x);
    });

    const timer$ = timer(20_000)
      .pipe(
        switchMap(() => throwError(new Error('Could not load GA'))),
      );

    interval(50)
      .pipe(
        takeUntil(timer$),
        filter(() => Boolean((window as any).ga)),
        first(),
        switchMap(() => this.queue),
        tap(args => {
          (window as any).ga(...args); // tslint:disable-line:no-unsafe-any
        }),
      )
      .subscribe();
  }

  public set(fieldsObject: any): void;
  public set(fieldName: string, fieldValue: any): void;
  public set(key: any, value?: any): void {
    if (typeof key !== 'string' && typeof key !== 'object') {
      throw new TypeError(`Expected \`fieldName\` to be of type \`string\` or \`object\`, got \`${typeof key}\``);
    }

    if (typeof key === 'string' && value === undefined) {
      throw new TypeError('Expected `fieldValue` to not be `undefined`');
    }

    if (typeof key === 'object') {
      this.ga('set', key);
    } else {
      this.ga('set', key, value);
    }
  }

  private onEvent(event: Event): void {
    this.ga('send', 'event', event.category, event.action, event.label, event.value);
  }

  private onPageView(pageview: PageView): void {
    const fieldsObject: { title?: string } = {};

    if (pageview.title) {
      fieldsObject.title = pageview.title;
    }

    this.ga('send', 'pageview', pageview.page, fieldsObject);
  }

  private ga(...args: unknown[]): void {
    this.queue.next(args);
  }
}
