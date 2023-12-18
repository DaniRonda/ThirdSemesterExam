import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {ChefScreenComponent} from "./Chef-Screen.component";




describe('ChefPage', () => {
  let component: ChefScreenComponent;
  let fixture: ComponentFixture<ChefScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChefScreenComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
