import { Component, OnInit, AfterViewInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { MatchDetails } from "./match-details";
import { TeamService } from "./../services/team.service";
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
    teams: any = [];

    constructor(private teamService: TeamService, private dbService: DbService, private _modalService: ModalDialogService, private vcRef: ViewContainerRef){

    }
    
    ngOnInit() {
        
    }

    ngAfterViewInit() {
        this.refreshTeams();
    }

    refreshTeams(){
        let tempInstance = this;
        this.teamService.getAllTeams().then(teams => {
            tempInstance.teams = teams;
            console.log("Count of teams: " + teams.length);
        }).catch(error => {
            // this.teams = teams;
            console.log("new-team.component: error from getAllTeams: " + error);
        });
    }

    submit(cancel: number) {
        console.log("Canceled: " + (cancel == 0) );
    }

    createModalView(args) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: false
        };

        this._modalService.showModal(ModalViewComponent, options).then( response => {
            console.log(response);
        })
    }
}