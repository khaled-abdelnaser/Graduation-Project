import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-main-layout-component',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './main-main-layout-component.component.html',
  styleUrl: './main-main-layout-component.component.css'
})
export class MainMainLayoutComponentComponent {
  isOpen : boolean = false;
  openSidebar() {
    this.isOpen = !this.isOpen;
  }
}
