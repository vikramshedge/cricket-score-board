import { Injectable } from "@angular/core";

import { Team } from "./../team/team";
import { TotalScore } from "./../score/total_score/total-score";
import { Result } from "./result";
import { MatchDetails } from "./../match/match-details";

import { DbService } from "./db.service";
import { TeamService } from "./team.service";
import { ScoreService } from "./score.service";

@Injectable()
export class MatchService {

    private sampleLiveMatch: MatchDetails;

    constructor(private _dbService: DbService, private _teamService: TeamService, private _scoreService: ScoreService){}
        
    getSampleMatchDetails(){
        return "";
    }

    createNewMatch(teamAid: number, teamBid: number, scoreAid: number, scoreBid: number): Promise<MatchDetails>{
        let tempInstance = this;
        let sqlStr = "INSERT INTO match_details (team_1_id, team_2_id, score_1_id, score_2_id, matchstarted, matchend) VALUES ('"+teamAid+"', '"+teamBid+"', '"+scoreAid+"', '"+scoreBid+"', '"+true+"', '"+false+"')";
        let promise: Promise<MatchDetails>  = new Promise(function(resolve, reject) {
            tempInstance._dbService.insert(sqlStr).then( id => {
                let newMatch: MatchDetails = new MatchDetails(id,null,null);
                // newMatch.id = id;
                resolve(newMatch);
            }).catch(error => {
                console.log("Error in creating Match:" + error);
                return reject(error);
            });
        });
        return promise;
    }

    getAllMatches(): Promise<MatchDetails[]> {
        let tempInstance = this;
        let sqlStr = "SELECT * FROM match_details";
        let promise: Promise<MatchDetails[]> = new Promise(function(resolve, reject){
            tempInstance._dbService.fetch(sqlStr).then((result: Result) => {
                let matches: MatchDetails[] = [];
                for (let i=0; i<result.resultSet.length; i++) {
                    let team1: Team, team2: Team;
                    let score1: TotalScore, score2: TotalScore;
                    let id = result.resultSet[i][0];
                    let matchStarted: boolean = result.resultSet[i][5];
                    let matchEnd: boolean = result.resultSet[i][6];
                    let teamId1 = result.resultSet[i][1];
                    tempInstance._teamService.getTeam(teamId1).then((team:Team)=>{
                        team1 = team;
                        let teamId2 = result.resultSet[i][2];
                        tempInstance._teamService.getTeam(teamId2).then((team:Team)=>{
                            team2 = team;
                            tempInstance._scoreService.
                        })
                    })
                    let varMatch: MatchDetails = new MatchDetails(result.resultSet[i][0],);
                }
            })
        })
    }
}