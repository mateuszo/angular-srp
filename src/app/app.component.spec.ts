import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppInstructionComponent } from './app-instruction/app-instruction.component';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './services/users.service';
import { userMocks } from '../test/user-mock';
import { of } from 'rxjs';
import { UserListComponent } from './user-list/user-list.component';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  const userServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, AppInstructionComponent, UserListComponent],
      imports: [HttpClientTestingModule, CommonModule, BrowserModule],
      providers: [UsersService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display task instructions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Angular Single Responsibility Principle exercise'
    );
  });

  it('should fetch user data from server', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'https://jsonplaceholder.typicode.com/users/'
      );
    });

    mockReq.flush({});
    httpMock.verify();
  });

  it('should display users grid', () => {
    TestBed.overrideProvider(UsersService, { useValue: userServiceSpy });
    userServiceSpy.getUsers.and.returnValue(of(userMocks));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const userContainer = fixture.nativeElement.querySelector('.user-list');

    expect(userContainer.querySelectorAll('.user-container').length).toBe(2);
    expect(userContainer.textContent).toMatch('Leanne Graham');
    expect(userContainer.textContent).toMatch('Shanna@melissa.tv');
  });

  it('should select user properly', () => {
    TestBed.overrideProvider(UsersService, { useValue: userServiceSpy });
    userServiceSpy.getUsers.and.returnValue(of(userMocks));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const userContainer = fixture.nativeElement.querySelector('.user-container');

    userContainer.click();

    fixture.detectChanges();

    const selectedUserContainer = fixture.nativeElement.querySelector('.selected-user');
    expect(selectedUserContainer).toBeTruthy();
  });

  it('should unselect user properly', () => {

    // selectedUserService.select(userMocks[0]);

    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.close-user-details');

    closeButton.click();

    fixture.detectChanges();

    expect(closeButton).toBeFalse();
  });
});
