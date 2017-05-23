import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./home/home.component";
import { MatchScoreCardComponent } from "./match/match-score-card.component";
import { ScoreBoardComponent } from "./score/score_board/score-board.component";
import { EditScoreComponent } from "./score/edit_score/edit-score.component";
import { TogglerComponent } from "./components/toggler/toggler.component";
import { NewMatchComponent } from "./match/new-match.component";
import { NewTeamComponent } from "./team/new-team.component";
import { ModalViewComponent } from "./modal/modal-view.component";

import { ItemService } from "./item/item.service";
import { ScoreService } from "./services/score.service";
import { TeamService } from "./services/team.service";
// import { BallService } from "./services/ball.service";
import { DbService } from "./services/db.service";
import { MatchService } from "./services/match.service";

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    HomeComponent,
    MatchScoreCardComponent,
    ScoreBoardComponent,
    EditScoreComponent,
    TogglerComponent,
    NewMatchComponent,
    NewTeamComponent,
    ModalViewComponent
  ],
  entryComponents: [
    ModalViewComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptFormsModule,
    NativeScriptModule,
    AppRoutingModule
  ],
  providers: [
    ItemService,
    MatchService,
    ScoreService,
    ModalDialogService,
    TeamService,
    DbService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
