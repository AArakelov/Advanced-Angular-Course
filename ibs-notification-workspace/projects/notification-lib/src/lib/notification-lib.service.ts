import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NOTIFICATION_FORMAT_TOKEN} from './notification-format.token';
import {NotificationFormatFunction} from './notification-format-function';

@Injectable({
  providedIn: 'root'
})
export class NotificationLibService {

  private _notificationSubject = new BehaviorSubject<{
    message: string,
    type: 'success' | 'error' | 'warning'
  } | null>(null);

  notification$ = this._notificationSubject.asObservable()

  constructor(
    @Optional() @Inject(NOTIFICATION_FORMAT_TOKEN) private formatFnc: NotificationFormatFunction
  ) {
  }


  showSuccess(message: string) {
    const formatMessage = this.formatMessage(message, 'success')
    this._notificationSubject.next({message: formatMessage, type: 'success'})
  }

  showError(message: string) {
    const formatMessage = this.formatMessage(message, 'error')
    this._notificationSubject.next({message: formatMessage, type: 'error'})

  }

  showWarning(message: string) {
    const formatMessage = this.formatMessage(message, 'warning')
    this._notificationSubject.next({message: formatMessage, type: 'warning'})
  }

  clear() {
    this._notificationSubject.next(null)
  }

  private formatMessage(message: string, type: 'success' | 'error' | 'warning') {
    if (this.formatFnc) {
      return this.formatFnc(message, type)
    }

    return `[${type.toUpperCase()}] ${message}`
  }

}
