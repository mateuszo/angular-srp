import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppInstructionComponent } from './app-instruction/app-instruction.component';

@NgModule({
  declarations: [AppComponent, AppInstructionComponent],
  imports: [HttpClientModule, CommonModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
