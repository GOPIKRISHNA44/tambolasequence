import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorymodalComponent } from './historymodal.component';

describe('HistorymodalComponent', () => {
  let component: HistorymodalComponent;
  let fixture: ComponentFixture<HistorymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorymodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
