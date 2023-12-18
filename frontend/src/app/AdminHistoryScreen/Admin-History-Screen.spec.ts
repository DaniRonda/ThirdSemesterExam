import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {AdminHistoryScreenComponent} from "./Admin-History-Screen";




describe('AdminHistoryPage', () => {
  let component: AdminHistoryScreenComponent;
  let fixture: ComponentFixture<AdminHistoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHistoryScreenComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHistoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
