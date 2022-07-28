import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Output() onChangeText = new EventEmitter<string>();
  @Output() onChangeNumber = new EventEmitter<number>();
  @Output() onEnableEditing = new EventEmitter();

  @Input() inputType: 'number' | 'text';
  @Input() field: string;
  @Input() loc: string;
  @Input() addState: boolean;
  @Input() inputClass: string;
  @Input() disabled: boolean;


  rando = Math.random();

  constructor() { }
  ngOnInit(): void {
  }


  setField(text: Event) {
    this.onChangeText.emit((text.target as HTMLInputElement).value);
  }

  setCount(num: Event) {
    this.onChangeNumber.emit(parseInt((num.target as HTMLInputElement).value))
  }

  enableEditing() {
    this.onEnableEditing.emit();
    alert('ENABLED')
  }






}
