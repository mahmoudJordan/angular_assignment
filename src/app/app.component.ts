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
  preSelectedColors = ['red' , 'green'];
  cssAvailableColors = CSS_COLOR_NAMES;
}
