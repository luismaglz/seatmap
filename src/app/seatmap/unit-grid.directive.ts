import { Directive, HostBinding, Input, ElementRef } from '@angular/core';
@Directive({
  selector: '[seatmapUnit]'
})
export class UnitGridDirective {
  @Input()
  set unit(unit) {
    if (unit) {
      const multiplier = 1;
      const columnStart = (unit.x * multiplier) + 1;
      const columnEnd = (unit.x * multiplier) + 1 + (unit.width * multiplier);
      const rowStart = (unit.y * multiplier) + 1;
      const rowEnd = (unit.y * multiplier) + 1 + (unit.height * multiplier);

      this.unitType = unit.type;

      this.columnStart = columnStart;
      this.columnEnd = columnEnd;
      this.rowStart = rowStart;
      this.rowEnd = rowEnd;

      this.msColumnStart = columnStart;
      this.msColumnEnd = unit.width;
      this.msRowStart = rowStart;
      this.msRowEnd = unit.height;

      if (unit.availability === 'Unavailable') {
        this._classes.push('unavailable');
      }

      if (unit.availability === 'HeldForThisSession') {
        this._classes.push('held');
      }

      this._classes.push(`rotate${(unit as any).angle}`);
      this._classes.push(unit.type.toLowerCase());
      this.setUnitContent(unit);
      this.classes = this._classes.join(' ');
    }
  }

  _classes = ['unit'];

  @HostBinding('style.grid-column-start')
  columnStart: number;
  @HostBinding('style.grid-column-end')
  columnEnd: number;
  @HostBinding('style.grid-row-start')
  rowStart: number;
  @HostBinding('style.grid-row-end')
  rowEnd: number;

  // ms specific
  @HostBinding('style.-ms-grid-column')
  msColumnStart: number;
  @HostBinding('style.-ms-grid-column-span')
  msColumnEnd: number;
  @HostBinding('style.-ms-grid-row')
  msRowStart: number;
  @HostBinding('style.-ms-grid-row-span')
  msRowEnd: number;
  @HostBinding('class')
  classes: string;

  @HostBinding('attr.unit-type')
  unitType: string;

  wingTemplate = ``;
  luggageTemplate = `<mat-icon>work</mat-icon>`;
  exitTemplate = `<mat-icon>exit_to_app</mat-icon>`;
  compartmentTemplate = `<mat-icon>build</mat-icon>`;
  lavatoryTemplate = `<mat-icon>wc</mat-icon>`;
  constructor(private elementRef: ElementRef) { }

  setUnitContent(unit): void {
    let content = '';
    if (unit.type) {
      switch (unit.type) {
        case 'Wing': {
          content = this.wingTemplate;
          if ((unit as any).angle === 0) {
            this._classes.push('left-wing');
          }
          if ((unit as any).angle === 180) {
            this._classes.push('right-wing');
          }
          break;
        }
        case 'Luggage': {
          content = this.luggageTemplate;
          this._classes.push('unit-area');

          break;
        }
        case 'Exit': {
          content = this.exitTemplate;
          break;
        }
        case 'Compartment': {
          content = this.compartmentTemplate;
          this._classes.push('unit-area');

          break;
        }
        case 'Lavatory': {
          content = this.lavatoryTemplate;
          this._classes.push('unit-area');
        }
      }
    }
    this.elementRef.nativeElement.innerHTML = content;
  }
}
