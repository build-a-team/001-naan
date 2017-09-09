import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppComponent } from './app.component';
import { EmojiService } from './emoji.service';
import { WeatherService } from './weather.service';
import { TrackService } from './track.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [ EmojiService, WeatherService, TrackService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
