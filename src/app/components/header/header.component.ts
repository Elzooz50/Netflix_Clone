import { Component } from '@angular/core';
import { LOGO_URL } from '../../constants/config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  logoUrl = LOGO_URL;  // Stores the logo URL from the config file for use in the template

  // Method to scroll smoothly to a specific section on the page by its ID
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);  // Find the HTML element by its ID
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });  // Scrolls the page smoothly to the element
    }
  }
}
