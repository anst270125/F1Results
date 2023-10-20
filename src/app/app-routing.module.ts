import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WinnersComponent } from './pages/winners/winners.component';
import { ResultsComponent } from './pages/results/results.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErgastClientService } from './services/ergast-client.service';

const routes: Routes = [
  {
    path: "results",
    component: ResultsComponent
  },
  {
    path: "winners",
    component: WinnersComponent
  },
  {
    path: "contact",
    component: ContactComponent,
    resolve: {drivers: () => inject(ErgastClientService).getDrivers()},
  },
  {
    path: '**',
    redirectTo: 'results'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
