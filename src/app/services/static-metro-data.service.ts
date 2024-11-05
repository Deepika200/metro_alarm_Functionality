import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Station } from '../models/station.model';
import { StopTime } from '../models/stoptime.model';

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
    return this.http.get<StopTime[]>(`${this.baseUrl}stop_times.json`);
  }

  // Fetch route stations between start and end stations
  getRouteStations(startStationId: string, endStationId: string): Observable<Station[]> {
    return this.getStopTimesData().pipe(
      mergeMap((stopTimes: StopTime[]) => { // Specify StopTime[] here
        const startIndex = stopTimes.findIndex(stop => stop.stop_id === startStationId);
        const endIndex = stopTimes.findIndex(stop => stop.stop_id === endStationId);
  
        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
          return new Observable<Station[]>(observer => {
            observer.next([]);
            observer.complete();
          });
        }
  
        const routeStops = stopTimes.slice(startIndex, endIndex + 1).map(stop => stop.stop_id);
        return this.getStationNames().pipe(
          map(stations => stations.filter(station => routeStops.includes(station.stop_id)))
        );
      })
    );
  }
}  
