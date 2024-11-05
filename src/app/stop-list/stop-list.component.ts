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
  alarmStations: Station[] = []; // To hold the stations for the alarm
  errorMessage: string = ''; // Property to hold any error messages
  endStation: Station | null = null; // Property to hold the selected end station

  constructor(private router: Router) {
    // Retrieve the passed data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.routeStations = navigation.extras.state['routeStations'] || [];
      this.endStation = navigation.extras.state['endStation'] || null; // Retrieve endStation
    }
  }
  
  ngOnInit(): void {
    // Debugging: Log the received stations and end station
    console.log('Received Route Stations:', this.routeStations);
    console.log('Received End Station:', this.endStation); // Check the endStation value
  
    // Set error message if endStation is not present
    if (!this.endStation) {
      this.errorMessage = "End station is not selected.";
    }
  }
  

  onSearch() {
    if (!this.endStation) {
      this.errorMessage = "End station is not selected.";
      return;
    }
    
    const endIndex = this.routeStations.findIndex(station => station.stop_name === this.endStation.stop_name);
    
    if (endIndex !== -1) {
      // Get the alarm stations
      this.setAlarmStations(endIndex);
      
      // Trigger alarm functionality
      this.triggerAlarm();

      // Navigate to the Alarm component
      this.router.navigate(['/alarm'], { state: { alarmStations: this.alarmStations } });
    } else {
      this.errorMessage = "End station not found in the route.";
    }
  }

  setAlarmStations(endIndex: number) {
    this.alarmStations = []; // Clear previous alarm stations

    // Adding 2 stops prior to destination
    if (endIndex - 2 >= 0) {
      this.alarmStations.push(this.routeStations[endIndex - 2]);
    }

    // Adding 1 stop prior to destination
    if (endIndex - 1 >= 0) {
      this.alarmStations.push(this.routeStations[endIndex - 1]);
    }

    // Optionally handle train change logic if needed
  }

  triggerAlarm() {
    // Implement your alarm logic here
    this.alarmStations.forEach(station => {
      console.log(`Alarm set for ${station.stop_name}`); // Replace with actual alarm logic
    });
  }
}
