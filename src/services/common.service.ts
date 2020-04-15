import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { configs } from 'src/constants/appconf';
import Speech from 'speak-tts'
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { HistorymodalComponent } from 'src/historymodal/historymodal.component';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public tabSwitchHandler = new Subject<any>();
  sequence: any = [];
  speech: any;
  isSpeechDeviceSupported: boolean = false;
  isWindowWidthLessThan409: boolean = false;
  constructor(public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public speechSer: SpeechService) {
    // this.speech = new Speech();
    
    this.isWindowWidthLessThan409 = window.outerWidth < 409;
    this.loadSpeechConfig();
    for (var i = 1; i <= 90; i++)
      this.sequence.push(i);
  }
  loadSpeechConfig() {
    this.speech = new Speech();
    const speechConf = configs.speechSettings.config;
    //  speechConf.
    if (this.speech.hasBrowserSupport()) {
      this.speech.init(speechConf)
        .then((data) => {
          this.isSpeechDeviceSupported = true;
          // The "data" object contains the list of available voices and the voice synthesis params
          console.log("Speech is ready, voices are available", data)
          //  this.speechData = data;
          data.voices.forEach(voice => {
            console.log(voice.name + " " + voice.lang)
          });
        }).catch(e => {
          console.error("An error occured while initializing : ", e)
        });
      // this.speech
    }
    else {
      this.isSpeechDeviceSupported = false;
    }

  }
  get90Numbers() {
    return this.sequence;
  }
  generateBoard() {
    let board = [];
    for (var i = 1; i <= 81; i = i + 10) {
      let temp = [];
      for (var j = i; j < i + 10; j++) {
        let obj = {};
        obj["value"] = j;
        obj["status"] = false;
        temp.push(obj);
      }
      board.push(temp);
    }
    return board;
  }
  pauseFunction(seconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < seconds);
  }

  async presentLoadingWithOptions(message) {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  convertTextToSpeech(isSoundOn = false, text = null) {
    this.speech.volume = this.speech.volume + 1;
    if (this.isSpeechDeviceSupported) {
      if (text && isSoundOn) {
        this.speech.speak({
          text: String(text),
        }).catch(e => {
          this.presentToast(configs.soundFailMsg);
        });
      }
    }
    else {
      isSoundOn && this.presentToast(configs.soundNonSupportMsg);
    }
  }
  clearVoiceService() {
    //const speech = new Speech();
    //  this.tts.stop();
    this.isSpeechDeviceSupported && this.speech.cancel();
  }
  resetTab1() {
    this.tabSwitchHandler.next(configs.tab1ResetKey);
  }
  resetTab2() {
    this.tabSwitchHandler.next(configs.tab2ResteKey);
  }
  resetFivers(fivers) {
    fivers.forEach((obj) => { obj.status = false });
    return fivers;
  }
  async openModal(listOfValues) {
    // this.closeModal();
    const modal = await this.modalController.create({
      component: HistorymodalComponent,
      componentProps: {
        'historyValuesList': listOfValues
      }
    });
    return await modal.present();
  }

}
