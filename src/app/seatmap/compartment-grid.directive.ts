import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
  selector: '[seatmapGridCompartment]'
})
export class CompartmentGridDirective {
  @Input() set match(match){
    this.matchDesign = match;
    this.updateCompartment();
  };


  @Input()
  set multiplier(mult:number){
    this._multiplier = mult;
    this.updateCompartment();
  }
  _multiplier;

  @Input()
  set compartment(compartment) {
    this._compartment = compartment;
    this.updateCompartment();
  }

  matchDesign = false;
  _compartment;

  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string;

  @HostBinding('style.grid-template-rows')
  gridTemplateRows: string;

  @HostBinding('style.-ms-grid-columns')
  msgridTemplateColumns: string;

  @HostBinding('style.-ms-grid-rows')
  msgridTemplateRows: string;

  constructor(protected domSanitizer: DomSanitizer) {

  }

  updateCompartment() {
    if (this._compartment) {
      const multiplier = this.matchDesign ? this._multiplier : 1;
      const adjustedCompartmentLength = (this._compartment.length + 8) * multiplier;

      const seatHeight = 34;

      const side = '4px'
      const seat = `${seatHeight}px`;
      const aisle = '23px';

      const comparmentLength = [];
      for (let l = 0; l < adjustedCompartmentLength; l++) {
        comparmentLength.push(`${seatHeight / multiplier}px`);
      }

      this.gridTemplateRows = comparmentLength.join(' ');

      const compartmentWidth = [side, seat, seat, seat, aisle, seat, seat, seat, side];
      this.gridTemplateColumns = compartmentWidth.join(' ');

      this.msgridTemplateColumns = this.gridTemplateColumns;
      this.msgridTemplateRows = this.gridTemplateRows;
    }
  }
}