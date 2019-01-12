import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SeatmapComponent } from './seatmap/seatmap.component';
import { CompartmentGridDirective } from './seatmap/compartment-grid.directive';
import { SeatUnitGridDirective } from './seatmap/seat-unit-grid.directive';
import { UnitGridDirective } from './seatmap/unit-grid.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, SeatmapComponent, CompartmentGridDirective, SeatUnitGridDirective, UnitGridDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
