import { Component,OnInit } from '@angular/core';
import { Station } from '../models/station.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm-setup',
  templateUrl: './alarm-setup.component.html',
  styleUrl: './alarm-setup.component.css'
})
export class AlarmSetupComponent implements OnInit {
  alarmStations: Station[] = [];

  constructor(private router: Router) {
    // Retrieve the passed alarm stations data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.alarmStations = navigation.extras.state['alarmStations'] || [];
    }
  }

  ngOnInit(): void {
    console.log('Received Alarm Stations:', this.alarmStations); // Debugging to see received stations
  } }
