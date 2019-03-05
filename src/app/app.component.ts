import { Component, NgZone } from '@angular/core';
import { App, Platform, AlertController,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { Core } from '../service/core.service';
import { Keyboard } from '@ionic-native/keyboard';
//import 'es6-shim';
// Custom
import { TranslateService } from '../module/ng2-translate';
import { Storage } from '@ionic/storage';
import { Config } from '../service/config.service';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Device } from '@ionic-native/device';
import { SplashPage } from '../pages/splash/splash';

// Page
import { HomePage } from '../pages/home/home';

declare var wordpress_url: string;
declare var display_mode: string;
declare var application_language: string;


@Component({
	templateUrl: 'app.html',
	providers: [Core, ScreenOrientation, Device, SplashScreen]
})
export class MyApp {
	SplashPage = SplashPage;
//	rootPage: any = SplashPage;
	HomePage = HomePage;
	rootPage: any = HomePage;
	
	trans: Object;
	isLoaded: boolean;
	disconnect: boolean;
	constructor(
		platform: Platform,
		modalCtrl: ModalController,
		public translate: TranslateService,
		public storage: Storage,
		public http: Http,
		public core: Core,
		public config: Config,
		public ngZone: NgZone,
		public alertCtrl: AlertController,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public Network: Network,
		public screenOrientation: ScreenOrientation,
		private device: Device,
		public keyboard: Keyboard
	) {
		platform.ready().then(() => {
			//SplashScreen.hide();
			statusBar.styleDefault();
			//let splash = modalCtrl.create(SplashPage);
            //splash.present();
			let home = modalCtrl.create(HomePage);
            home.present();
			statusBar.overlaysWebView(false);
            //statusBar.styleDefault();
			let html = document.querySelector('html');
        	html.setAttribute("dir", display_mode);
        	translate.setDefaultLang(application_language);
			translate.use(application_language);
			storage.set('require', false);
			if (platform.is('cordova')) {
				//keyboard.hideKeyboardAccessoryBar(true);
				screenOrientation.lock('portrait');
			 	let operating_system = '';
				if (device.platform == 'Android') {
					operating_system = 'Android';
					
				} else if (device.platform == 'iOS') {
					operating_system = 'iOS';
					
				}
				
				Network.onDisconnect().subscribe(() => {
					ngZone.run(() => { this.disconnect = true; });
				});
				Network.onConnect().subscribe(() => {
					ngZone.run(() => { this.disconnect = false; });
				});
			}
			
			
			//this.hideSplashScreen();
			//splashScreen.hide();
		});
		storage.get('text').then(val => {
			let html = document.querySelector('html');
			html.className = val;
		});
		
	};
	/*hideSplashScreen() {
			if (this.splashScreen) {
				   setTimeout(() => {
					 this.splashScreen.hide();
				   }, 500);
			}
		};*/
}
