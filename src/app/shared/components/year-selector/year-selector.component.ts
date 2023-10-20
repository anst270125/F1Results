import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErgastClientService } from 'src/app/services/ergast-client.service';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss']
})
export class YearSelectorComponent implements OnInit, OnDestroy {
  @Output() yearChange = new EventEmitter<string | null>();
  @Input() path = '';

  seasonYears: string[] = [];
  selectedSeason: string | null = null;
  private subs: Subscription[] = [];

  constructor(private ergastClient: ErgastClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.push(this.ergastClient.getAvailableYears().subscribe((years) => {
      this.seasonYears = years;
      this.subs.push(this.route.queryParams.subscribe((params) => {
        const year = params['year'];
        if (this.seasonYears.includes(year)) {
          this.selectedSeason = year;
          this.yearChange.next(year);
        }
        else {
          this.selectedSeason = null;
          this.yearChange.next(null);
          this.router.navigate([this.path]);
        }
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  seasonChanged(season: string) {
    this.router.navigate([this.path], { queryParams: { year: season } });
  }

}
