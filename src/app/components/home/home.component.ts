import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Meta, Title} from '@angular/platform-browser';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import {isPlatformBrowser} from '@angular/common';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public users: Observable<any>;

  private componentDestroy: Subject<any> = new Subject();
  constructor(private httpClient: HttpClient,
              private meta: Meta,
              private title: Title,
              @Inject(PLATFORM_ID) protected platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      Observable
        .interval(1000)
        .takeUntil(this.componentDestroy)
        .subscribe(i => this.title.setTitle(`Hello Component ${i}`));
    } else {
      this.title.setTitle('Hello Component 1');
    }
    this.meta.addTag({name: 'keywords', content: 'Hello, Home'});
    this.users = this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  ngOnDestroy(): void {
    this.componentDestroy.next(true);
  }
}
