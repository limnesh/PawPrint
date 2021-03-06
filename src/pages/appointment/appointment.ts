import { Component, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, Platform , AlertController} from 'ionic-angular';

import {DatePicker} from '@ionic-native/date-picker';
import {Calendar} from '@ionic-native/calendar';
//import {Platform} from 'ionic-angular';
// Custom
import { ObjectToArray } from '../../pipes/object-to-array';
import { CoreValidator } from '../../validator/core';
import { Storage } from '@ionic/storage';
import { StorageMulti } from '../../service/storage-multi.service';
import { Core } from '../../service/core.service';
import { Config } from '../../service/config.service';
import { TranslateService } from '../../module/ng2-translate';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Device } from '@ionic-native/device';

// Page
import { LoginPage } from '../login/login';
import { CheckoutPage } from '../checkout/checkout';
import { AddressPage } from '../address/address';

//import { Calendar } from '@ionic-native/calendar';
import { AddEventPage } from '../add-event/add-event';
import { EditEventPage } from '../edit-event/edit-event';

declare var wordpress_url;
declare var display_mode;

@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
  providers: [Core, StorageMulti, Geolocation, LocationAccuracy, Diagnostic, Device]
})
export class AppointmentPage {
	
  AddressPage = AddressPage;
  LoginPage = LoginPage;
  CheckoutPage = CheckoutPage;
  formAppointment: FormGroup;
  login: Object = {};
  data: Object = {};
  rawData: Object;
  isCache: boolean;
  states: Object = {};
  cart: Object = {};
  trans: Object;
  display_mode: string;
  check_require_login:boolean;
  isService:boolean;
  
  strAppointmentDate: string;
	schSelectedTime: string;
	schAvailableTimes:any;
	
  constructor(
    private http: Http,
    private storage: Storage,
    private storageMul: StorageMulti,
    private formBuilder: FormBuilder,
	private alertCtrl: AlertController,
    private core: Core,
    private navCtrl: NavController,
    config: Config,
    translate: TranslateService,
    private Geolocation: Geolocation,
    private LocationAccuracy: LocationAccuracy,
    private platform: Platform,
    private Diagnostic: Diagnostic,
    private Device: Device,
    public ngZone: NgZone,
	private DatePicker: DatePicker
  ) {
		this.getData();
	  	platform.ready().then(() => 
			{
				  let options = 
				  {
					date: new Date(),
					mode: 'date'
				  };

				DatePicker.show(options).then(
					date => 
					{
						if (typeof date == "string")
							date = new Date(date);
						//alert('Selected date: ' + date);
					
						var day = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
						var month = (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
						var dateString = date.getFullYear() + "-" + month + "-" + day;

						this.strAppointmentDate = dateString;
						this.getAppointTimes();
					},
					error => 
					{
					  alert('Error: ' + error);
					}
				);
			}
		);
		
	this.display_mode = display_mode;
    this.formAppointment = this.formBuilder.group({
      //billing_first_name: ['', Validators.required],
	  strAppointmentDate: ['', Validators.required]
      
    });
    

  }
  ionViewDidEnter() {
    if (this.isCache) this.getData();
    else this.isCache = true;
	

  }
  getData() {
	  
    /*this.storageMul.get(['login', 'useBilling', 'user']).then(val => {
      if (val['login']) this.login = val['login'];
      
      if (val['user']) {
        this.data = val['user'];
        
      }
      this.reset();
    });*/
	console.log('Test123');
		this.storageMul.get([ 'cart']).then(val => {
			if (val["cart"]) {
				this.cart = val["cart"];
				//console.log(this.cart);
				this.isService = false;
				new ObjectToArray().transform(this.cart).forEach(product => {
						if (product['variation_id']) 
						{
							this.isService=true;
							console.log(this.isService);
						}
						else
						{
							console.log(this.isService);
						}
						
				});
			}
			
		});
		
  }
  reset() {
    this.formAppointment.patchValue({
      //billing_first_name: this.data["billing_first_name"],
      strAppointmentDate: this.data["strAppointmentDate"],
    });
    this.rawData = Object.assign({}, this.formAppointment.value);
  }
  
  gotoAddress() {
	  
		this.storage.set('AppointmentDate', this.strAppointmentDate+' '+this.schSelectedTime);
		if (this.check_require_login) {
			if (this.login) this.navCtrl.push(this.AddressPage);
			else this.navCtrl.push(this.LoginPage);
		} else{
			if (this.login) this.navCtrl.push(this.AddressPage);
			else {
				let alert = this.alertCtrl.create({
					message: this.trans['confirm']['message'],
					cssClass: 'alert-no-title alert-signout',
					buttons: [
						{
							text: this.trans['confirm']["no"],
							cssClass: 'dark',
							handler: () => {
								this.navCtrl.push(this.AddressPage);
							}
						},
						{
							text: this.trans['confirm']["yes"],
							handler: () => {
								this.navCtrl.push(this.LoginPage);
							}
						}
					]
				});
				alert.present();	
			}
		}
	}
   
  	getAppointTimes() {
		
		//this.core.showLoading();
		console.log('Service');
		console.log(this.isService);
		//if (this.platform.is('cordova'))
		{
		  this.http.get(wordpress_url + '/getschedules.php'+'?date='+this.strAppointmentDate+'&service='+this.isService)
							.subscribe(res => {
				console.log(res);
				this.core.hideLoading();
				var result = res.text();
				if (result=="5468")
				{
					this.schSelectedTime=null;
					this.schAvailableTimes = null;
				}
				else
				{
					this.schSelectedTime=null;
					result = result.substring(0,result.length-1);
					this.schAvailableTimes = result.split(";");
					
				}
				
				 

				
			});
	  }
	  /*else
	  {
		this.schAvailableTimes = "08:30;09:15;10:15;12:20;13:10;14:45".split(";");
	  }*/
		/**/
	}

}
