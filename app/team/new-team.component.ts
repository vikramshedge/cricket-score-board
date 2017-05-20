import {Component, OnInit, AfterViewInit} from "@angular/core"
import {TeamService} from "./../services/team.service";
import {DbService} from "./../services/db.service";
import {Team} from "./team";

@Component({
    selector: "new-team",
    moduleId: module.id,
    templateUrl: "./new-team.component.html",
    styleUrls: ["./new-team.component.css"]
})

export class NewTeamComponent implements OnInit, AfterViewInit {

    teams: Team[] = [];
    fullName: string = "NA";
    shortName: string = "NA";

    constructor(private teamService: TeamService, private dbService: DbService){

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.refresh();
    }

    textChangeHandler(value: string, source: string){
        if (source === "fname") {
            this.fullName = value;
        } else {
            this.shortName = value;
        }
    }

    textChange(value, source){

    }

    refresh(){
        let tempInstance = this;
        this.teamService.getAllTeams().then(teams => {
            tempInstance.teams = teams;
            console.log("Count of teams: " + teams.length);
        }).catch(error => {
            // this.teams = teams;
            console.log("new-team.component: error from getAllTeams: " + error);
        });
    }

    submit(submitCode: number){
        if (submitCode === 0){
            console.log("Cancelled");
        } else {
            for (let i=0; i<this.teams.length; i++) {
                if (this.shortName === this.teams[i].shortName) {
                    alert("Short Name already in use, please select another");
                    return 0;
                }
                if (this.fullName === this.teams[i].fullName){
                    alert("Full Name already in use, please select another");
                    return 0;
                }
            }
            let newTeam: Team = new Team();
            newTeam.fullName = this.fullName;
            newTeam.shortName = this.shortName;

            let tempInstance = this;
            this.teamService.createTeam(newTeam).then(isSuccess => {
                console.log("Creat team success");
                tempInstance.refresh();
            }).catch(error => {
                console.log("Error in creating team: "+error);
            });
        }
    }

    resetDb(){
        let tempInstance = this;
        this.dbService.deleteAll().then(isSuccess => {
            tempInstance.refresh();
        });
    }

}