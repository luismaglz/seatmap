import { Directive, HostBinding, Input, ElementRef } from "@angular/core";
@Directive({
  selector: "[seatmapUnit]"
})
export class UnitGridDirective {
  @Input() set match(match) {
    this.matchDesign = match;
    this.calculateUnit();
  }

  @Input() spacingBySet;

  @Input()
  set multiplier(mult: number) {
    this._multiplier = mult;
    this.calculateUnit();
  }
  _multiplier;
  matchDesign = false;
  _unit;

  @Input()
  set unit(unit) {
    this._unit = unit;
    this.calculateUnit();
  }

  _classes = ["unit"];

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
  classes: string;

  @HostBinding("attr.unit-type")
  unitType: string;

  wingTemplate = ``;
  luggageTemplate = `<mat-icon>work</mat-icon>`;
  exitTemplate = `<div><div>`;
  compartmentTemplate = `<mat-icon>build</mat-icon>`;
  lavatoryTemplate = `<mat-icon>wc</mat-icon>`;
  constructor(private elementRef: ElementRef) {}

  calculateUnit() {
    if (this._unit && this.spacingBySet) {
      const multiplier = this.matchDesign ? this._multiplier : 1;

      const x = this._unit.x;
      let y = this._unit.y * multiplier;
      const width = this._unit.width;
      const height = this._unit.height * multiplier;

      if (this.matchDesign) {
        if (this._unit.type === "Aisle") {
          y += this.spacingBySet.aisle.filter(spacing => spacing.set <= this._unit.set)
          .reduce((offset, spacing) => { offset += spacing.offset; return offset; }, 0);
        } else {
          if (this._unit.set % 2 === 0) {
            y += this.spacingBySet.seats
              .filter(
                spacing =>
                  spacing.set % 2 === 0 &&
                  spacing.set <= this._unit.set
              )
              .reduce((offset, spacing) => {
                offset += spacing.offset;
                return offset;
              }, 0);
          } else {
            y += this.spacingBySet.seats
              .filter(
                spacing =>
                  spacing.set % 2 === 1 &&
                  spacing.set <= this._unit.set
              )
              .reduce((offset, spacing) => {
                offset += spacing.offset;
                return offset;
              }, 0);
          }
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

      this._classes.push(`rotate${(this._unit as any).angle}`);
      this._classes.push(this._unit.type.toLowerCase());
      this.setUnitContent(this._unit);
      this.classes = this._classes.join(" ");
    }
  }

  setUnitContent(unit): void {
    let content = "";
    if (unit.type) {
      switch (unit.type) {
        case "Wing": {
          content = this.wingTemplate;
          if ((unit as any).angle === 0) {
            this._classes.push("left-wing");
          }
          if ((unit as any).angle === 180) {
            this._classes.push("right-wing");
          }
          break;
        }
        case "Luggage": {
          content = this.luggageTemplate;
          this._classes.push("unit-area");

          break;
        }
        case "Exit": {
          content = this.exitTemplate;
          break;
        }
        case "Aisle": {
          content = `<div>${unit.y + 1}</div>`;
          break;
        }
        case "Compartment": {
          content = this.compartmentTemplate;
          this._classes.push("unit-area");

          break;
        }
        case "Lavatory": {
          content = this.lavatoryTemplate;
          this._classes.push("unit-area");
        }
      }
    }
    this.elementRef.nativeElement.innerHTML = content;
  }
}
