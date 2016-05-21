import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: [ 'app/hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {

    @Input()
    hero: Hero;

    @Output()
    close = new EventEmitter();

    error: any;

    navigated = false;

    constructor(
        private routeParams: RouteParams,
        private heroService: HeroService
    ) {}

    ngOnInit() {
        const id = parseInt(this.routeParams.get('id'), 10);
        if (id !== NaN) {
            this.navigated = true;
            this.heroService.getHero(id).then( hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }
}
