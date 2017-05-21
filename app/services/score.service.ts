import { Injectable } from "@angular/core";
import { TotalScore } from "./../score/total_score/total-score";
import { DbService } from "./db.service";

@Injectable()
export class ScoreService {

    constructor(private _dbService: DbService){}

    createNewScore(): Promise<TotalScore>{
        let tempInstance = this;
        let sqlStr: string = ""; // to be created
        let promise: Promise<TotalScore>  = new Promise(function(resolve, reject) {
            tempInstance._dbService.init().then((isSuccess: boolean) => {
                tempInstance._dbService.insert(sqlStr).then( id => {
                    let newScore: TotalScore = new TotalScore();
                    newScore.id = id;
                    resolve(newScore);
                }).catch(error => {
                    console.log("Error in creating score:" + error);
                });
            }).catch(error => {
                console.log("Error in db init: " + error);
            })
        });
        return promise;
    }
}