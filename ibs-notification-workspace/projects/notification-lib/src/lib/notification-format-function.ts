export interface NotificationFormatFunction {
  (message: string, type: 'success' | 'error' | 'warning'): string
}
