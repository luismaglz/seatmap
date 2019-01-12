import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { seatmap } from "./seatmap-data";

@Component({
  selector: "app-seatmap",
  templateUrl: "./seatmap.component.html",
  styleUrls: ["./seatmap.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SeatmapComponent implements OnInit {
  multiplier = 34;

  _seatmap;
  matchDesign = true;
  constructor() {}

  ngOnInit() {
    this._seatmap =
      seatmap.seatMaps["TlYhMTE1NiEgITYzNjc5NjA4MDAwMDAwMDAwMCFTTEMhREVO"];

    const compartment = this._seatmap.seatMap.decks["1"].compartments.F;
    const units = this._seatmap.seatMap.decks["1"].compartments.F.units;
    for (let x = 0; x < compartment.length ; x++) {
      units.push(this.createAisleUnit(x));
    }
  }

  change() {
    this.matchDesign = !this.matchDesign;
    console.log(this.matchDesign);
  }

  createAisleUnit(row: number) {
    return {
      angle: 0,
      assignable: false,
      availability: "Unknown",
      compartmentDesignator: "F",
      designator: "$7",
      group: 0,
      height: 1,
      priority: 0,
      set: row,
      setVacancy: 0,
      text: null,
      type: "Aisle",
      unitKey: null,
      width: 1,
      x: 4,
      y: row,
      zone: 0,
      properties: []
    };
  }

  spacingBySet = {
    seats: [
      { set: 1, offset: 0 },
      { set: 2, offset: 30 },
      { set: 3, offset: 24 },
      { set: 4, offset: 24 },
      { set: 5, offset: 24 },
      { set: 6, offset: 24 },
      { set: 7, offset: 24 },
      { set: 8, offset: 24 },
      { set: 9, offset: 20 },
      { set: 11, offset: 9 },
      { set: 12, offset: -19 },
      { set: 13, offset: 9 },
      { set: 14, offset: 14 },
      { set: 15, offset: 10 },
      { set: 16, offset: 14 },
      { set: 17, offset: 10 },
      { set: 18, offset: 14 },
      { set: 19, offset: 10 },
      { set: 20, offset: 12 },
      { set: 21, offset: 10 },
      { set: 22, offset: 13 },
      { set: 23, offset: 10 },
      { set: 24, offset: 14 },
      { set: 25, offset: 10 },
      { set: 26, offset: 14 },
      { set: 27, offset: 24 },
      { set: 28, offset: 18 },
      { set: 29, offset: 18 },
      { set: 30, offset: 17 }
    ],
    aisle: [
      { set: 0, offset: 5 },
      { set: 1, offset: 25 },
      { set: 2, offset: 25 },
      { set: 3, offset: 25 },
      { set: 4, offset: 15 },
      { set: 5, offset: 5 },
      { set: 6, offset: 10 },
      { set: 7, offset: 8 },
      { set: 8, offset: 8 },
      { set: 9, offset: 15 },
      { set: 10, offset: 10 },
      { set: 11, offset: 10 },
      { set: 12, offset: 10 },
      { set: 13, offset: 25 },
      { set: 14, offset: 15 },
      { set: 15, offset: 10 }
    ]
  };
}
