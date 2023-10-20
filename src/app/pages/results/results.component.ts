import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Race } from 'src/app/models/ergast';
import { ErgastClientService } from 'src/app/services/ergast-client.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnDestroy {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selectedSeason: string | null = null;
  races?: Race[];
  private racesSub?: Subscription;

  constructor(private ergastClient: ErgastClientService) { }

  ngOnDestroy(): void {
    this.racesSub?.unsubscribe();
  }

  yearChanged(year: string | null) {
    this.selectedSeason = year;
    if (year) {
      this.getSeason(year);
    }
    else {
      this.races = undefined;
    }
  }

  expandPanels() {
    this.accordion.openAll();
  }

  closePanels() {
    this.accordion.closeAll();
  }

  private getSeason(season: string) {
    this.races = undefined;
    if (this.racesSub) {
      this.racesSub.unsubscribe();
    }
    this.racesSub = this.ergastClient.getSeasonData(season).subscribe((races) => {
      this.races = races;
    });

  }

}
