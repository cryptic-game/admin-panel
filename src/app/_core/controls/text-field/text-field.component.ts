import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'control-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: [ './text-field.component.scss' ]
})
export class TextFieldComponent implements OnInit {

  @Input()
  idField: AbstractControl;

  @Input()
  valueField: AbstractControl;

  @Input()
  values: { id: string, name: string }[];

  currentValues: { id: string, name: string }[];

  ngOnInit(): void {
    if (this.values) {
      this.valueField.valueChanges.subscribe(value => {
        if (!value) {
          this.currentValues = [];
          this.idField.reset();
        } else {
          const searchString = value.toLowerCase();
          this.currentValues = this.values.filter(currentValue => currentValue.name.toLowerCase().includes(searchString));
          if (this.currentValues.length === 1) {
            this.idField.setValue(this.currentValues[0].id);
          } else {
            this.idField.reset();
          }
        }
      });
    }
  }

  select(value: { id: string, name: string }): void {
    this.idField.setValue(value.id);
    this.valueField.setValue(value.name);
  }

  trackBy(index: number, item: { id: string }): string {
    return item.id;
  }

  get selected(): boolean {
    return this.currentValues.length === 1
      && this.currentValues[0].id === this.idField.value
      && this.currentValues[0].name === this.valueField.value;
  }
}
