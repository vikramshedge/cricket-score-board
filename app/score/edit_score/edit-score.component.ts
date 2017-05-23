import { Component, OnInit,OnChanges, SimpleChanges, Input } from "@angular/core";
import { Ball } from "./../ball/ball";
import { MatchDetails } from "./../../match/match-details";
import { Team } from "./../../team/team";
import { TotalScore } from "./../total_score/total-score";

@Component({
    selector : "edit-score",
    moduleId : module.id,
    templateUrl: "./edit-score.component.html",
    styleUrls: ['./edit-score.component.css'],
    inputs: ['matchId']
})

export class EditScoreComponent implements OnInit {
    currentBall: Ball;
    matchId: string;
    matchDetails: MatchDetails;
    battingTeam: Team;
    battingScore: TotalScore;
    bowlingTeam: Team;
    bowlingScore: TotalScore;
    previewScore: TotalScore;

    ngOnInit(){
        this.matchId = "dummy";
        this.matchDetails = new MatchDetails(-1,null,null);
        if (this.matchDetails.balls.length > 0) {
            this.currentBall = this.matchDetails.balls[this.matchDetails.balls.length-1];
        } else {
            console.log("Creating new ball");
            this.currentBall = new Ball();
        }

        this.getCurrentTeam();
        this.calculatePreviewScore();
        // console.log("Batting team, in EditScore: ");
        // console.dump(this.battingTeam.shortName);
    }

    ballTypeToggled(event: any){
        this.calculatePreviewScore();
    }

    wicketToggled(event: any){
        this.calculatePreviewScore();
    }

    runToggled(event: any){
        this.calculatePreviewScore();
    }

    calculatePreviewScore(){
        this.previewScore = new TotalScore();
        this.previewScore.balls = this.battingScore.balls;
        this.previewScore.ballsOfCurrentOver = this.battingScore.ballsOfCurrentOver;
        this.previewScore.overs = this.battingScore.overs;
        this.previewScore.runs = this.battingScore.runs;
        this.previewScore.wickets = this.battingScore.wickets;

        this.previewScore.addBall(this.currentBall);
    }

    submitCurrentBall() {
        this.battingScore.addBall(this.currentBall);
        this.currentBall = new Ball();
        this.calculatePreviewScore();
    }

    getCurrentTeam(){
        if (this.matchDetails.scoreA.overs < this.matchDetails.totalOver) {
            this.battingTeam =  this.matchDetails.teamA;
            this.battingScore =  this.matchDetails.scoreA;

            this.bowlingTeam =  this.matchDetails.teamB;
            this.bowlingScore =  this.matchDetails.scoreB;
        } else {
            this.battingTeam =  this.matchDetails.teamB;
            this.battingScore =  this.matchDetails.scoreB;

            this.bowlingTeam =  this.matchDetails.teamA;
            this.bowlingScore =  this.matchDetails.scoreA;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}