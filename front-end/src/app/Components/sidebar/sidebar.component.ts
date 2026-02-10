import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{

  @Input() isOpen: boolean = false;
  @Output() changeOpen = new EventEmitter<boolean>();
  userName: string | undefined;
  constructor(private authService : AuthService) {
    this.userName = this.authService.user?.name;
  }
  closeSideBar() {
    this.changeOpen.emit(false);
    this.isOpen = false;
  }
}