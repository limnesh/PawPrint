import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'page-petinfo',
	templateUrl: 'petinfo.html'
})
export class PetinfoPage {
	formPetInfo: FormGroup;
	//selectOptions: selectOptions;
	faded: boolean = false;
	constructor(
	private formBuilder: FormBuilder
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
			PetSize:['', Validators.required]
		});
		
		setTimeout(() => {
				this.faded = true;
		},100);
	}
	
	
}

