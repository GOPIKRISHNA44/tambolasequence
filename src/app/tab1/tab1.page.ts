import { Component } from '@angular/core';
import { configs } from 'src/constants/appconf';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public board: any = [];
  public isGameStarted: boolean = false;
  public pointer: any = 0;
  public sequence: any = [];
  public previouslyCalledNumbers: any = [];
  public previousNumber: any = null;
  public fivers: any = [];
  public isSoundOn: boolean = false;
  public isAlignSound: boolean = false;
  constructor(private commonService: CommonService) {
    // Initiallt loop 90 elements in sequence
    // Initiallt loop 90 elements in sequence
    this.isAlignSound = this.commonService.isWindowWidthLessThan409;
    this.sequence = this.commonService.get90Numbers();
    this.board = this.commonService.generateBoard();
    this.resetGame();
    this.fivers = configs.fivers;
    this.commonService.tabSwitchHandler.subscribe((tabName) => {
      tabName && (tabName == configs.tab1ResetKey) && this.resetGame();
    });

  }
  startGame() {
    this.resetGame();
    this.isGameStarted = true;
    this.callSequence();
  }
  generateBoard() {
    for (var i = 1; i <= 81; i = i + 10) {
      let temp = [];
      for (var j = i; j < i + 10; j++) {
        let obj = {};
        obj["value"] = j;
        obj["status"] = false;
        temp.push(obj);
      }
      this.board.push(temp);
    }
  }
  generateTambolaSequence() {
    for (var i = 1; i <= configs.shuffleCount; i++)
      this.sequence.sort(() => Math.random() - 0.5);
  }
  resetGame() {

    this.isGameStarted = false;
    this.fivers = this.commonService.resetFivers(this.fivers);
    this.resetBoardCondition();
    this.pointer = 0;
    this.generateTambolaSequence();
    this.previouslyCalledNumbers = [];
    this.previousNumber = null;
    this.isSoundOn = false;
    this.commonService.clearVoiceService();
  }
  resetBoardCondition() {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 10; j++) {
        this.board[i][j]["status"] = false;
      }
    }
  }
  markNumber(value) {
    this.commonService.convertTextToSpeech(this.isSoundOn, value);
    let row = null, col = null;
    if (value % 10 == 0) {
      row = Math.floor(value / 10) - 1;
      col = 9;
    }
    else {
      row = Math.floor(value / 10);
      col = (value % 10) - 1;
    }
    this.board[row][col]["status"] = true;
  }
  callSequence() {
    if (this.pointer - 1 >= 0)
      this.previousNumber = this.sequence[this.pointer - 1];
    this.markNumber(this.sequence[this.pointer]);
    this.pointer += 1;
    if (this.pointer == 90) {
      // call toaster;
      this.commonService.presentLoadingWithOptions(configs["Game completion"]);
      this.resetGame();
    }

  }
  openModal() {
    if (this.pointer == 0)
      this.commonService.presentLoadingWithOptions(configs.NoNumbersCalled);
    else
      this.commonService.openModal(this.sequence.slice(0, this.pointer));
  }


}
