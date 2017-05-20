import { Injectable } from "@angular/core";
import { Ball } from "./../score/ball/ball";

@Injectable()
export class BallService {

    getBallDetails(scoreId: number){
        let balls: Ball[] = [];
        return balls;
    }
}