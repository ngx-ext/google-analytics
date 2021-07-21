# @ngx-ext/google-analytics [![Build Status](https://travis-ci.org/ngx-ext/google-analytics.svg?branch=master)](https://travis-ci.org/ngx-ext/google-analytics)

> Google Analytics for your Angular application


## Install

```
$ ng add @ngx-ext/google-analytics
```

## Usage

### Configuration

The Google Analytics tracking script <b>is included</b> in this module.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleAnalyticsModule, GA_TOKEN } from '@ngx-ext/google-analytics';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		GoogleAnalyticsModule.forRoot()
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: GA_TOKEN, useValue: 'UA-TOKEN-1' } // or use GoogleAnalyticsService.configure(ga-token)
	]
})
export class AppModule { }
```

### Service

Inject the `GoogleAnalyticsService` into your components or services.

```ts
import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'angular-ga';

@Component({
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

	constructor(
		private gaService: GoogleAnalyticsService
	) { }

	ngOnInit() {
		this.gaService.event.emit({
			category: 'app',
			action: 'bootstrap'
		});
	}
}
```

#### Configuration

```ts
import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'angular-ga';

@Component({
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

	constructor(
		private gaService: GoogleAnalyticsService
	) { }

	ngOnInit() {
		this.gaService.configure('UA-TOKEN-1');
	}
}
```


## API

### service.configure(trackingId, [options])

#### trackingId

Type: `string`

Tracking Id.

#### options

Type: `Object` `string`<br>
Default: `auto`

Any of the [`Create Only Fields`](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#create).

### service.event.emit(event: Event)

Emit a Google Analytics event.

#### event

##### category

Type: `string`

Typically, the object that was interacted with (e.g. `Video`)

##### action

Type: `string`

The type of interaction (e.g. `play`)

##### label

*Optional*<br>
Type: `string`

Useful for categorizing events (e.g. `Fall Campaign`)

##### value

*Optional*<br>
Type: `number`

A numeric value associated with the event (e.g. `42`)

### service.pageView.emit(pageView: PageView)

Emit a Google Analytics page view.

#### PageView

##### page

Type: `string`

The path portion of a URL. This value should start with a slash (/) character.

##### title

*Optional*<br>
Type: `string`

The title of the page (e.g. homepage)
