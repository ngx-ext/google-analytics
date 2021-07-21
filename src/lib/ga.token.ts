import { InjectionToken } from '@angular/core';
import { TrackingOptions } from './interfaces/tracking-options';

export const GA_TOKEN = new InjectionToken<string>('Google Analytics TrackingId');
export const GA_OPTIONS = new InjectionToken<TrackingOptions | string>('Google Analytics Tracking Options');
