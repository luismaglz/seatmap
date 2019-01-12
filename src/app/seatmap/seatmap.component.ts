import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { seatmap } from './seatmap-data';

@Component({
  selector: 'app-seatmap',
  templateUrl: './seatmap.component.html',
  styleUrls: ['./seatmap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeatmapComponent implements OnInit {

  _seatmap;

  constructor() { }

  ngOnInit() {
    this._seatmap = seatmap.seatMaps['TlYhMTE1NiEgITYzNjc5NjA4MDAwMDAwMDAwMCFTTEMhREVO'];

    console.log(this._seatmap);
  }

}