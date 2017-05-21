import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
@Component({
    moduleId: module.id,
    templateUrl: "./modal-view.component.html"
})

export class ModalViewComponent implements OnInit, AfterViewInit {
    
    constructor(private params: ModalDialogParams){

    }

    ngOnInit(){

    }

    ngAfterViewInit(){

    }

    public submit() {
        this.params.closeCallback("vikram");
    }
}
