import { Team } from "./../team/team";
import { TotalScore } from "./../score/total_score/total-score";
import { Ball } from "./../score/ball/ball";

export class MatchDetails {
    teamA: Team;
    teamB: Team;
    totalOver: number = 6;
    scoreA: TotalScore;
    scoreB: TotalScore;
    isTeamABatFirst: boolean = true;
    balls: Ball[] = [];
    summary: string;
    matchId: string;
    time: string;
    matchStarted: boolean = false;
    matchEnd: boolean = false;

    constructor(matchId: string) {
        this.matchId = matchId;
        this.initMatchDetails();
        this.getMatchDetails(matchId);
    }

    initMatchDetails(){
        this.teamA = new Team();
        this.teamB = new Team();
        this.scoreA = new TotalScore();
        this.scoreB = new TotalScore();
    }

    getMatchDetails(matchId: string){
        if (matchId === "dummy") {
            this.teamA.fullName = "Cisco Thunderbolts";
            this.teamA.shortName = "CTB";
            this.teamA.teamId = "ctb";

            this.teamB.fullName = "Cisco Lagaans";
            this.teamB.shortName = "Lagaan";
            this.teamB.teamId = "lgn";
        } else {
            //find the matchDetails here from service
        }
    }
    
    startMatch(teamABatFirst: boolean) {
        this.isTeamABatFirst = teamABatFirst;
        if (!this.isTeamABatFirst) {
            let tmpTeam = this.teamA;
            this.teamA = this.teamB;
            this.teamB = tmpTeam;
        }
        this.matchStarted = true;
    }

    endMatch() {
        this.matchStarted = false;
        this.matchEnd = true;
    }

    setTotalOver(totOvers: number) {
        this.totalOver = totOvers;
    }

    getSummary(): string {
        if (!this.matchStarted) {
            this.summary = this.time;
        } else if (this.matchEnd) {
            if (this.scoreB.runs > this.scoreA.runs) {
                this.summary = this.teamB.shortName + " won by " + (6-this.scoreB.overs)*6+(6-this.scoreB.ballsOfCurrentOver) + " balls!";
            } else if (this.scoreA.runs > this.scoreB.runs) {
                this.summary = this.teamA.shortName + " won by " + (this.scoreA.runs - this.scoreB.runs) + " runs!";
            } else {
                this.summary = "Match tied";
            }
        } else {
            if (this.scoreA.overs < this.totalOver) {
                this.summary = this.teamA.shortName + "batting first at " + this.scoreA.runs + "/" + this.scoreA.wickets + 
                                " in " + this.scoreA.overs + "." + this.scoreA.ballsOfCurrentOver + " overs!";
            } else {
                this.summary = this.teamB.shortName + "needs " + (this.scoreA.runs-this.scoreB.runs+1) +
                                " in " + (6-this.scoreB.overs)*6+(6-this.scoreB.ballsOfCurrentOver) + " balls!";
            }
        }
        return this.summary;
    }
}