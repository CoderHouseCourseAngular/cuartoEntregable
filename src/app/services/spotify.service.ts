import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private headerCustom: HttpHeaders;

  constructor(private http: HttpClient) {}

  /* Generacion del token dinamico */
  login() {
    const authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    const body = 'grant_type=client_credentials';
    return this.http.post(authorizationTokenUrl, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic  ' +
          btoa(environment.clientId + ':' + environment.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded;',
      }),
    });
  }

  /* Buscar Cancion */
  searchTrack({ q }: TrackModel): Observable<any> {
    let token;

    this.login().subscribe((data) => {
      token = data['access_token'];

      /* Obtener canciones */
      this.headerCustom = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    });

    return this.http.get(`${environment.url}?q=${q}&type=track&limit=20`, {
      headers: this.headerCustom,
    });
  }
}

export class TrackModel {
  q: string;
}
