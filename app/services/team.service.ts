import { Injectable, Inject } from "@angular/core";
import { Team } from "./../team/team";
import { DbService } from "./db.service";
import { Result } from "./result";
import {Subject} from "rxjs/Subject";

@Injectable()
export class TeamService {

    allTeams: Team[];
    private teamsChangedSource = new Subject<any>();
    public teamsChanged$ = this.teamsChangedSource.asObservable();

    constructor(protected dbService: DbService){

    }

    createSampleTeams(){
        let teamA: Team = new Team();
        teamA.fullName = "Team A";
        teamA.shortName = "T-A"
        this.createTeam(teamA);

        let teamB: Team = new Team();
        teamB.fullName = "Team B";
        teamB.shortName = "T-B"
        this.createTeam(teamB);
    }

    getTeamDetails(teamId: number){
        let team: Team = new Team();
        team.fullName = "ServiceTeam";
        team.shortName = "ST";
        return team;
    }

    createTeam(team: Team): Promise<boolean> {
        let sqlStr = "INSERT INTO team_details (fullname, shortname) VALUES ('"+team.fullName+"', '"+team.shortName+"')";
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise(function(resolve, reject){
            tempInstance.dbService.insert(sqlStr).then(id => {
                return resolve(true);
            }).catch(error => {
                return error;
            });
        });
        return promise;
    }

    getTeam(teamId: number): Promise<Team> {
        let tempInstance = this;
        let sqlStr: string = "SELECT * FROM team_details WHERE id = " + teamId;
        let promise: Promise<Team> = new Promise(function(resolve, reject){
            tempInstance.dbService.fetch(sqlStr).then((result: Result) => {
                if (result.resultSet.length > 0){
                    let newTeam = new Team();
                    newTeam.id = result.resultSet[0][0];
                    newTeam.id = result.resultSet[0][1];
                    newTeam.id = result.resultSet[0][2];
                    return resolve(newTeam);
                } else {
                    return reject("No team foud for this id: "+teamId);
                }
            }).catch(error => {
                return reject(error);
            })
        });
        return promise;
    }

    getAllTeams(): Promise<Team[]> {
        let sqlStr: string = "SELECT * FROM team_details";
        let tempInstance = this;
        let promise: Promise<Team[]> = new Promise(function(resolve, reject){
            tempInstance.dbService.fetch(sqlStr).then((result: Result) => {
                tempInstance.allTeams = [];
                result = result;
                for (let i=0; i<result.resultSet.length; i++) {
                    let newTeam: Team = new Team();
                    newTeam.id = result.resultSet[i][0]; 
                    newTeam.fullName = result.resultSet[i][1];
                    newTeam.shortName = result.resultSet[i][2];
                    tempInstance.allTeams.push(newTeam);
                }
                tempInstance.teamsChangedSource.next(tempInstance.allTeams);
                return resolve(tempInstance.allTeams);
            }).catch((error: Result) => {
                // console.dump(error);
                console.log("Get All team failed: " + error);
                return reject(error);
            });
        });
        return promise;
    }
}