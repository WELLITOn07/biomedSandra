import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAccordionModule, TuiMarkerIconModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [
    TuiButtonModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiButtonModule,
  ],
  exports: [
    TuiButtonModule,
    TuiAccordionModule,
    TuiSvgModule,
    TuiMarkerIconModule,
    TuiButtonModule,
  ]
})
export class TaigaUiModule {}
