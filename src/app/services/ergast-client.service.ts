import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { DriversDTO, SeasonDTO, SeasonDataDTO, StandingsDTO } from '../models/dtos';
import { Race, Result } from '../models/ergast';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErgastClientService {
  readonly url = "https://ergast.com/api/f1/";
  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getAvailableYears(): Observable<string[]> {
    return this.httpClient.get<SeasonDataDTO>(`${this.url}seasons.json?limit=100`)
      .pipe(
        map(seasonData => seasonData.MRData.SeasonTable.Seasons.map((season) => season.season)),
        catchError(this.genericErrorHandler)
      );
  }

  getSeasonData(season: string): Observable<Race[]> {
    return this.httpClient.get<SeasonDTO>(`${this.url}${season}/results.json?limit=1000`)
      .pipe(
        map(season => season.MRData.RaceTable.Races
          .map(_race => {
            const race: Race = {
              name: _race.raceName,
              date: _race.date,
              circuitName: _race.Circuit.circuitName,
              location: `${_race.Circuit.Location.locality}, ${_race.Circuit.Location.country}`,
              results: _race.Results.map(_result => {
                const result: Result = {
                  position: _result.position,
                  driver: `${_result.Driver.givenName} ${_result.Driver.familyName}`,
                  constructorName: _result.Constructor.name,
                  points: _result.points,
                }
                return result;
              })
            }
            return race;
          })
        ),
        catchError(this.genericErrorHandler)
      );
  }

  getDriverStanding(season: string): Observable<Result[]> {
    return this.httpClient.get<StandingsDTO>(`${this.url}${season}/driverStandings.json?limit=200`)
      .pipe(map(standings => standings.MRData.StandingsTable.StandingsLists[0].DriverStandings
        .map(driverStandings => {
          const result: Result = {
            position: driverStandings.position,
            points: driverStandings.points,
            constructorName: driverStandings.Constructors.map(cons => cons.name).join(", "),
            driver: `${driverStandings.Driver.givenName} ${driverStandings.Driver.familyName}`,
          };
          return result;
        }
        )),
        catchError(this.genericErrorHandler)
      );

  }

  getDrivers(): Observable<string[]> {
    return this.httpClient.get<DriversDTO>(`${this.url}drivers.json?limit=1000`)
      .pipe(map(drivers => drivers.MRData.DriverTable.Drivers
        .map(driver => `${driver.givenName} ${driver.familyName}`)
      ),
        catchError(this.genericErrorHandler)
      );
  }

  private genericErrorHandler = () => {
    this.snackBar.open("An error has occured", "DISMISS", { duration: 3000 });
    this.router.navigate(["/"]);
    return EMPTY;
  }
}
