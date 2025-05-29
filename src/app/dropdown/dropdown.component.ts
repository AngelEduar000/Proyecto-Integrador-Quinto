import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DropdownComponent implements OnChanges {
  @Input() options: any[] = [];
  @Input() valueOption: string = '';
  @Input() labelOption: string = '';
  @Input() placeholder: string = 'Seleccione una opción';
  @Output() select = new EventEmitter<any>();

  isOpen = false;
  selectOption: any = {};
  searchTerm: string = '';
  filteredOptions: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.filteredOptions = this.options || [];
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.filteredOptions = this.options || [];
      this.searchTerm = '';
    }
  }

  chooseOption(option: any) {
    this.selectOption = option;
    this.select.emit(option[this.valueOption]);
    this.isOpen = false;
    this.searchTerm = '';
    this.filteredOptions = this.options || [];
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option[this.labelOption]?.toLowerCase().includes(term)
    );
  }

  @HostListener('document:click', ['$event'])
  closeOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-wrapper')) {
      this.isOpen = false;
    }
  }
}
