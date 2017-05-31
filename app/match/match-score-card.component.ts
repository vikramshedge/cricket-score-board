import { Component, OnInit, Output, EventEmitter } from "@angular/core";
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
    @Output() tap: EventEmitter<any> = new EventEmitter();
    
    ngOnInit() {
        console.log("TeamA:"+this.matchDetails.teamA.shortName);
        console.log("TeamB:"+this.matchDetails.teamB.shortName);
    }

    clickEventHandler(event){
        this.tap.emit(this);
        console.log("Score card clicked");
    }
}