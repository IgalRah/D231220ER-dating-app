import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './errors/not-found/not-found.component'
import { ServerErrorComponent } from './errors/server-error/server-error.component'
import { TestErrorsComponent } from './errors/test-errors/test-errors.component'
import { DateInputComponent } from './forms/date-input/date-input.component'
import { TextInputComponent } from './forms/text-input/text-input.component'
import { HomeComponent } from './home/home.component'
import { ErrorInterceptor } from './interceptors/error.interceptor'
import { JwtInterceptor } from './interceptors/jwt.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { ListsComponent } from './lists/lists.component'
import { MemberEditComponent } from './member-edit/member-edit.component'
import { PhotoEditorComponent } from './member-edit/photo-editor/photo-editor.component'
import { MessagesComponent } from './messages/messages.component'
import { CoreModule } from './modules/core.module'
import { SharedModule } from './modules/shared.module'
import { NavComponent } from './nav/nav.component'
import { RegisterComponent } from './register/register.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    DateInputComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
