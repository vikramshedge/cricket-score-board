import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { NewTeamComponent } from "./team/new-team.component";

const routes: Routes = [
    { path: "", redirectTo: "/create_team", pathMatch: "full" },
    // { path: "", redirectTo: "/home", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
    // { path: "home", component: HomeComponent },
    // { path: "match", component: MatchScoreCardComponent },
    // { path: "edit_score", component: EditScoreComponent },
    // { path: "toggler", component: TogglerComponent },
    // { path: "create_match", component: NewMatchComponent },
    { path: "create_team", component: NewTeamComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }