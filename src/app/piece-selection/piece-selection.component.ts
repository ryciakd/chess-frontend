import { Component, OnInit } from '@angular/core';
import { PieceType } from '../common/piece-type';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-piece-selection',
  templateUrl: './piece-selection.component.html',
  styleUrls: ['./piece-selection.component.less']
})
export class PieceSelectionComponent implements OnInit {

  pieces: PieceType[];

  constructor(private readonly boardService: BoardService) { }

  ngOnInit(): void {
    this.boardService.getAvailablePieces().subscribe(result => {
      this.pieces = result;
    })
  }
}
