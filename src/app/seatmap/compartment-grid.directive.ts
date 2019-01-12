import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[seatmapGridCompartment]'
})
export class CompartmentGridDirective {
  @Input()
  set compartment(compartment) {
    if (compartment) {
      const multiplier = 17;
      const adjustedCompartmentLength = (compartment.length + 4 )* multiplier;

      const seatHeight = 34;

      const side = '4px'
      const seat = `${seatHeight}px`;
      const aisle = '23px';

      const comparmentLength = [];
      for (let l = 0; l < adjustedCompartmentLength; l++) {
        comparmentLength.push(`${seatHeight / multiplier}px`);
      }

      this.gridTemplateRows = comparmentLength.join(' ');

      const compartmentWidth = [side,seat,seat,seat,aisle,seat,seat,seat,side];
      this.gridTemplateColumns = compartmentWidth.join(' ');

      this.msgridTemplateColumns = this.gridTemplateColumns;
      this.msgridTemplateRows = this.gridTemplateRows;
    }
  }

  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string;

  @HostBinding('style.grid-template-rows')
  gridTemplateRows: string;

  @HostBinding('style.-ms-grid-columns')
  msgridTemplateColumns: string;

  @HostBinding('style.-ms-grid-rows')
  msgridTemplateRows: string;

  constructor(protected domSanitizer: DomSanitizer){

  }
}