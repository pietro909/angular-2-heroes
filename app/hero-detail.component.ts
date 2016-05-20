import { Component, Input, OnInit } from '@angular/core';
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

    constructor(
        private routeParams: RouteParams,
        private heroService: HeroService
    ) {}

    ngOnInit() {
        const id = parseInt(this.routeParams.get('id'), 10);
        this.heroService.getHero(id).then( hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }
}
