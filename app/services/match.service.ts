import { Injectable } from "@angular/core";
import { MatchDetails } from "./../match/match-details";
import { DbService } from "./db.service";

@Injectable()
export class MatchService {

    private sampleLiveMatch: MatchDetails;

    constructor(private _dbService: DbService){}
        
    getSampleMatchDetails(){
        return "";
    }

    createNewMatch(teamAid: number, teamBid: number, scoreAid: number, scoreBid: number): Promise<MatchDetails>{
        let tempInstance = this;
        let sqlStr = "INSERT INTO match_details (team_1_id, team_2_id, score_1_id, score_2_id, matchstarted, matchend) VALUES ('"+teamAid+"', '"+team.shortName+"', '"+team.shortName+"')";
        let promise: Promise<MatchDetails>  = new Promise(function(resolve, reject) {
            tempInstance._dbService.init().then((isSuccess: boolean) => {
                tempInstance._dbService.insert(sqlStr).then( id => {
                    let newMatch: MatchDetails = new MatchDetails(id,null,null);
                    // newMatch.id = id;
                    resolve(newMatch);
                }).catch(error => {
                    console.log("Error in creating Match:" + error);
                });
            }).catch(error => {
                console.log("Error in db init: " + error);
            })
        });
        return promise;
    }
}