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

    createNewMatch(teamA: Team, teamB: Team, matchStarted: boolean): Promise<MatchDetails>{
        let tempInstance = this;
        let scoreA: TotalScore, scoreB: TotalScore;
        
        let promise: Promise<MatchDetails>  = new Promise(function(resolve, reject) {
            tempInstance._scoreService.createNewScore().then((score: TotalScore) => {
                scoreA = score;
                tempInstance._scoreService.createNewScore().then((score: TotalScore)=>{
                    scoreB = score;
                    let sqlStr = "INSERT INTO match_details (team_1_id, team_2_id, score_1_id, score_2_id, matchstarted, matchend) VALUES ('"+teamA.id +"', '"+teamB.id+"', '"+scoreA.id+"', '"+scoreB.id+"', '"+matchStarted+"', '"+false+"')";
                    tempInstance._dbService.insert(sqlStr).then( id => {
                        let newMatch: MatchDetails = new MatchDetails(id,teamA,teamB,scoreA,scoreB,matchStarted, false);
                        return resolve(newMatch);
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
        return promise;
    }

    getMatch(matchId: number): Promise<MatchDetails> {
        let tempInstance = this;
        let teamA: Team, teamB: Team, scoreA: TotalScore, scoreB: TotalScore;
        let sqlStr = "SELECT * FROM match_details WHERE id = '"+matchId+"'";
        let promise: Promise<MatchDetails> = new Promise(function(resolve, reject){
            tempInstance._dbService.fetch(sqlStr).then((result: Result)=>{
                let teamAid = result.resultSet[0][1];
                let teamBid = result.resultSet[0][2];
                let scoreAid = result.resultSet[0][3];
                let scoreBid = result.resultSet[0][4];
                let matchStarted = result.resultSet[0][5];
                let matchEnd = result.resultSet[0][6];
                tempInstance._teamService.getTeam(teamAid).then((team: Team)=>{
                    teamA = team;
                    tempInstance._teamService.getTeam(teamBid).then((team: Team)=>{
                        teamB = team;
                        tempInstance._scoreService.getScore(scoreAid).then((score: TotalScore)=>{
                            scoreA = score;
                            tempInstance._scoreService.getScore(scoreBid).then((score:TotalScore)=>{
                                scoreB = score;
                                let match: MatchDetails = new MatchDetails(matchId, teamA, teamB, scoreA, scoreB, matchStarted, matchEnd);
                                return resolve(match);
                            }).catch(error => reject(error));
                        }).catch(error => reject(error));
                    }).catch(error => reject(error));
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
        return promise;
    }

    getAllMatches(): Promise<MatchDetails[]> {
        let tempInstance = this;
        let sqlStr = "SELECT * FROM match_details";
        let matches: MatchDetails[] = [];
        let promise: Promise<MatchDetails[]> = new Promise(function(resolve, reject){
            tempInstance._dbService.fetch(sqlStr).then((result: Result) => {
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
                            let score1Id = result.resultSet[i][3];
                            tempInstance._scoreService.getScore(score1Id).then((score: TotalScore) => {
                                score1 = score;
                                let score2Id = result.resultSet[i][4];
                                tempInstance._scoreService.getScore(score2Id).then((score: TotalScore) => {
                                    score2 = score;
                                    let varMatch: MatchDetails = new MatchDetails(result.resultSet[i][0], team1, team2, score1, score2,matchStarted,matchEnd);
                                    matches.push(varMatch);
                                    if (result.resultSet.length === matches.length) {
                                        return resolve(matches);
                                    }
                                }).catch(error => reject(error));
                            }).catch(error => reject(error));
                        }).catch(error => reject(error));
                    }).catch(error => reject(error));
                }
            }).catch(error => reject(error));
        });
        return promise;
    }
}