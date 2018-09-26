import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
    // only the user data that we need
    _currentUser: any = {
      _id : "",
      firstname : "",
      Date: []
    }
  
    // the two lists that we need to populate the dashboard
    invites = [];
    accepts = [];
    constructor(private _httpService : HttpService,
                private _route : ActivatedRoute) { }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            let observer = this._httpService.getUser(params.userId);
            observer.subscribe(data => {
                if(data['errors']) {
                    console.log("There were errors grabbing user:", data['errors']);
                }
                else {
                    console.log("CurrentUser grabbed")
                    this._currentUser._id = data['_id'];
                    this._currentUser.firstname = data['firstname'];
                    this._currentUser.Date = data['Date'];
                }
            })
        })
    }

    // adding dates to our invites and accepts lists for display
    // only populating the user parts of the array with _id and firstname for privacy concerns
    populateArrays() {
        console.log("Hitting populateArrays");
        for(let date in this._currentUser.Date) {
            if(date['user1'] != this._currentUser._id && date['invitation == true']){
                let dateToPush = date;
                dateToPush['user1'] = { firstname : date['user1']['firstname'], _id : date['user1']['_id']};
                dateToPush['user2'] = { firstname : date['user2']['firstname'], _id : date['user2']['_id']};
                this.invites.push(dateToPush);
            }
            else if(date['user2']['_id'] == this._currentUser._id && date['invitation == false']) {
                let dateToPush = date;
                dateToPush['user1'] = { firstname : date['user1']['firstname'], _id : date['user1']['_id']} ;
                dateToPush['user2'] = { firstname : date['user2']['firstname'], _id : date['user2']['_id']} ;
                this.accepts.push(dateToPush);
            }
        }
        console.log("Invites:", this.invites);
        console.log("Accepts:", this.accepts);
    }
}