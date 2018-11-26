import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

@Component({
	selector: 'page-petinfo',
	templateUrl: 'petinfo.html'
})
export class PetinfoPage {
	formPetInfo: FormGroup;
	avatar:string;
	//selectOptions: selectOptions;
	faded: boolean = false;
	constructor(
	private formBuilder: FormBuilder,
	private Camera: Camera,
	private Toast: Toast
	) 
	{
		/*this.selectOptions = {
		  title: 'Dog Breed',
		  subTitle: 'Select your dog breed',
		  mode: 'md'
		};*/
		this.formPetInfo = formBuilder.group({
			PetName:['', Validators.required],
			PetBreed:['', Validators.required],
			PetDOB:['', Validators.required],
			PetGender:['', Validators.required],
			PetSize:['', Validators.required],
			PetNeutred:['', Validators.required]
		});
		
		setTimeout(() => {
				this.faded = true;
		},100);
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
	
	
}

