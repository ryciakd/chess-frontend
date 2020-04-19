import { Component, OnInit, Input, Inject } from '@angular/core';
import { PieceType } from '../common/piece-type';
import { BoardService } from '../services/board.service';
import { ToastrService } from 'ngx-toastr';
import { BoardPosition } from '../model/board-postion';
import { MovementCheck } from '../common/movement-check';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {

  @Input() board: number[][];
  pieceSelected: PieceType;
  pieceClicked: boolean;
  piecePostion: BoardPosition;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly boardService: BoardService,
    private readonly toastr: ToastrService) {

    this.piecePostion = null;
    this.toastr.toastrConfig.positionClass = 'toast-bottom-left';
    this.board =  [
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
      [0,0,0,0,0,0,0,0], 
     ];  
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pieceSelected = +params.get('pieceId');
    });
  }

  onClick(row: number, column: number): void {  
    const clickedTile = new BoardPosition(row, column);

    if(this.piecePostion === null){
      this.board[row][column] = this.pieceSelected;
      this.piecePostion = clickedTile;
      return;
    }
    
    if(!this.pieceClicked && this.board[row][column] === this.pieceSelected){
      this.pieceClicked = true;
      this.boardService.getAvailableMoves(this.pieceSelected, this.piecePostion).subscribe(moves => {
        moves.forEach(move => {
          this.board[move.row][move.column] = -1;
        })
      });
      return;
    } 
    
    if(this.pieceClicked){
      this.boardService
        .canMove(this.pieceSelected, this.piecePostion, clickedTile).subscribe(result => {
          this.resetBoard(this.board);
          if(result === MovementCheck.Ok){
            this.board[row][column] = this.pieceSelected;
            this.piecePostion = clickedTile;
          } else{
            this.board[this.piecePostion.row][this.piecePostion.column] = this.pieceSelected;
            this.toastr.warning('Illegal move.');
          }
          this.pieceClicked = false;
        })
    }
  }

  resetBoard(board: number[][]): void {
    for (let j = 0; j < board.length; j++) {
      for (let k = 0; k < board[j].length; k++) {
        board[j][k] = 0;
      }
    }
  }
}
