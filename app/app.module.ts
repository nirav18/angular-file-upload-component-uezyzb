import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent, FileUploadComponent } from './app.component';
import { FileUploadService } from './file-upload.service';
import { HttpClientModule } from '@angular/common/http';
 

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent, FileUploadComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ FileUploadService]
})
export class AppModule { }
