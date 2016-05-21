import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

// side effects to transform an observable into a Promise
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero.model';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';

    constructor(
        private http: Http
    ) { }

    getHeroes() {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getHero(id: number) {
        return this.getHeroes().then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }

    save(hero: Hero): Promise<Hero>  {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero: Hero): Promise<Hero> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .delete(url, {headers: headers})
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private post(hero: Hero): Promise<Hero> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private put(hero: Hero): Promise<Hero> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

}
