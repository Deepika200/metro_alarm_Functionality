import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Station } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class StaticMetroDataService {
  private baseUrl = 'assets/static-data/json_output/';

  constructor(private http: HttpClient) {}

  // Fetch station names
  getStationNames(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}stops.json`);
  }

  // Fetch stop times data
  getStopTimesData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}stop_times.json`);
  }

  // Fetch route stations between start and end stations
  getRouteStations(startStationId: string, endStationId: string): Observable<Station[]> {
    return this.getStopTimesData().pipe(
      mergeMap(stopTimes => {
        // Get the index of the start and end station
        const startIndex = stopTimes.findIndex(stop => stop.stop_id === startStationId);
        const endIndex = stopTimes.findIndex(stop => stop.stop_id === endStationId);

        // Ensure both indices are found and valid
        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
          // Return an empty array if conditions are not met
          return new Observable<Station[]>(observer => {
            observer.next([]);
            observer.complete();
          });
        }

        // Get the relevant stops between the start and end indices
        const routeStops = stopTimes.slice(startIndex, endIndex + 1).map(stop => stop.stop_id);

        // Fetch all stops to return their names
        return this.getStationNames().pipe(
          map(stations => stations.filter(station => routeStops.includes(station.stop_id)))
        );
      })
    );
  }
}
