import { Directive, HostBinding, Input, ElementRef } from "@angular/core";
@Directive({
  selector: "[seatmapSeatUnit]"
})
export class SeatUnitGridDirective {


  @Input()
  set unit([unit, price]) {
    this._unit = unit;
    this.calculateUnit();
  }

  @Input() set match(match){
    this.matchDesign = match;
    this.calculateUnit();
  };

  @Input() spacingBySet;

  @Input()
  set multiplier(mult:number){
    this._multiplier = mult;
    this.calculateUnit();
  }
  _multiplier;
  matchDesign = false;
  _unit;


  @HostBinding("style.grid-column-start")
  columnStart: number;
  @HostBinding("style.grid-column-end")
  columnEnd: number;
  @HostBinding("style.grid-row-start")
  rowStart: number;
  @HostBinding("style.grid-row-end")
  rowEnd: number;

  // ms specific
  @HostBinding("style.-ms-grid-column")
  msColumnStart: number;
  @HostBinding("style.-ms-grid-column-span")
  msColumnEnd: number;
  @HostBinding("style.-ms-grid-row")
  msRowStart: number;
  @HostBinding("style.-ms-grid-row-span")
  msRowEnd: number;
  @HostBinding("class")
  classes = "unit seat";

  @HostBinding("attr.unit-type")
  unitType: string;

  constructor(private elementRef: ElementRef) { }

  calculateUnit(){
    if (this._unit && this.spacingBySet) {
      const multiplier = this.matchDesign ? this._multiplier : 1;

      const x = this._unit.x;
      let y = this._unit.y * multiplier;
      const width = this._unit.width;
      const height = this._unit.height * multiplier;

      if (this.matchDesign) {
        if (this._unit.set % 2 === 0) {
          y += this.spacingBySet.seats
            .filter(spacing => spacing.set % 2 === 0 && spacing.set <= this._unit.set)
            .reduce((offset, spacing) => {
              offset += spacing.offset;
              return offset;
            }, 0);
        } else {
          y += this.spacingBySet.seats
            .filter(spacing => spacing.set % 2 === 1 && spacing.set <= this._unit.set)
            .reduce((offset, spacing) => {
              offset += spacing.offset;
              return offset;
            }, 0);
            console.log(y);
        }
      }

      const columnStart = x + 1;
      const columnEnd = x + 1 + width;
      const rowStart = y + 1;
      const rowEnd = y + 1 + height;

      this.unitType = this._unit.type;

      this.columnStart = columnStart;
      this.columnEnd = columnEnd;
      this.rowStart = rowStart;
      this.rowEnd = rowEnd;

      this.msColumnStart = columnStart;
      this.msColumnEnd = this._unit.width;
      this.msRowStart = rowStart;
      this.msRowEnd = this._unit.height;

      if (this._unit.availability === "Unavailable") {
        this.classes = "unit seat unavailable";
      }

      if (this._unit.availability === "HeldForThisSession") {
        this.classes = "unit seat held";
      }

      if (this._unit.group === 2) {
        this.classes = "unit seat group-2";
      }

      if (this._unit.group === 3) {
        this.classes = "unit seat group-3";
      }

      this.setUnitContent(this._unit, '0');
    }
  }

  setUnitContent(unit, price: string): void {
    this.elementRef.nativeElement.innerHTML = `
      ${unit.set}
    `;
  }

  
}
