import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<null>();
  @Input() btnText: string;
  @Input() btnClass: string;
  @Input() iconUrl: string;
  @Input() cardIndex: number;
  @Input() addState: boolean;
  @Input() editing: boolean;
  @Input() visible: boolean;
  displayIcon: boolean

  constructor() { }

  ngOnInit(): void {
  }
  
  apiCall = () => {
    this.onSubmit.emit();
  }
}
