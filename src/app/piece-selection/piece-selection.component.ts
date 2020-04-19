import { Component, OnInit } from '@angular/core';
import { PieceType } from '../common/piece-type';
import { PieceService } from '../services/piece.service';

@Component({
  selector: 'app-piece-selection',
  templateUrl: './piece-selection.component.html',
  styleUrls: ['./piece-selection.component.less']
})
export class PieceSelectionComponent implements OnInit {

  pieces: PieceType[];

  constructor(private readonly pieceService: PieceService) { }

  ngOnInit(): void {
    this.pieceService.getAvailablePieces().subscribe(result => {
      this.pieces = result;
    })
  }

  onClick(piece: PieceType){
    console.log(piece);
  }

}
