import {Component, ElementRef, ViewChild} from '@angular/core';
import {Terminal} from 'xterm';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  @ViewChild('terminal', {static: true}) terminalDiv!: ElementRef;
  term!: Terminal;
  userInput: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // Настройки для терминала с фиксированным размером
    const options = {
      cursorBlink: true,                 // Мигающий курсор
      scrollback: 100,                   // Количество строк в истории (буфере прокрутки)
      disableStdin: false,               // Разрешить ввод с клавиатуры
      theme: {
        background: '#1e1e1e',           // Фон терминала
        foreground: '#ffffff',           // Цвет текста
        cursor: '#ffcc00',               // Цвет курсора
      },
      fontSize: 14,                      // Размер шрифта
      fontFamily: 'Courier New, monospace'
    };


    this.term = new Terminal();
    this.term.open(this.terminalDiv.nativeElement);

    // Устанавливаем фиксированное количество строк и столбцов
    this.term.resize(80, 24);  // 80 столбцов и 24 строки

    // Выводим приветственное сообщение
    this.term.writeln('Hello');

    // Обрабатываем ввод пользователя
    this.term.onData(e => this.handleInput(e));
  }

  handleInput(data: string): void {

    if (data === '\r') { // Если нажата клавиша Enter
      this.term.write('\r\n');  // Новая строка

      // Обрабатываем команду
      this.processCommand(this.userInput);
      this.userInput = ''; // Очищаем введенные данные
    } else if (data === '\u007F') { // Backspace
      if (this.userInput.length > 0) {
        this.userInput = this.userInput.slice(0, -1);
        this.term.write('\b \b'); // Удаляем символ с экрана
      }
    } else {
      this.userInput += data; // Добавляем введенный символ к строке
      this.term.write(data); // Отображаем символ в терминале
    }
  }

  processCommand(command: string): void {
    if (command === 'fhe orders') {
      // Запрос к бэкенду за данными
      this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe(
        (response: any) => {
          this.term.writeln('Orders:');
          this.printTable(response);
        },
        error => {
          this.term.writeln('Error fetching orders.');
        }
      );
    } else {
      this.term.writeln(`Command not found: ${command}`);
    }
  }

  // Функция для отображения данных в виде таблицы
  printTable(orders: any[]): void {
    const columnWidth = 15; // Ширина столбцов

    // Заголовки таблицы
    const headers = ['Order ID', 'Amount'];
    const separator = '+-----------------+-----------------+';
    const headerRow = `| ${headers[0].padEnd(columnWidth)} | ${headers[1].padEnd(columnWidth)} |`;

    // Печатаем заголовки и разделители
    this.term.writeln(separator);
    this.term.writeln(headerRow);
    this.term.writeln(separator);

    // Печатаем строки с данными
    orders.forEach(order => {
      const row = `| ${order.id.toString().padEnd(columnWidth)} | ${order.title.toString().padEnd(columnWidth)} |`;
      this.term.writeln(row);
    });

    // Закрывающая линия таблицы
    this.term.writeln(separator);
  }
}
