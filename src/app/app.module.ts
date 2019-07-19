import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NodesComponent } from './nodes/nodes.component';
import { MainDialogComponent } from './main-dialog/main-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule, MatIconModule, MatButtonModule, MatListModule, MatChipsModule, MatDialogModule, MatInputModule, MatToolbarModule, MatExpansionModule, MatDividerModule, MatTabsModule } from '@angular/material';
import { AuthComponent } from './auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';

const appRoutes:Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'nodes',
    component: NodesComponent
  }
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NodesComponent,
    MainDialogComponent,
    RenameDialogComponent,
    AuthComponent
  ],
  entryComponents: [
    MainDialogComponent,
    RenameDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000', 'tree-tina.herokuapp.com'],
        blacklistedRoutes: ['localhost:3000/api/signUp', 'localhost:3000/api/logIn', 'tree-tina.herokuapp.com/api/signUp', 'tree-tina.herokuapp.com/api/logIn']
      }
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule
  ],
  exports: [
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
