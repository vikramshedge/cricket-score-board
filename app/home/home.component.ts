import * as dialogs from "ui/dialogs";
import { Component, OnInit } from "@angular/core";

import { Item } from "./../item/item";
import { ItemService } from "./../item/item.service";
import { MatchService } from "./services/match.service";
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
    liveMatchId: string = "live_sample_match";

    fName: any = {"text": "vik"};
    lName: any = {"text": "she"};

    people = [
        {"firstname": "vikram", "lastname": "shedge"},
        {"firstname": "tushar", "lastname": "shedge"}
    ];

    constructor(private itemService: ItemService, private matchService: MatchService) { }

    ngOnInit(): void {
        // this.items = this.itemService.getItems();
        this.items = ['Live score here', 'recent results here', 'upcoming matches here'];
        this.varTime = Date().toString();
    }

    showAlert(eventData){
        console.log("Start new match clicked");
        dialogs.alert("New match clicked");
    }

    nameChange(value, source){
        if (source === 'fname') {
            this.fName.text = value;
        } else {
            this.lName.text = value;
        }
    }

}
