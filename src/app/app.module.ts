import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PieceSelectionComponent } from './piece-selection/piece-selection.component';
import { BoardService } from './services/board.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PieceType } from './common/piece-type';
import { PieceService } from './services/piece.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PieceSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: PieceSelectionComponent },
      { path: 'board/:pieceId', component: BoardComponent },
    ])
  ],
  providers: [BoardService, PieceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
