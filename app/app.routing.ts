import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./home/home.component";
import { TogglerComponent } from "./components/toggler/toggler.component";
import { MatchScoreCardComponent } from "./match/match-score-card.component";
import { NewMatchComponent } from "./match/new-match.component";
import { NewTeamComponent } from "./team/new-team.component";
import { EditScoreComponent } from "./score/edit_score/edit-score.component";

const routes: Routes = [
    // { path: "", redirectTo: "/create_match", pathMatch: "full" },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "home", component: HomeComponent },
    { path: "match", component: MatchScoreCardComponent },
    { path: "edit_score/:matchId", component: EditScoreComponent },
    { path: "toggler", component: TogglerComponent },
    { path: "create_match", component: NewMatchComponent },
    { path: "create_team", component: NewTeamComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }