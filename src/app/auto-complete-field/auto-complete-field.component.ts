import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const AUTO_COMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteFieldComponent),
  multi: true,
};

@Component({
  selector: 'auto-complete-field',
  templateUrl: './auto-complete-field.component.html',
  styleUrls: ['./auto-complete-field.component.scss'],
  providers: [AUTO_COMPLETE_VALUE_ACCESSOR]
})
export class AutoCompleteFieldComponent implements ControlValueAccessor {

  // reference to access the input field element
  @ViewChild('inputElement') inputElement: any;

  // array of suggestions
  @Input() suggestions: string[] = [];

  // placeholder text
  @Input() placeholder: string = "";


  // disabled attribute
  @Input() disabled: boolean = false;

  // this unique id is for the input datalist
  // id is required for the suggestions datalist to appear under the input field
  // I'll generate a unique id for each instance of this component to prevent collisions
  _uniqueId: string;

  // internal selected values
  _value: string[] = [];

  // wrappers for the interface implementations
  onChange!: ((arg0: any) => void);
  onTouch!: ((arg0: any) => void);

  constructor() {
    this._uniqueId = this.generateUniqueId(10);
  }


  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onEnter($event: any) {
    this.addToChips($event?.target.value);
  }


  addToChips(toBeAdded: string) {
    if (toBeAdded && this._value.indexOf(toBeAdded) == -1) {
      this._value.push(toBeAdded);
      this.onChange(this._value);
      const input = this.inputElement.nativeElement;
      input.value = "";
    }
  }


  dataListClicked($event: any) {
    // to know whether the input occurred because of the suggestion item click , not the user keydown
    var isInputEvent = (Object.prototype.toString.call($event).indexOf("InputEvent") > -1);
    if (!isInputEvent) {
      this.addToChips($event.target.value);
    }
  }

  removeFromChips(removed: string) {
    if (!this.disabled) {
      // update the internal array
      this._value = this._value.filter(x => x != removed)

      // trigger change notifier
      this.onChange(this._value);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    const input = this.inputElement.nativeElement;
    if (isDisabled) {
      input.setAttribute("disabled", true)
    }
    else {
      input.removeAttribute("disabled");
    }
  }


  // this function will be used to generate unique id for each instance of autocomplete field input
  // the purpose of this function is to prevent id collisions when the component appear more than once
  generateUniqueId(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  get nonSelectedSuggestions() {
    return this.suggestions.filter(s => !this._value?.includes(s))
  }

}
