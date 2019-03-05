import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { NavController , NavParams} from 'ionic-angular';
//import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Http, Headers, } from '@angular/http';
import { Core } from '../../service/core.service';
import { Storage } from '@ionic/storage';
import { StorageMulti } from '../../service/storage-multi.service';
import { LoginPage } from '../login/login';
import { URLSearchParams } from '@angular/http';
import { Events } from 'ionic-angular';
declare var wordpress_url: string;
@Component({
	selector: 'page-petinfo',
	templateUrl: 'petinfo.html',
	providers: [Core,StorageMulti]
})
export class PetinfoPage {
	formPetInfo: FormGroup;
	avatar:string;
	file_name:string;
	id: string;
	login: Object = {};
	pets: Object[] = [];
	//selectOptions: selectOptions;
	faded: boolean = false;
	LoginPage = LoginPage;
	is_loggedin:boolean = false;
	pet_id:string;
			userid:string;
			pet_name:string;
			pet_category:string;
			pet_breed:string;
			pet_dob:string;
			pet_size:string;
	constructor(
	private formBuilder: FormBuilder,
	private Camera: Camera,
	private Toast: Toast,
	private core: Core,
	private http:Http,
	//private http:HttpClient,
	private storage: Storage,
	private navCtrl: NavController,
	private navParams: NavParams,
	private events: Events,
    private storageMul: StorageMulti
	
	) 
	{
		/*this.selectOptions = {
		  title: 'Dog Breed',
		  subTitle: 'Select your dog breed',
		  mode: 'md'
		};*/
		this.id = navParams.get('id');
		
		if(!this.id)
		{
			this.getData();
		}
		else
		{
			this.loadPet(this.id);
		}
		//alert(this.login['username']);
		
		//alert(this.is_loggedin);
		
		//alert(this.userid);
		/*this.formPetInfo = formBuilder.group({
			pet_id:[this.login['username'], Validators.required],
			userid:[this.login['username'], Validators.required],
			pet_name:['', Validators.required],
			pet_category:['', Validators.required],
			pet_breed:['', Validators.required],
			pet_dob:['', Validators.required],
			pet_size:['', Validators.required]
			
		});*/
		
		
		setTimeout(() => {
				this.faded = true;
		},100);
	}
	
	loadPet(id:string) {
		console.log(id);
		
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		//const requestOptions = new RequestOptions({ headers: headers });

		this.http.get(wordpress_url+'/petdataget.php?pet_id='+id)
		.subscribe(res => {
			this.pets = res.json();
			console.log(this.pets);
			if(this.pets)
			{
				this.pet_id=this.pets[0]["pet_id"];
				this.userid=this.pets[0]["userid"];
				this.pet_name=this.pets[0]["pet_name"];
				this.pet_category=this.pets[0]["pet_category"];
				this.pet_breed=this.pets[0]["pet_breed"];
				this.pet_dob=this.pets[0]["pet_dob"];
				this.pet_size=this.pets[0]["pet_size"];
				if(this.pets[0]["file_name"])
				{
					this.file_name = wordpress_url+'/uploads/'+this.pets[0]["file_name"];
				}
				/*this.base64.encodeFile(strImage).then((base64File: string) => {
					this.avatar = base64File;
				}, (err) => {
					console.log(err);
				});*/
				
			}
		}, err => {
			console.log(err);
			this.Toast.showShortBottom(err.json()["message"]).subscribe(
				toast => {},
				error => {console.log(error);}
			);
		});
		
	}
	
	editAvatar(){
		this.Camera.getPicture({
			quality: 100,
			sourceType:0,
			allowEdit: true,
			targetWidth: 180,
			targetHeight: 180,
			destinationType: 0
		}).then((imageData) => {
			this.avatar = 'data:image/jpeg;base64,' + imageData;
			
		}, (err) => {});
	}
	
