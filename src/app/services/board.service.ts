import { BoardPosition } from '../model/board-postion';
import { PieceType } from '../common/piece-type';
import { Observable } from 'rxjs';
import { MovementCheck } from '../common/movement-check';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {

    backendUrl = "https://localhost:44309/api/board";
    
    constructor(private readonly http: HttpClient) {}
    /**
     * getAvailableMoves
     */
    public getAvailableMoves(pieceType: PieceType, piecePosition: BoardPosition): Observable<BoardPosition[]> {
        const options = { params: 
            new HttpParams().set('pieceType', pieceType.toString())
            .set('row', piecePosition.row.toString())
            .set('column', piecePosition.column.toString())
        };

        return this.http.get<BoardPosition[]>(`${this.backendUrl}/moves`, options);
    }

    /**
     * canMove
        pieceType: PieceType, tileFrom: Tile, tileTo: Tile     */
    public canMove(pieceType: PieceType, from: BoardPosition, to: BoardPosition): Observable<MovementCheck> {
        const options = { params: 
            new HttpParams().set('pieceType', pieceType.toString())
            .set('currentRow', from.row.toString())
            .set('currentColumn', from.column.toString())
            .set('newRow', to.row.toString())
            .set('newColumn', to.column.toString())
        };

        return this.http.get<MovementCheck>(`${this.backendUrl}/check`, options);
    }

}