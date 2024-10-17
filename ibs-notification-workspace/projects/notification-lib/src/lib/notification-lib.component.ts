import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {NotificationLibService} from './notification-lib.service';

@Component({
  selector: 'lib-notification-lib',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  template: `
    <div [ngClass]="type" class="notification" *ngIf="true">
      <span class="message">{{ message }}</span>
      <button class="btn-close" (click)="onClick()"></button>
    </div>
  `,
  styles: `
    .notification {
      padding: 15px;
      margin: 10px;
      border-radius: 5px;
      position: relative;
    }

    .success {
      color: #3c76;
      background-color: #dff0d8;
    }

    .error {
      background-color: #f5eccd;
      color: #a94442;
    }

    .warning {
      background-color: #eee6ce;
      color: #8a6d3b;
    }

    .btn-close {
      position: absolute;
      right: 10px;
      top: 10px;
      border: none;
      cursor: pointer;
    }
  `
})
export class NotificationLibComponent implements OnInit {
  message: string | null = null;
  type: 'success' | 'error' | 'warning' = 'success'

  constructor(private notificationService: NotificationLibService) {
  }

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      if (notification) {
        this.message = notification.message;
        this.type = notification.type
      } else {
        this.message = null
      }
    })

  }

  onClick() {
    this.notificationService.clear()
  }
}
