import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiMarkerIconModule } from '@taiga-ui/kit';

@NgModule({
  imports: [TuiButtonModule, TuiSvgModule, TuiMarkerIconModule],
  exports: [TuiButtonModule, TuiSvgModule, TuiMarkerIconModule],
})
export class TaigaUiModule {}
