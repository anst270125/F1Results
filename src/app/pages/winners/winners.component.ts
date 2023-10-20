import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result } from 'src/app/models/ergast';
import { ErgastClientService } from 'src/app/services/ergast-client.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnDestroy {
  selectedSeason: string | null = null;
  standings?: Result[];
  private standingsSub?: Subscription;

  constructor(private ergastClient: ErgastClientService) { }

  ngOnDestroy(): void {
    this.standingsSub?.unsubscribe();
  }

  onYearChange(year: string | null) {
    this.selectedSeason = year;
    if (year) {
      this.getResults(year);
    }
    else {
      this.standings = undefined;
    }
  }

  private getResults(season: string) {
    this.standings = undefined;
    if (this.standingsSub) {
      this.standingsSub.unsubscribe();
    }
    this.standingsSub = this.ergastClient.getDriverStanding(season).subscribe((standings) => {
      this.standings = standings;
    });
  }
}
