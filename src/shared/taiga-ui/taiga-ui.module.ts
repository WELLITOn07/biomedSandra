import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiMarkerIconModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiButtonModule,
  ],
  exports: [
    CommonModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiButtonModule,
  ]
})
export class TaigaUiModule {}
