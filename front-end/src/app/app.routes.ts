import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MainMainLayoutComponentComponent } from './Components/main-main-layout-component/main-main-layout-component.component';
import { Component } from '@angular/core';
import { PatientDashboardComponent } from './Components/patient-dashboard/patient-dashboard.component';
import { SymptomCheckerComponent } from './Components/symptom-checker/symptom-checker.component';
import { UploadImgComponent } from './Components/upload-img/upload-img.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'sign-up', component: SignupComponent },
  {path: 'MainPage', component: MainMainLayoutComponentComponent,
    children: [{path: '', redirectTo: 'patient-dashboard', pathMatch: 'full'},
              {path: 'patient-dashboard', component: PatientDashboardComponent},
              {path: 'Symptom-Checker', component: SymptomCheckerComponent},
              {path: 'Upload-X-ray', component: UploadImgComponent}
    ]
  }
];
