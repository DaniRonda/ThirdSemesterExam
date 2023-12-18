import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {UserPayScreenComponent} from "./User-Pay-Screen.component";




describe('UserPayPage', () => {
  let component: UserPayScreenComponent;
  let fixture: ComponentFixture<UserPayScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPayScreenComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPayScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
