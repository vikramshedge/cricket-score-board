import {Injectable} from "@angular/core";
import {Result} from "./result";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class DbService {

    database: any;
    tablesCreated: number = 0;

    sqlCreateTable: any = {
        "match_details":{
            "name": "match_details",
            "sql":"CREATE TABLE IF NOT EXISTS match_details (id INTEGER PRIMARY KEY AUTOINCREMENT, team_1_id INTEGER, team_2_id INTEGER, score_1_id INTEGER, score_2_id INTEGER, matchstarted BOOLEAN, matchend BOOLEAN, time DATETIME, summary TEXT)"
        },
        "team_details":{
            "name": "team_details",
            "sql":"CREATE TABLE IF NOT EXISTS team_details (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT,  shortname TEXT)"
        },
        "score_details":{
            "name": "score_details",
            "sql":"CREATE TABLE IF NOT EXISTS score_details (id INTEGER PRIMARY KEY AUTOINCREMENT, runs INTEGER,  wickets INTEGER, balls INTEGER, ballsOfCurrentOver INTEGER, overs INTEGER)"
        },
        "ball_details":{
            "name":"ball_details",
            "sql":"CREATE TABLE IF NOT EXISTS ball_details (id INTEGER PRIMARY KEY AUTOINCREMENT, scoreId INTEGER, ballType TEXT, wickets INTEGER, runs INTEGER)"
        },
        "player_details":{
            "name":"player_details",
            "sql":"CREATE TABLE IF NOT EXISTS player_details (id INTEGER PRIMARY KEY AUTOINCREMENT, teamId INTEGER, firstname TEXT, lastname TEXT)"
        }
    }

    constructor(){
        this.init();
    }
    
    init(){
        (new Sqlite("my.db")).then(db => {
            this.database = db;
            this.createTable(this.sqlCreateTable.match_details);
            this.createTable(this.sqlCreateTable.team_details);
            this.createTable(this.sqlCreateTable.score_details);
            this.createTable(this.sqlCreateTable.ball_details);
            this.createTable(this.sqlCreateTable.player_details);
            console.log("All Tables created!!");
            this.tablesCreated = 1;
        }, error => {
            console.log("Open db error: ", error);
            this.tablesCreated = 2;
        });
    }

    createTable(tableObj: any){
        // console.log("Sql: " + tableObj.sql);
        this.database.execSQL(tableObj.sql).then(id => {
            // console.log("Table " + tableObj.name + " created!!");
        }, error => {
            console.log("CREATE TABLE("+tableObj.name+") ERROR", error);
        })
    }

    public insert(sqlStr: string): Promise<boolean> {
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise(function(resolve, reject){
            console.log("Sql: " + sqlStr);
            tempInstance.database.execSQL(sqlStr).then(id => {
                console.log("INSERT RESULT", id);
                return resolve(id);
            }, error => {
                console.log("INSERT ERROR", error);
                reject(error);
            });
        });
        return promise;
    }
 
    public fetch(sqlStr: string): Promise<Result> {
        let result: Result = new Result();
        console.log("Sql: " + sqlStr);
        let tmpDb = this;
        let promise: Promise<Result> = new Promise(function(resolve, reject){
            tmpDb.database.all(sqlStr).then(rows => {
                console.log("get all success");
                result.resultSet = rows;
                result.status = 1;
                console.log(rows.length);
                return resolve(result);
            }, error => {
                console.log("SELECT ERROR", error);
                result.status = 2;
                result.resultSet.push(error);
                return reject(result);
            });
        });
        return promise;
    }

    public deleteAll(): Promise<boolean> {
        let tempInstance = this;
        let promise: Promise<boolean> = new Promise(function(resolve, reject) {
            tempInstance.database.execSQL('DELETE FROM match_details');
            tempInstance.database.execSQL('DELETE FROM team_details');
            tempInstance.database.execSQL('DELETE FROM score_details');
            tempInstance.database.execSQL('DELETE FROM ball_details');
            tempInstance.database.execSQL('DELETE FROM player_details');
            return resolve(true);
        });
        return promise;
    }
}