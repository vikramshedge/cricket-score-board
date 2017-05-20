import {Component, OnInit, AfterViewInit} from "@angular/core"
import {TeamService} from "./../services/team.service";
// import {DbService} from "./../services/db.service";
import {Team} from "./team";

@Component({
    selector: "teams",
    moduleId: module.id,
    templateUrl: "./teams.component.html",
    styleUrls: ["./teams.component.css"]
})

export class TeamsComponent implements OnInit, AfterViewInit {

    teams: Team[] = [];
    fullName: string = "NA";
    shortName: string = "NA";

    constructor(private teamService: TeamService){}

    ngOnInit(){}
    
    ngAfterViewInit() {}

    refresh(){
        this.teamService.getAllTeams().then(teams => {
            this.teams = teams;
            console.log("Count of teams: " + teams.length);
        }).catch(error => {
            // this.teams = teams;
            console.log("new-team.component: error from getAllTeams: " + error);
        });
    }
}