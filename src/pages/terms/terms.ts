import { Component } from '@angular/core';

@Component({
	selector: 'page-terms',
	templateUrl: 'terms.html'
})
export class TermsPage {
	faded: boolean = false;
	constructor() {
		setTimeout(() => {
				this.faded = true;
		},100);
	}
}