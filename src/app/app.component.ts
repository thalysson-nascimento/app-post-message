import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

const MaterialModule = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
];

const CoreModule = [RouterOutlet, RouterModule, CommonModule];

@Component({
  selector: 'app-root',
  imports: [...MaterialModule, ...CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'app-post-message';
  showFiller = false;
  links = ['Home', 'Message'];
  isMobile = window.innerWidth <= 480;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 480;
    this.cdRef.detectChanges(); // Força a atualização do Angular
  }
}
