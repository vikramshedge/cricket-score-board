import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';

import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { ModalViewComponent } from "./../modal/modal-view.component";

import { MatchDetails } from "./match-details";
import { TotalScore } from "./../score/total_score/total-score";
import { Team } from "./../team/team";

import { DbService } from "./../services/db.service";
import { ScoreService } from "./../services/score.service";
import { MatchService } from "./../services/match.service";

@Component({
    selector: "new-match",
    moduleId: module.id,
    templateUrl: "./new-match.component.html",
    styleUrls: ['./new-match.component.css']
})

export class NewMatchComponent implements OnInit, AfterViewInit {

    matchDetails: MatchDetails;
    teamA: Team;
    teamB: Team;
    scoreA: TotalScore;
    scoreB: TotalScore;
    
    constructor(private router: Router, private _dbService: DbService, private _scoreService: ScoreService,
        private _matchService: MatchService, private _modalService: ModalDialogService, private vcRef: ViewContainerRef, private route: ActivatedRoute){

    }
    
    ngOnInit() {
        console.log("In new match component");
        let data = this.route.params.switchMap((params: Params) => {
            console.log("Edit score: activatedRouteParams: ");
            return params['data'];
        });
        console.dir(data["destination"]["_value"]["data"]);        
        
    }

    ngAfterViewInit() {
        // this.refreshTeams();
    }

    // teams: any = [];
    // refreshTeams(){
    //     let tempInstance = this;
    //     this.teamService.getAllTeams().then(teams => {
    //         tempInstance.teams = teams;
    //         console.log("Count of teams: " + teams.length);
    //     }).catch(error => {
    //         // this.teams = teams;
    //         console.log("new-team.component: error from getAllTeams: " + error);
    //     });
    // }

    submit() {
        if (this.teamA == null || this.teamB == null) {
            alert("Please select the teams!");
            return 0;
        }

        if (this.teamA.shortName == this.teamB.shortName) {
            alert("TEam A & Team B can not be same");
            return 0;
        }

        this.createNewMatch();
    }

    createNewMatch(){
        let tempInstance = this;
        this._matchService.createNewMatch(tempInstance.teamA, tempInstance.teamB, true).then(matchDetails => {
            tempInstance.matchDetails = matchDetails;
            console.log("Match details captured: "+ matchDetails.matchId);
            this.router.navigate(["edit_score", {"data":matchDetails}]);
            // this.router.navigate(["edit_score"]);
        }).catch(error => {
            console.log("Error in creating match: " + error);
        });
    }

    cancel(){
    }

    createModalView(args) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: false
        };

        this._modalService.showModal(ModalViewComponent, options).then( (response: Team) => {
            if (response != null) {
                if (args == 'A') {
                    this.teamA = response;
                } else {
                    this.teamB = response;
                }
                console.log("Selected team: " + response.shortName);
            } else {
                console.log("Selection empty");
            }
        })
    }
}