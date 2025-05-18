import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @Input() options: any[] = [];
  @Input() valueOption: string = '';
  @Input() labelOption: string = '';
  @Input() placeholder: string = 'Seleccion una opción'
  @Output() select = new EventEmitter<any>();


  isOpen = false;
  selectOption: any = {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  chooseOption(option: any) {
    this.selectOption = option;
    this.select.emit(option[this.valueOption]);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-wrapper')) {
      this.isOpen = false;
    }
  }

}
