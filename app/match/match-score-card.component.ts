import { Component, OnInit } from "@angular/core";
import { MatchDetails } from "./match-details";

@Component({
    selector: "match-score-card",
    moduleId: module.id,
    templateUrl: "./match-score-card.component.html",
    styleUrls: ['./match-score-card.component.css'],
    inputs: ['matchDetails']
})

export class MatchScoreCardComponent implements OnInit {

    matchDetails: MatchDetails;
    
    ngOnInit() {
        
    }
}