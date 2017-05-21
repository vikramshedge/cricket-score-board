import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { MatchDetails } from "./match-details";
import { Team } from "./../team/team";
import { DbService } from "./../services/db.service";

import { ModalViewComponent } from "./../modal/modal-view.component";

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
    
    constructor(private router: Router, private dbService: DbService, private _modalService: ModalDialogService, private vcRef: ViewContainerRef){

    }
    
    ngOnInit() {
        
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

        this.router.navigate(["edit_score"]);
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