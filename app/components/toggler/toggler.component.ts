import { Component, OnInit,OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { GridLayout } from "ui/layouts/grid-layout";

import {BallProperty} from "./../../score/ball/ball-property";
import {PropertyElement} from "./../../score/ball/ball-property";

@Component({
    selector : "my-toggler",
    moduleId : module.id,
    templateUrl: "./toggler.component.html",
    styleUrls: ['./toggler.component.css'],
    inputs: ['ballProperty']
})

export class TogglerComponent implements OnInit {

    @ViewChild('ToggleGrid') private refGrid : ElementRef;

    @Output()
    toggle: EventEmitter<PropertyElement> = new EventEmitter<PropertyElement>();

    ballProperty: BallProperty;// = new BallProperty([], 0);
    btn1: any = {"text": "btn 1", "value": 1, isSelected: true};
    btn2: any = {"text": "btn 2", "value": 2, isSelected: false};
    btn3: any = {"text": "btn 3", "value": 3, isSelected: false};
    colItemSpec: string = "*, *";
    
    ngOnInit(){

        if(this.ballProperty.elementList.length == 0) {
            console.log("Buttons length was 0");
            this.ballProperty.elementList.push(this.btn1);
            this.ballProperty.elementList.push(this.btn2);
            this.ballProperty.elementList.push(this.btn3);
        } else {
            // console.log("Buttons length was: "+this.ballProperty.elementList.length);
            let itemSpecArr: string[] = [];
            for (let i=0; i<this.ballProperty.elementList.length; i++) {
                itemSpecArr.push("*");
            }
            this.colItemSpec = itemSpecArr.join(", ");
        }
    }

    ngAfterViewInit() {
        let grid: GridLayout = <GridLayout>this.refGrid.nativeElement;
        // console.log("Columns count: " + grid.getColumns().length);
        // console.dump(this.ballProperty);
    }

    renderButtons(){
        
    }

    toggleSelection(event: any, i: number) {
        this.ballProperty.selectProperty(i);
        this.toggle.emit(this.ballProperty.elementList[i]);
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log("Changes for toggler")
        // console.dump(changes);
        if (changes){
            // if (changes['ballProperty']) {
            //     if (changes['ballProperty'].currentValue) {
            //         this.ballProperty = changes['ballProperty'].currentValue;
            //     }
            // }
        } 
    }
}