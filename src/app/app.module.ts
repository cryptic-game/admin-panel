import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './_core/navigation/navigation.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptorInterceptor } from './_api/api-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from './_core/notification/notification.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavigationModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NotificationModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
