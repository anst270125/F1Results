import { Component, Input } from '@angular/core';
import { Result } from 'src/app/models/ergast';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent {
  @Input() big = false;
  @Input() results: Result[] = [];
  readonly columns = ['position', 'points', 'driver', 'constructor'];
}
