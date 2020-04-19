import { PieceType } from '../common/piece-type';
import { Observable, from, of } from 'rxjs';

export class PieceService {

    /**
     * getAvailableMoves
     */
    public getAvailablePieces(): Observable<PieceType[]> {
        return of(new Array(PieceType.Queen, PieceType.Rook));
    }
}