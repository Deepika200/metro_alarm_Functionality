import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css']
})
export class StopListComponent implements OnInit {
  routeStations: Station[] = [];

  constructor(private router: Router) {
    // Retrieve the passed routeStations data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.routeStations = navigation.extras.state['routeStations'] || [];
    }
  }

  ngOnInit(): void {
    console.log('Received Route Stations:', this.routeStations); // Debugging to see received stations
  }

  setAlarm(): void {
    alert('Alarm set for your destination!');
  }
}
