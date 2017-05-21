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
    fullName: string = "";
    shortName: string = "";

    constructor(private teamService: TeamService, private dbService: DbService){

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.refresh();
    }

    textChangeHandler(value: string, source: string){
        if (source === "sname") {
            if (value.length > 3) {
                console.log("short name changd: "+ value + ": " + value.length);
                this.shortName = value.substr(0,3);
                // add toast here
            }
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

    validate(): boolean {
        if (this.shortName.length<1){
            alert("ShortName cann't be empty");
            return false;
        }

        if (this.fullName.length<1){
            alert("Fullname cann't be empty");
            return false;
        }

        for (let i=0; i<this.teams.length; i++) {
            if (this.shortName === this.teams[i].shortName) {
                alert("Short Name already in use, please select another");
                return false;
            }
            if (this.fullName === this.teams[i].fullName){
                alert("Full Name already in use, please select another");
                return false;
            }
        }
        return true;
    }

    submit(submitCode: number){

        let isValidInput: boolean = this.validate();

        if (isValidInput){
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
            this.shortName = "";
            this.fullName = "";
        }
    }

    cancel(){
        console.log("Cancelled");
    }

    resetDb(){
        let tempInstance = this;
        this.dbService.clearTable('team_details').then(isSuccess => {
            tempInstance.refresh();
        });
    }

}