import {InjectionToken} from '@angular/core';
import {NotificationFormatFunction} from './notification-format-function';

export const NOTIFICATION_FORMAT_TOKEN = new InjectionToken<NotificationFormatFunction>('notification-format.toke')
