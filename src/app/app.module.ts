import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodesComponent } from './nodes/nodes.component';
import { MainDialogComponent } from './main-dialog/main-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatTreeModule, MatIconModule, MatButtonModule, MatListModule, MatChipsModule, MatDialogModule, MatInputModule, MatToolbarModule, MatExpansionModule, MatDividerModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NodesComponent,
    MainDialogComponent,
    RenameDialogComponent
  ],
  entryComponents: [
    MainDialogComponent,
    RenameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
