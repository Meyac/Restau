import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent implements OnInit {
  @Output() onStateChange = new EventEmitter<any>();

  changeState() {
    this.onStateChange.emit()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
