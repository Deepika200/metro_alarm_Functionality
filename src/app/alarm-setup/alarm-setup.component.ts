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
  alarmMessage: string = "Your stop is approaching. Please be prepared to exit the train.";

  constructor(private router: Router) {
    // Retrieve the passed alarm stations data
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.alarmStations = navigation.extras.state['alarmStations'] || [];
    }
  }

  ngOnInit(): void {
    console.log('Received Alarm Stations:', this.alarmStations); // Debugging to see received stations
  } 


  triggerAlarm() {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.alarmMessage);
      utterance.rate = 1; // Set speaking rate
utterance.pitch = 5; // Set pitch

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  }

}
