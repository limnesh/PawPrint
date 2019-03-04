import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { NavController, Platform , AlertController} from 'ionic-angular';
//import { Http, Headers } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Core } from '../../service/core.service';
import { Storage } from '@ionic/storage';
import { StorageMulti } from '../../service/storage-multi.service';
//import { URLSearchParams } from '@angular/http';
import { LoginPage } from '../login/login';
import { PetinfoPage } from '../petinfo/petinfo';

declare var wordpress_url: string;
@Component({
	selector: 'page-mypets',
	templateUrl: 'mypets.html',
	providers: [Core,StorageMulti]
})
export class MypetsPage {
	formPetInfo: FormGroup;
	LoginPage = LoginPage;
	PetinfoPage= PetinfoPage;
	avatar:string;
	login: Object = {};
	
  is_loggedin:boolean = false;
	pets: Object[] = [];
	//selectOptions: selectOptions;
	faded: boolean = false;
	constructor(
	private formBuilder: FormBuilder,
	private Camera: Camera,
	private Toast: Toast,
	private core: Core,
	private http:Http,
    private storage: Storage,
    private storageMul: StorageMulti,
	private alertCtrl: AlertController,
    private navCtrl: NavController,
	platform: Platform,
	) 
	{
		platform.ready().then(() => {
		this.getData();
		});
		setTimeout(() => {
				this.faded = true;
		},100);
	}
	
	
	loadPets(username:string) {
		console.log(username);
		
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		const requestOptions = new RequestOptions({ headers: headers });

		
		
		let params = {
            userid: "limnesh"
        };
		//let params=JSON.stringify({userid:username});
		//let params = new FormData();
		//params.append('userid', username);
		
		//var params = { "userid": userid};
		/*let loadPets = () => {
			this.http.post(wordpress_url + '/petdataget.php', this.core.objectToURLParams(params)).subscribe(res => {
				console.log(res);
				if (res.json()) this.pets = res.json();
				
			});
		};
		loadPets();*/
		//let params: URLSearchParams = new URLSearchParams();
		 
		//params.append('userid', userid);
		//var param = JSON.stringify(params);
		console.log(params);
		//this.core.showLoading();
		this.http.get(wordpress_url+'/petdataget.php?userid='+username)
		/*this.http.post(wordpress_url+'/petdataget.php', params, requestOptions)*/
		.subscribe(res => {
			//console.log(res);
			this.pets = res.json();
				//this.core.hideLoading();
				/*var result = res.text();
				if (result=="5468")
				{
					console.log("One Hi");
				}
				else
				{
					console.log("One H2222223");					
				}*/
			//this.gotoLogin();
		}, err => {
			//this.core.hideLoading();
			//alert(err.json());
			console.log(err);
			this.Toast.showShortBottom(err.json()["message"]).subscribe(
				toast => {},
				error => {console.log(error);}
			);
		});
		
	}
	
	
	getData() {
		this.storageMul.get(['login']).then((val) => {
			this.login = val['login'];
			if (this.login )
			{
				console.log(this.login['username']);
				this.loadPets(this.login['username']);
		
				this.is_loggedin=true;
			}
			else
			{
				this.navCtrl.push(this.LoginPage);
				
			};

		});
		if(!this.is_loggedin)
		{
			this.storageMul.get(['login']).then((val) => {
			this.login = val['login'];
			if (this.login )
			{
				this.is_loggedin=true;
				this.loadPets(this.login['username']);
			}
			else
			{
				
				this.navCtrl.pop();
			};

		});
		};
	}
	
}

