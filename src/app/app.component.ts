import { Component } from '@angular/core';
import CSS_COLOR_NAMES from 'src/cssColors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Autocomplete';
  selectedCountries = [];
  selectedColors = [];
  preSelectedColors = ['red', 'green'];
  disabledSelectedColors = ['brown', 'black', 'white'];
  cssAvailableColors = CSS_COLOR_NAMES;



  addNewItem() {
    this.cssAvailableColors.push("rashed");
    // store the item in new copy for reactivity system to recognize it 
    this.cssAvailableColors = this.cssAvailableColors.slice();
  }
}
