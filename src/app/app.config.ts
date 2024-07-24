import { ApplicationConfig, Component, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserInputComponent } from './core/components/user-input/user-input.component';


const routes: Routes = [
  { path:'', component: UserInputComponent}
];

export const appConfig: ApplicationConfig = {
  providers:[
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     provideHttpClient(),
     importProvidersFrom(FormsModule),
     provideClientHydration()
    ]
};
