import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { RegistrationModule } from './registration/registration.module';
import { SigninModule } from './signin/signin.module';
import { ProfileModule } from './profile/profile.module';
import { reducers, metaReducers } from './NgRx/reducers';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MainModule,
    RegistrationModule,
    SigninModule,
    ProfileModule,
    EffectsModule.forRoot([]), // Эффекты сюда
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
