import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Custom
import { Core } from '../../service/core.service';

// Page
import { DetailPage } from '../detail/detail';

declare var wordpress_url: string;
declare var wordpress_per_page: Number;

@Component({
	selector: 'page-latest',
	templateUrl: 'latest.html',
	providers: [Core]
})
export class LatestPage {
	DetailPage = DetailPage;
	page = 1; products: Object[] = []; over: boolean;
	noProduct:boolean = false;
	loaddata: boolean = false;
	faded: boolean = false;
	constructor(private core: Core, private http: Http) {
		this.getProducts().subscribe(products => {
			if (products && products.length > 0){
				this.loaddata = true;
				this.page++;
				setTimeout(() => {
					this.faded = true;
				},100);
				this.products = products;
			} else {
				this.faded = true;
				this.loaddata = true;
				this.noProduct = true;
			} 
		});
	}
	getProducts(): Observable<Object[]> {
		return new Observable(observable => {
			let params = { post_num_page: this.page, post_per_page: wordpress_per_page };
			this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
				search: this.core.objectToURLParams(params)
			}).subscribe(products => {
				observable.next(products.json());
				observable.complete();
			});
		});
	}
	doRefresh(refresher) {
		this.page = 1;
		this.faded = false;
		this.getProducts().subscribe(products => {
			if (products && products.length > 0) this.page++;
			this.products = [];
			this.products = products;
			this.over = false;
			setTimeout(() => {
				this.faded = true;
			},100);
			refresher.complete();
		});
	}
	load(infiniteScroll) {
		this.getProducts().subscribe(products => {
			if (products && products.length > 0) {
				this.page++;
				this.products = this.products.concat(products);
			} else this.over = true;
			infiniteScroll.complete();
		});
	}
}
