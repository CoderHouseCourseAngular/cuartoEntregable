import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { map } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public isLoading = false;
  public src: string;
  public data$: any;

  constructor(private apiRest: SpotifyService) {}

  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.apiRest.searchTrack({ q: value }).pipe(
      map(({ tracks }) => tracks.items),
      finalize(() => {
        this.isLoading = false;
       
      })
    );
  }
}
