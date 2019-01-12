import { Directive, HostBinding, Input, ElementRef } from "@angular/core";
@Directive({
  selector: "[seatmapSeatUnit]"
})
export class SeatUnitGridDirective {
  @Input()
  set unit([unit, price]) {
    if (unit) {
      const multiplier = 17;

      const x = unit.x;
      let y = unit.y * multiplier;
      const width = unit.width;
      const height = unit.height * multiplier;

      if (unit.set % 2 === 0) {
        y += this.spacingBySet
          .filter(spacing => spacing.set % 2 === 0 && spacing.set <= unit.set)
          .reduce((offset, spacing) => {
            offset += spacing.offset;
            return offset;
          }, 0);
      } else {
        y += this.spacingBySet
          .filter(spacing => spacing.set % 2 === 1 && spacing.set <= unit.set)
          .reduce((offset, spacing) => {
            offset += spacing.offset;
            return offset;
          }, 0);
      }

      const columnStart = x + 1;
      const columnEnd = x + 1 + width;
      const rowStart = y + 1;
      const rowEnd = y + 1 + height;

      this.unitType = unit.type;

      this.columnStart = columnStart;
      this.columnEnd = columnEnd;
      this.rowStart = rowStart;
      this.rowEnd = rowEnd;

      this.msColumnStart = columnStart;
      this.msColumnEnd = unit.width;
      this.msRowStart = rowStart;
      this.msRowEnd = unit.height;

      if (unit.availability === "Unavailable") {
        this.classes = "unit seat unavailable";
      }

      if (unit.availability === "HeldForThisSession") {
        this.classes = "unit seat held";
      }

      this.setUnitContent(unit, price);
    }
  }

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

  constructor(private elementRef: ElementRef) {}

  setUnitContent(unit, price: string): void {
    this.elementRef.nativeElement.innerHTML = `
      ${unit.set}
    `;
  }

  spacingBySet = [
    { set: 1, offset: 0 },
    { set: 2, offset: 15 },
    { set: 3, offset: 12 },
    { set: 4, offset: 12 },
    { set: 5, offset: 12 },
    { set: 6, offset: 12 },
    { set: 7, offset: 12 },
    { set: 8, offset: 12 },
    { set: 9, offset: 10 }
  ];
}
