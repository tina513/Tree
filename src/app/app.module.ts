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
]

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
