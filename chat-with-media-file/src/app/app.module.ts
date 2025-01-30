import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SideBarComponentsComponent } from './components/side-bar-components/side-bar-components.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MessageComponentComponent } from './components/open-chat-component/message-component/message-component.component';
import { OpenChatComponentComponent } from './components/open-chat-component/open-chat-component.component';
import { MainPageComponent } from './page/main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SideBarComponentsComponent,
    MessageComponentComponent,
    OpenChatComponentComponent,
    MainPageComponent,
    SearchDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
