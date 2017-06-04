import * as dialogs from "ui/dialogs";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Item } from "./../item/item";
import { MatchDetails } from "./../match/match-details";
import { ItemService } from "./../item/item.service";
import { MatchService } from "./../services/match.service";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {
    items: string[];
    varTime: string;
    onGoingMatches: MatchDetails[];

    constructor(private _itemService: ItemService, private _matchService: MatchService, private router: Router) { }

    ngOnInit(): void {
        // this.items = this.itemService.getItems();
        this.refresh();
    }

    scoreCardClicked(eventData: any){
        console.log("Match card clicked in home:");
        // console.dir(eventData);
        let match: MatchDetails = eventData.matchDetails;
        console.log("routing to edit score from hone");
        this.router.navigate(["edit_score", match.matchId])
    }

    showAlert(eventData){
        console.log("Start new match clicked");
        dialogs.alert("New match clicked");
    }

    refresh(){
        this.items = ['Live score here', 'recent results here', 'upcoming matches here'];
        this.varTime = Date().toString();
        this._matchService.getAllMatches().then((matches: MatchDetails[])=>{
            this.onGoingMatches = matches;
            console.log("Count of matches: "+this.onGoingMatches.length);
        }).catch(error => {
            console.log("Home.component.ts: Unable to get all matches");
        });
    }

}