	deleteData(){
		let headers = new Headers();
		//headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		headers.set('Content-Type', 'application/json; charset=UTF-8');
		

		const params = new FormData();
		params["pet_id"] = this.pet_id;
		if(this.id)
		{
			params["mode"] = "delete";
			this.core.showLoading();
			console.log(JSON.stringify(params));
			this.http.post(wordpress_url+'/petdataupload.php',JSON.stringify(params),{
				headers: headers,
				withCredentials: false
			} )
			.subscribe(res => {
				console.log(res);
					this.core.hideLoading();
					//var result = res.text();
					this.events.publish('RefreshPetsPage');
					this.navCtrl.pop();
					/*if (result=="5468")
					{
						console.log("One Hi");
					}
					else
					{
						console.log("One H2222223");					
					}*/
				//this.gotoLogin();
			}, err => {
				this.core.hideLoading();
				/*this.Toast.showShortBottom(err.json()["message"]).subscribe(
					toast => {},
					error => {console.log(error);}
				);*/
				console.log(err);
			});
		}
		else
		{
			this.events.publish('RefreshPetsPage');
			this.navCtrl.pop();
		}
		
		
		
		
		
	};
	postData(){
		let headers = new Headers();
		//headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		headers.set('Content-Type', 'application/json; charset=UTF-8');
		
		//headers.set('Authorization', 'Bearer '+this.login["token"]);
		
		//let params = new URLSearchParams();
		/*params.append('pet_id', this.pet_id);
		params.append('userid', this.userid);
		params.append('pet_name', this.pet_name);
		params.append('pet_category', this.pet_category);
		params.append('pet_breed', this.pet_breed);
		params.append('pet_dob', this.pet_dob);
		params.append('pet_size', this.pet_size);
		params.append('data', this.avatar);*/
		const params = new FormData();
		params["pet_id"] = this.pet_id;
		params["userid"] = this.userid;
		params["pet_name"] = this.pet_name;
		params["pet_category"] = this.pet_category;
		params["pet_breed"] = this.pet_breed;
		params["pet_dob"] = this.pet_dob;
		params["pet_size"] = this.pet_size;
		params["data"] = this.avatar;
		if(this.id)
		{
			params["mode"] = "edit";
		}
		else
		{
			params["mode"] = "add";
		}
		
		

		//params = this.core.objectToURLParams(params);
		//let params = this.formPetInfo.value;
		/*	var params = {
			
			"pet_id":this.pet_id,
			"userid" :this.userid,
			"pet_name" :this.pet_name,
			"pet_category" :this.pet_category,
			"pet_breed" :this.pet_breed,
			"pet_dob" :this.pet_dob,
			"pet_size" :this.pet_size,
			
			"data" :this.avatar
		};*/
		//let params: URLSearchParams = new URLSearchParams();
		/*let params={
			pet_id:this.pet_id,
			userid :this.userid,
			pet_name :this.pet_name,
			pet_category :this.pet_category,
			pet_breed :this.pet_breed,
			pet_dob :this.pet_dob,
			pet_size :this.pet_size,
			
			data :this.avatar
			
			};*/
		
		
		/*let params = new FormData();
		params.append('pet_id', this.pet_id);
		params.append('userid', this.userid);
		params.append('pet_name', this.pet_name);
		params.append('pet_category', this.pet_category);
		params.append('pet_breed', this.pet_breed);
		params.append('pet_dob', this.pet_dob);
		params.append('pet_size', this.pet_size);
		params.append('data', this.avatar);*/
		//params["display_name"] = params["first_name"];
		//params = this.core.objectToURLParams(params);
		this.core.showLoading();
		//var headers = new Headers();
		//headers.append("Accept", 'application/json');
		//headers.append('Content-Type', 'application/json' );
		//const requestOptions = new RequestOptions({ headers: headers });
		/*this.http.post(wordpress_url+'/petdataupload.php', {
				search: this.core.objectToURLParams(params)
			})*/
			//console.log(params);
			//string param = JSON.stringify(params);
		console.log(JSON.stringify(params));
		this.http.post(wordpress_url+'/petdataupload.php',JSON.stringify(params),{
			headers: headers,
			withCredentials: false
		} )
		.subscribe(res => {
			console.log(res);
				this.core.hideLoading();
				//var result = res.text();
				this.events.publish('RefreshPetsPage');
				this.navCtrl.pop();
				/*if (result=="5468")
				{
					console.log("One Hi");
				}
				else
				{
					console.log("One H2222223");					
				}*/
			//this.gotoLogin();
		}, err => {
			this.core.hideLoading();
			/*this.Toast.showShortBottom(err.json()["message"]).subscribe(
				toast => {},
				error => {console.log(error);}
			);*/
			console.log(err);
		});
	};
	
	getData() {
		this.storageMul.get(['login']).then((val) => {
			this.login = val['login'];
			if (this.login )
			{
				var currdate = new Date().toLocaleString();
				console.log(this.login['username']);
				this.pet_id=this.login['username']+currdate;
				this.userid=this.login['username'];
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
			}
			else
			{
				
				this.navCtrl.pop();
			};

		});
		};
	}
	
	
}

