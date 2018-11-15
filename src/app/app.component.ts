import { Component, NgZone } from '@angular/core';
import { App, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { Core } from '../service/core.service';
import { Keyboard } from '@ionic-native/keyboard';
import 'es6-shim';
// Custom
import { TranslateService } from '../module/ng2-translate';
import { Storage } from '@ionic/storage';
import { Config } from '../service/config.service';
import { Network } from '@ionic-native/network';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Device } from '@ionic-native/device';

// Page
import { HomePage } from '../pages/home/home';

declare var wordpress_url: string;
declare var display_mode: string;
declare var application_language: string;
declare var google_analytics: string;
declare var admob_android_banner: string;
declare var admob_android_interstitial: string;
declare var admob_ios_banner: string;
declare var admob_ios_interstitial: string;

@Component({
	templateUrl: 'app.html',
	providers: [Core, AdMobFree, GoogleAnalytics, ScreenOrientation, Device]
})
export class MyApp {
	HomePage = HomePage;
	rootPage: any = HomePage;
	trans: Object;
	isLoaded: boolean;
	disconnect: boolean;
	constructor(
		platform: Platform,
		public translate: TranslateService,
		public storage: Storage,
		public http: Http,
		public core: Core,
		public config: Config,
		public ngZone: NgZone,
		public alertCtrl: AlertController,
		public statusBar: StatusBar,
		public SplashScreen: SplashScreen,
		public Network: Network,
		public screenOrientation: ScreenOrientation,
		public ga: GoogleAnalytics,
		public admobFree : AdMobFree,
		private device: Device,
		public keyboard: Keyboard
	) {
		platform.ready().then(() => {
			statusBar.overlaysWebView(false);
            statusBar.styleDefault();
			let html = document.querySelector('html');
        	html.setAttribute("dir", display_mode);
        	translate.setDefaultLang(application_language);
			translate.use(application_language);
			storage.set('require', false);
			if (platform.is('cordova')) {
				//keyboard.hideKeyboardAccessoryBar(true);
				screenOrientation.lock('portrait');
			 	let operating_system = '';
				let admob: Object = {};
				if (device.platform == 'Android') {
					operating_system = 'Android';
					admob = {
						banner: admob_android_banner,
						interstitial: admob_android_interstitial
					};
				} else if (device.platform == 'iOS') {
					operating_system = 'iOS';
					admob = {
						banner: admob_ios_banner,
						interstitial: admob_ios_interstitial
					};
				}
				if(admob['banner']) {
	                const bannerConfig: AdMobFreeBannerConfig = {
	                    id: admob['banner'],
	                    autoShow: false
	                };
	                admobFree.banner.config(bannerConfig);
	                admobFree.banner.prepare()
	                .then(() => {console.log('banner prepare');})
	                .catch(e => console.log(e));  
	            }

	            if(admob['interstitial']) {
	                const interstitialConfig: AdMobFreeInterstitialConfig = {
	                    id: admob['interstitial'],
	                    autoShow: false
	                };
	                admobFree.interstitial.config(interstitialConfig);
	                admobFree.interstitial.prepare()
	                .then(() => {console.log('interstitial prepare');
	                }).catch(e => console.log(e));
	            }
	            if (google_analytics) {
	            	ga.startTrackerWithId(google_analytics).then(() => {
						ga.trackView(operating_system);
					}).catch(e => console.log('Error starting GoogleAnalytics', e));;
	            }
				Network.onDisconnect().subscribe(() => {
					ngZone.run(() => { this.disconnect = true; });
				});
				Network.onConnect().subscribe(() => {
					ngZone.run(() => { this.disconnect = false; });
				});
			}
		});
		storage.get('text').then(val => {
			let html = document.querySelector('html');
			html.className = val;
		});
	}
}
