import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaticMetroDataService } from '../services/static-metro-data.service';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  stations: Station[] = [];
  startStation: Station | null = null;
  endStation: Station | null = null;
  errorMessage: string = '';

  constructor(private metroDataService: StaticMetroDataService, private router: Router) {}

  ngOnInit(): void {
    this.metroDataService.getStationNames().subscribe(data => {
      this.stations = data.sort((a, b) => a.stop_name.localeCompare(b.stop_name));
    });
  }

  getFilteredEndStations() {
    return this.stations.filter(station => station !== this.startStation);
  }

  onSearch(): void {
    if (this.startStation && this.endStation) {
      this.metroDataService.getRouteStations(this.startStation.stop_id, this.endStation.stop_id).subscribe(routeStations => {
        // Navigate to StopListComponent and pass routeStations
        this.router.navigate(['/stop-list'], {
          state: { routeStations: routeStations }
        });
      }, error => {
        this.errorMessage = 'No route found. Try another route or check for transfers.';
      });
    }
  }

  onReset(): void {
    this.startStation = null;
    this.endStation = null;
    this.errorMessage = '';
  }
}
