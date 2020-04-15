import { Component } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private commonService: CommonService) { }
  resetTab1() {
    this.commonService.resetTab1();
  }
  resetTab2() {
    this.commonService.resetTab2();
  }
}
