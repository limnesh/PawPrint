import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Content } from 'ionic-angular';

// Custom
import { Storage } from '@ionic/storage';
import { Core } from '../../service/core.service';
import { Toast } from '@ionic-native/toast';
import { TranslateService } from '../../module/ng2-translate';
import { DetailPage } from '../detail/detail';

declare var wordpress_url: string;
declare var date_format: string;

@Component({
	selector: 'page-detail-order',
	templateUrl: 'detail-order.html',
	providers: [Core]
})
export class DetailOrderPage {
	DetailPage = DetailPage;
	id: Number; login: Object; data: Object;
	date_format: string = date_format;
	@ViewChild(Content) content: Content;
	trans: Object;
	AppointmentDate:string;
	constructor(
		private navCtrl: NavController,
		navParams: NavParams,
		private http: Http,
		storage: Storage,
		private core: Core,
		translate: TranslateService,
		private Toast: Toast,
		private alertCtrl: AlertController
	) {
		translate.get('detailOrder.popup_cancel').subscribe(trans => this.trans = trans);
		this.id = navParams.get('id');
		core.showLoading();
		storage.get('login').then(val => {
			if (val && val['token']) {
				this.login = val;
				this.getData();
				this.GetSchedule(this.id.toString());
			} else navCtrl.pop();
		});
	}
	getData() {
		this.core.showLoading();
		let headers = new Headers();
		headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		headers.set('Authorization', 'Bearer ' + this.login["token"]);
		this.http.get(wordpress_url + '/wp-json/wooconnector/order/getorderbyid?order=' + this.id, {
			headers: headers,
			withCredentials: true
		}).subscribe(res => {
			this.data = res.json();
			this.core.hideLoading();
			this.content.resize();
		});
	}
	GetSchedule(order_id:string)
	{
						let headers = new Headers();
						headers.set('Content-Type', 'application/json; charset=UTF-8');
						
						const app_params = new FormData();
						app_params["order_id"] = order_id;
						app_params["mode"] = "get";
						
						this.core.showLoading();
						console.log(JSON.stringify(app_params));
						this.http.post(wordpress_url+'/postschedule.php',JSON.stringify(app_params),{
							headers: headers,
							withCredentials: false
						} )
						.subscribe(res => {
							console.log(res);
								this.core.hideLoading();
								console.log(res);
								this.AppointmentDate=res['_body'];
								/*if (result=="5468")
								{
									console.log("One Hi");
								}
								else
								{
									console.log("One H2222223");					
								}*/
							
						}, err => {
							this.core.hideLoading();
							console.log(err);
						});
	}
	changeStatus() {
		let alert = this.alertCtrl.create({
			message: this.trans['message'],
			cssClass: 'alert-no-title alert-cancel-order',
			buttons: [
				{
					text: this.trans['no']
				},
				{
					text: this.trans['yes'],
					cssClass: 'primary',
					handler: () => {
						this.core.showLoading();
						let params = this.core.objectToURLParams({ order: this.id });
						let headers = new Headers();
						headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
						headers.set('Authorization', 'Bearer ' + this.login["token"]);
						this.http.post(wordpress_url + '/wp-json/wooconnector/order/changestatus', params, {
							headers: headers,
							withCredentials: true
						}).subscribe(res => {
							this.core.hideLoading();
							if (res.json()['result'] == 'success') {
								this.Toast.showShortBottom(this.trans["success"]).subscribe(
									toast => { },
									error => { console.log(error); }
								);
								this.navCtrl.pop();
							} else {
								this.Toast.showShortBottom(this.trans["fail"]).subscribe(
									toast => { },
									error => { console.log(error); }
								);
							}
						});
					}
				}
			]
		});
		alert.present();
	}
	doRefresh(refresher) {
		this.getData();
		refresher.complete();
	}
}
