import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { configs } from 'src/constants/appconf';

@Component({
  selector: 'app-historymodal',
  templateUrl: './historymodal.component.html',
  styleUrls: ['./historymodal.component.scss'],
})
export class HistorymodalComponent implements OnInit {

  @Input() historyValuesList: any;
  heading: any = configs.HistoryHeading;
  constructor(private mdlCtrl: ModalController) { }

  ngOnInit() { }
  closeModal() {
    this.mdlCtrl.dismiss({ 'dismissed': true });
  }

}
