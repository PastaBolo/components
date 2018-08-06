import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// tslint:disable:no-magic-numbers
@Component({
  selector: 'app-input-time',
  template: require('./input-time.component.html'),
  styles: [`${require('./input-time.component.less')}`]
})
export class InputTimeComponent implements OnInit {
  @Input() control: FormControl;
  @Input() placeholder: string = '08:00';
  private regExpTime = RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');

  ngOnInit(): void {
    if (!this.regExpTime.test(this.control.value)) {
      this.control.setValue(null);
    }
  }

  update(e): void {
    const prevValue = e.target.value;
    const pos = e.target.selectionStart;
    setTimeout(
      () => {
        if (e.keyCode === 37) {
          this.selectPreviousChar(e);
          return;
        }
        if (e.keyCode === 39) {
          this.selectNextChar(e);
          return;
        }
        const newValue =
          // tslint:disable-next-line:restrict-plus-operands
          prevValue.substring(0, pos) + e.key + prevValue.substring(pos + 1);
        if (!this.regExpTime.test(newValue)) {
          this.control.setValue(prevValue);
          this.selectCurrentChar(e, pos);
        } else {
          this.control.setValue(newValue);
          this.selectNextChar(e);
        }
      },
      0);
  }

  handleFocus(e): void {
    if (!e.target.value) {
      this.initInput(e);
    }
    this.selectNextChar(e);
  }

  private initInput(e): void {
    this.control.setValue(this.placeholder);
    setTimeout(() => {
      e.target.selectionStart = 0;
      e.target.selectionEnd = 1;
    },         0);
  }

  private selectNextChar(e): void {
    let newPos: number;
    const pos = e.target.selectionStart;
    if (pos === 2) {
      newPos = 3;
    } else if (pos === 5) {
      newPos = 4;
    } else {
      newPos = pos;
    }
    e.target.selectionStart = newPos;
    e.target.selectionEnd = newPos + 1;
  }

  private selectPreviousChar(e): void {
    let newPos: number;
    const pos = e.target.selectionStart;
    if (pos === 0) {
      newPos = 0;
    } else if (pos === 3) {
      newPos = 1;
    } else {
      newPos = pos - 1;
    }
    e.target.selectionStart = newPos;
    e.target.selectionEnd = newPos + 1;
  }

  private selectCurrentChar(e, pos): void {
    e.target.selectionStart = pos;
    e.target.selectionEnd = +pos + 1;
  }
}
