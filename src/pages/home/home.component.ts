import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiMarkerIconModule } from '@taiga-ui/kit';

@Component({
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiMarkerIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
