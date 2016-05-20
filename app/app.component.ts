import { Component }       from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import { Dashboard } from './dashboard.component';
import {HeroDetailComponent} from "./hero-detail.component";

@RouteConfig([
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    }
])

@Component({

    selector: 'my-app',

    template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Heroes']">Heroes</a>
    <router-outlet></router-outlet>
   `,
    
    styleUrls: [ 'app/app.component.css' ],

    directives: [ROUTER_DIRECTIVES],

    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]

})

export class AppComponent {

    title = 'Tour of Heroes';

    constructor(private heroService: HeroService) { }

}
