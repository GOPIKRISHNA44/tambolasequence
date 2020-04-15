import { Component } from '@angular/core';
import { configs } from 'src/constants/appconf';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public board: any = [];
  public isGameStarted: boolean = false;
  public pointer: any = 0;
  public sequence: any = [];
  public previouslyCalledNumbers: any = [];
  public timerSeconds: any = configs.defaultTimerSeconds;
  public timerOptions: any = configs.timerOptions;
  public isTimerPaused: boolean = false;
  public timer: any = null;
  public fivers: any = [];
  timerSecondsNum: number;
  previousNumber: any = null;
  isSoundOn: boolean = false;
  public isAlignSound: boolean = false;
  constructor(private commonService: CommonService) {
    // Initiallt loop 90 elements in sequence
    this.isAlignSound = this.commonService.isWindowWidthLessThan409;
    this.sequence = this.commonService.get90Numbers();
    this.board = this.commonService.generateBoard();
    this.resetGame();
    this.fivers = configs.fivers;
    this.commonService.tabSwitchHandler.subscribe((tabName) => {
      tabName && (tabName == configs.tab2ResteKey) && this.resetGame();
    });

  }
  startGame() {
    this.resetGame();
    this.isGameStarted = true;
    this.isTimerPaused = false;
    //this.commonService.pauseFunction(3000);
    this.startTimer();
  }
  startTimer(initialCall = true) {
    this.timerSecondsNum = Number(this.timerSeconds);
    // while (!this.isTimerPaused && this.isGameStarted) {
    //   this.callSequence();
    //   this.commonService.pauseFunction(timerSecondsNum * 1000);
    // }
    initialCall && this.callSequence();
    this.timer = setInterval(function () {
      if (this.isTimerPaused || !this.isGameStarted)
        clearInterval(this.timer);
      this.callSequence();
    }.bind(this),
      this.timerSecondsNum * 1000)
  }
  switchGame(val) {
    this.isTimerPaused = (val == "0" ? true : false);
    if (!this.isTimerPaused)
      this.startTimer(false);
    else
      this.clearTimer();
  }

  setDefaultTimer() {
    this.timerSeconds = configs.defaultTimerSeconds;
  }
  generateTambolaSequence() {
    for (var i = 1; i <= configs.shuffleCount; i++)
      this.sequence.sort(() => Math.random() - 0.5);
  }
  resetGame() {

    this.isSoundOn = false;
    this.timerSecondsNum = null;
    this.clearTimer();
    this.isTimerPaused = true;
    this.isGameStarted = false;
    this.fivers = this.commonService.resetFivers(this.fivers);
    this.resetBoardCondition();
    this.pointer = 0;
    this.generateTambolaSequence();
    this.previouslyCalledNumbers = [];
    this.previousNumber = null;
    this.commonService.clearVoiceService();
    // this.setDefaultTimer();
  }
  clearTimer() {
    clearInterval(this.timer);
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
    if (this.isTimerPaused)
      return;
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



}
