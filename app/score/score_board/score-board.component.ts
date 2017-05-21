import { Component, OnInit,OnChanges, SimpleChanges } from "@angular/core";
import {TotalScore} from "./../total_score/total-score";

@Component({
    selector : "score-board",
    moduleId : module.id,
    templateUrl: "./score-board.component.html",
    styleUrls: ['./score-board.component.css'],
    inputs: ['teamName', 'totalScore']
})

export class ScoreBoardComponent implements OnInit {
    teamName: string = "NoName";
    runs: string = "74";
    wickets: string = "3";
    overs: string = "5";
    balls: string = "4";

    totalScore: TotalScore;

    ngOnInit(){
        // console.log("Total Score: ");
        // console.dump(this.totalScore);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes){
            if (changes['teamName']) {
                if (changes['teamName'].currentValue) {
                    this.teamName = changes['teamName'].currentValue;
                }
            }
            if (changes['runs']) {
                if (changes['runs'].currentValue) {
                    this.runs = changes['runs'].currentValue;
                }
            }
            if (changes['overs']) {
                if (changes['overs'].currentValue) {
                    this.overs = changes['overs'].currentValue;
                }
            }
            if (changes['wickets']) {
                if (changes['wickets'].currentValue) {
                    this.wickets = changes['wickets'].currentValue;
                }
            }
            if (changes['balls']) {
                if (changes['balls'].currentValue) {
                    this.balls = changes['balls'].currentValue;
                }
            }
        } 
    }
}