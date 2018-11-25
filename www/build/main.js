webpackJsonp([2],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MissingTranslationHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TranslateStaticLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TranslateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_merge__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toArray__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__translate_parser__ = __webpack_require__(234);








var MissingTranslationHandler = (function () {
    function MissingTranslationHandler() {
    }
    return MissingTranslationHandler;
}());
var TranslateLoader = (function () {
    function TranslateLoader() {
    }
    return TranslateLoader;
}());
var TranslateStaticLoader = (function () {
    function TranslateStaticLoader(http, prefix, suffix) {
        if (prefix === void 0) { prefix = "i18n"; }
        if (suffix === void 0) { suffix = ".json"; }
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    TranslateStaticLoader.prototype.getTranslation = function (lang) {
        return this.http.get(this.prefix + "/" + lang + this.suffix)
            .map(function (res) { return res.json(); });
    };
    return TranslateStaticLoader;
}());
var TranslateService = (function () {
    /**
     *
     * @param http The Angular 2 http provider
     * @param currentLoader An instance of the loader currently used
     * @param missingTranslationHandler A handler for missing translations.
     */
    function TranslateService(currentLoader, missingTranslationHandler) {
        this.currentLoader = currentLoader;
        this.missingTranslationHandler = missingTranslationHandler;
        /**
         * The lang currently used
         */
        this.currentLang = this.defaultLang;
        /**
         * An EventEmitter to listen to translation change events
         * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
         *     // do something
         * });
         * @type {ng.EventEmitter<TranslationChangeEvent>}
         */
        this.onTranslationChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        /**
         * An EventEmitter to listen to lang change events
         * onLangChange.subscribe((params: LangChangeEvent) => {
         *     // do something
         * });
         * @type {ng.EventEmitter<LangChangeEvent>}
         */
        this.onLangChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.translations = {};
        this.langs = [];
        this.parser = new __WEBPACK_IMPORTED_MODULE_7__translate_parser__["a" /* Parser */]();
    }
    /**
     * Sets the default language to use as a fallback
     * @param lang
     */
    TranslateService.prototype.setDefaultLang = function (lang) {
        this.defaultLang = lang;
    };
    /**
     * Gets the default language used
     * @returns string
     */
    TranslateService.prototype.getDefaultLang = function () {
        return this.defaultLang;
    };
    /**
     * Changes the lang currently used
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.use = function (lang) {
        var _this = this;
        var pending;
        // check if this language is available
        if (typeof this.translations[lang] === "undefined") {
            // not available, ask for it
            pending = this.getTranslation(lang);
        }
        if (typeof pending !== "undefined") {
            // on init set the currentLang immediately
            if (!this.currentLang) {
                this.currentLang = lang;
            }
            pending.subscribe(function (res) {
                _this.changeLang(lang);
            });
            return pending;
        }
        else {
            this.changeLang(lang);
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(this.translations[lang]);
        }
    };
    /**
     * Gets an object of translations for a given language with the current loader
     * @param lang
     * @returns {Observable<*>}
     */
    TranslateService.prototype.getTranslation = function (lang) {
        var _this = this;
        this.pending = this.currentLoader.getTranslation(lang).share();
        this.pending.subscribe(function (res) {
            _this.translations[lang] = res;
            _this.updateLangs();
        }, function (err) {
            throw err;
        }, function () {
            _this.pending = undefined;
        });
        return this.pending;
    };
    /**
     * Manually sets an object of translations for a given language
     * @param lang
     * @param translations
     * @param shouldMerge
     */
    TranslateService.prototype.setTranslation = function (lang, translations, shouldMerge) {
        if (shouldMerge === void 0) { shouldMerge = false; }
        if (shouldMerge && this.translations[lang]) {
            Object.assign(this.translations[lang], translations);
            this.onTranslationChange.emit({ translations: translations, lang: lang });
        }
        else {
            this.translations[lang] = translations;
        }
        this.updateLangs();
    };
    /**
     * Returns an array of currently available langs
     * @returns {any}
     */
    TranslateService.prototype.getLangs = function () {
        return this.langs;
    };
    /**
     * @param langs
     * Add available langs
     */
    TranslateService.prototype.addLangs = function (langs) {
        var _this = this;
        langs.forEach(function (lang) {
            if (_this.langs.indexOf(lang) === -1) {
                _this.langs.push(lang);
            }
        });
    };
    /**
     * Update the list of available langs
     */
    TranslateService.prototype.updateLangs = function () {
        this.addLangs(Object.keys(this.translations));
    };
    /**
     * Returns the parsed result of the translations
     * @param translations
     * @param key
     * @param interpolateParams
     * @returns {any}
     */
    TranslateService.prototype.getParsedResult = function (translations, key, interpolateParams) {
        var res;
        if (key instanceof Array) {
            var result = {}, observables = false;
            for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                var k = key_1[_i];
                result[k] = this.getParsedResult(translations, k, interpolateParams);
                if (typeof result[k].subscribe === "function") {
                    observables = true;
                }
            }
            if (observables) {
                var mergedObs = void 0;
                for (var _a = 0, key_2 = key; _a < key_2.length; _a++) {
                    var k = key_2[_a];
                    var obs = typeof result[k].subscribe === "function" ? result[k] : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(result[k]);
                    if (typeof mergedObs === "undefined") {
                        mergedObs = obs;
                    }
                    else {
                        mergedObs = mergedObs.merge(obs);
                    }
                }
                return mergedObs.toArray().map(function (arr) {
                    var obj = {};
                    arr.forEach(function (value, index) {
                        obj[key[index]] = value;
                    });
                    return obj;
                });
            }
            return result;
        }
        if (translations) {
            res = this.parser.interpolate(this.parser.getValue(translations, key), interpolateParams);
        }
        if (typeof res === "undefined" && this.defaultLang && this.defaultLang !== this.currentLang) {
            res = this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang], key), interpolateParams);
        }
        if (!res && this.missingTranslationHandler) {
            res = this.missingTranslationHandler.handle(key);
        }
        return res !== undefined ? res : key;
    };
    /**
     * Gets the translated value of a key (or an array of keys)
     * @param key
     * @param interpolateParams
     * @returns {any} the translated key, or an object of translated keys
     */
    TranslateService.prototype.get = function (key, interpolateParams) {
        var _this = this;
        if (!key) {
            throw new Error("Parameter \"key\" required");
        }
        // check if we are loading a new translation to use
        if (this.pending) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                var onComplete = function (res) {
                    observer.next(res);
                    observer.complete();
                };
                _this.pending.subscribe(function (res) {
                    res = _this.getParsedResult(res, key, interpolateParams);
                    if (typeof res.subscribe === "function") {
                        res.subscribe(onComplete);
                    }
                    else {
                        onComplete(res);
                    }
                });
            });
        }
        else {
            var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
            if (typeof res.subscribe === "function") {
                return res;
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(res);
            }
        }
    };
    /**
     * Returns a translation instantly from the internal state of loaded translation.
     * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
     * @param key
     * @param interpolateParams
     * @returns {string}
     */
    TranslateService.prototype.instant = function (key, interpolateParams) {
        if (!key) {
            throw new Error("Parameter \"key\" required");
        }
        var res = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
        if (typeof res.subscribe !== "undefined") {
            if (key instanceof Array) {
                var obj_1 = {};
                key.forEach(function (value, index) {
                    obj_1[key[index]] = key[index];
                });
                return obj_1;
            }
            return key;
        }
        else {
            return res;
        }
    };
    /**
     * Sets the translated value of a key
     * @param key
     * @param value
     * @param lang
     */
    TranslateService.prototype.set = function (key, value, lang) {
        if (lang === void 0) { lang = this.currentLang; }
        this.translations[lang][key] = value;
        this.updateLangs();
        this.onTranslationChange.emit({ translations: (_a = {}, _a[key] = value, _a), lang: lang });
        var _a;
    };
    /**
     * Changes the current lang
     * @param lang
     */
    TranslateService.prototype.changeLang = function (lang) {
        this.currentLang = lang;
        this.onLangChange.emit({ lang: lang, translations: this.translations[lang] });
    };
    /**
     * Allows to reload the lang file from the file
     * @param lang
     * @returns {Observable<any>}
     */
    TranslateService.prototype.reloadLang = function (lang) {
        this.resetLang(lang);
        return this.getTranslation(lang);
    };
    /**
     * Deletes inner translation
     * @param lang
     */
    TranslateService.prototype.resetLang = function (lang) {
        this.translations[lang] = undefined;
    };
    TranslateService.prototype.getBrowserLang = function () {
        if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
            return undefined;
        }
        var browserLang = window.navigator.languages ? window.navigator.languages[0] : null;
        browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
        if (browserLang.indexOf('-') !== -1) {
            browserLang = browserLang.split('-')[0];
        }
        if (browserLang.indexOf('_') !== -1) {
            browserLang = browserLang.split('_')[0];
        }
        return browserLang;
    };
    TranslateService.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */] },
    ];
    /** @nocollapse */
    TranslateService.ctorParameters = [
        { type: TranslateLoader, },
        { type: MissingTranslationHandler, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */] },] },
    ];
    return TranslateService;
}());


/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__detail_detail__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__categories_categories__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__detail_category_detail_category__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__latest_latest__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__favorite_favorite__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__about_about__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__terms_terms__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__privacy_privacy__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__contact_contact__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__popupads_popupads__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__module_ng2_translate__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom






// Page











var HomePage = /** @class */ (function () {
    function HomePage(http, core, translate, navCtrl, InAppBrowser, platform, OneSignal, alertCtrl, config, storage, screenOrientation, modalCtrl) {
        var _this = this;
        this.http = http;
        this.core = core;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.InAppBrowser = InAppBrowser;
        this.alertCtrl = alertCtrl;
        this.config = config;
        this.storage = storage;
        this.screenOrientation = screenOrientation;
        this.modalCtrl = modalCtrl;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_9__detail_detail__["a" /* DetailPage */];
        this.CategoriesPage = __WEBPACK_IMPORTED_MODULE_10__categories_categories__["a" /* CategoriesPage */];
        this.DetailCategoryPage = __WEBPACK_IMPORTED_MODULE_11__detail_category_detail_category__["a" /* DetailCategoryPage */];
        this.LatestPage = __WEBPACK_IMPORTED_MODULE_12__latest_latest__["a" /* LatestPage */];
        this.FavoritePage = __WEBPACK_IMPORTED_MODULE_13__favorite_favorite__["a" /* FavoritePage */];
        this.AboutPage = __WEBPACK_IMPORTED_MODULE_14__about_about__["a" /* AboutPage */];
        this.TermsPage = __WEBPACK_IMPORTED_MODULE_15__terms_terms__["a" /* TermsPage */];
        this.PrivacyPage = __WEBPACK_IMPORTED_MODULE_16__privacy_privacy__["a" /* PrivacyPage */];
        this.ContactPage = __WEBPACK_IMPORTED_MODULE_17__contact_contact__["a" /* ContactPage */];
        this.PopupadsPage = __WEBPACK_IMPORTED_MODULE_18__popupads_popupads__["a" /* PopupadsPage */];
        this.products = [];
        this.categories = [];
        this.clientSay = [];
        this.latestIndex = null;
        this.faded = false;
        this.display = display_mode;
        platform.ready().then(function () {
            if (platform.is('cordova')) {
                OneSignal.getIds().then(function (userId) {
                    config.set('userID', userId['userId']);
                });
                OneSignal.startInit(onesignal_app_id);
                OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification);
                OneSignal.handleNotificationOpened().subscribe(function (res) {
                    var payload = res.notification.payload;
                    if (payload && payload['launchURL'])
                        _this.openLink(payload['launchURL'], true);
                });
                OneSignal.endInit();
            }
            storage.get('login').then(function (login) {
                if (login && login['token']) {
                    var params = {};
                    params['jwt_token'] = login['token'];
                }
                var getstatic = function () {
                    var params = {};
                    http.get(wordpress_url + '/wp-json/modernshop/static/gettextstatic', {
                        search: core.objectToURLParams(params)
                    }).subscribe(function (res) {
                        if (res.json()['login_expired']) {
                            storage.remove('login').then(function () {
                                translate.get('general').subscribe(function (trans) {
                                    var alert = alertCtrl.create({
                                        message: trans['login_expired']['message'],
                                        cssClass: 'alert-no-title',
                                        enableBackdropDismiss: false,
                                        buttons: [trans['login_expired']['button']]
                                    });
                                    alert.present();
                                });
                            });
                        }
                        config.set('text_static', res.json()['text_static']);
                        config.set('currency', res.json()['currency']);
                        config.set('required_login', res.json()['required_login']);
                        _this.statictext = config['text_static'];
                        _this.buttonCart;
                        _this.getData();
                    }, function (error) {
                        showAlertfirst();
                    });
                    http.get(wordpress_url + '/wp-json/wooconnector/settings/getactivelocaltion')
                        .subscribe(function (location) {
                        config.set('countries', location.json()['countries']);
                        config.set('states', location.json()['states']);
                    });
                    var showAlertfirst = function () {
                        translate.get('general').subscribe(function (trans) {
                            var alert = alertCtrl.create({
                                message: trans['error_first']['message'],
                                cssClass: 'alert-no-title',
                                enableBackdropDismiss: false,
                                buttons: [
                                    {
                                        text: trans['error_first']['button'],
                                        handler: function () {
                                            var popupDismiss = alert.dismiss();
                                            popupDismiss.then(function () {
                                                getstatic();
                                                _this.getData();
                                                _this.getPopupHomePage();
                                            });
                                            return false;
                                        }
                                    }
                                ]
                            });
                            alert.present();
                        });
                    };
                };
                getstatic();
            });
        });
        storage.get('require').then(function (val) {
            if (!val)
                _this.getPopupHomePage();
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        if (this.statictext)
            this.buttonCart.update();
    };
    HomePage.prototype.openLinkFooter = function (url, external) {
        if (external === void 0) { external = false; }
        if (!url)
            return;
        else
            this.InAppBrowser.create(url, open_target_blank ? "_blank" : "_system", "location=no");
    };
    HomePage.prototype.getPopupHomePage = function () {
        var _this = this;
        var url = wordpress_url + "/wp-json/wooconnector/popup/getpopuphomepage";
        var date = new Date();
        var date_gmt0 = new Date(date.toString()).toUTCString();
        this.http.get(url, {
            search: this.core.objectToURLParams({ 'datetime': date_gmt0 })
        }).subscribe(function (res) {
            if (res.json()) {
                _this.popup_homepage = res.json();
            }
        });
    };
    HomePage.prototype.closePopup = function (check) {
        this.popup_homepage = null;
        this.storage.set('require', true);
    };
    HomePage.prototype.getData = function (isRefreshing, refresher) {
        var _this = this;
        if (isRefreshing === void 0) { isRefreshing = false; }
        if (refresher === void 0) { refresher = null; }
        this.http.get(wordpress_url + '/wp-json/wooslider/product/getslider')
            .subscribe(function (res) {
            if (isRefreshing)
                delete _this.slides;
            _this.slides = res.json();
        });
        this.http.get(wordpress_url + '/wp-json/wooconnector/product/getdealofday', {
            search: this.core.objectToURLParams({
                post_per_page: 4
            })
        }).subscribe(function (res) {
            if (isRefreshing)
                delete _this.deal;
            _this.deal = res.json();
        });
        this.http.get(wordpress_url + '/wp-json/wooconnector/product/getnewcomment')
            .subscribe(function (res) {
            if (isRefreshing)
                delete _this.clientSay;
            _this.clientSay = res.json();
        });
        this.loadLatest();
        if (isRefreshing) {
            this.categories = [];
            this.loadCategories(refresher);
        }
        else
            this.loadCategories();
    };
    HomePage.prototype.doRefresh = function (refresher) {
        this.loadedProducts = false;
        this.loadedCategories = false;
        this.getData(true, refresher);
    };
    HomePage.prototype.loadLatest = function () {
        var _this = this;
        this.products = [];
        if (!this.latesting) {
            this.faded = false;
            var params = { post_per_page: 4 };
            this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
                search: this.core.objectToURLParams(params)
            }).subscribe(function (res) {
                var data = res.json();
                if (data.length != 0) {
                    _this.products = data;
                    console.log(_this.products);
                    setTimeout(function () {
                        _this.faded = true;
                    }, 100);
                }
                else
                    _this.products = [];
                _this.loadedProducts = true;
            });
        }
        else {
            this.faded = false;
            var params = { post_per_page: 4, post_category: this.latesting };
            this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproductbycategory', {
                search: this.core.objectToURLParams(params)
            }).subscribe(function (res) {
                var data = res.json();
                if (data['products'].length != 0) {
                    _this.products = data['products'];
                    console.log(_this.products);
                    setTimeout(function () {
                        _this.faded = true;
                    }, 100);
                }
                else
                    _this.products = [];
                _this.loadedProducts = true;
            });
        }
    };
    HomePage.prototype.loadCategories = function (refresher) {
        var _this = this;
        if (refresher === void 0) { refresher = null; }
        var params = { parent: '0', cat_per_page: 100, cat_num_page: 1 };
        var loadCategories = function () {
            _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getcategories', {
                search: _this.core.objectToURLParams(params)
            }).subscribe(function (res) {
                if (res.json() && res.json().length > 0)
                    _this.categories = _this.categories.concat(res.json());
                if (res.json() && res.json().length == 100) {
                    params.cat_num_page++;
                    loadCategories();
                }
                else {
                    if (refresher)
                        refresher.complete();
                    _this.loadedCategories = true;
                }
            });
        };
        loadCategories();
    };
    HomePage.prototype.openLink = function (url, external) {
        if (external === void 0) { external = false; }
        console.log(url);
        if (!url)
            return;
        if (url.indexOf("link://") == 0) {
            url = url.replace("link://", "");
            var data = url.split("/");
            if (data[0] == "product")
                this.navCtrl.push(this.DetailPage, { id: data[1] });
            else if (data[0] == "product-category")
                this.navCtrl.push(this.DetailCategoryPage, { id: data[1] });
            else if (data[0] == "bookmark")
                this.navCtrl.push(this.FavoritePage);
            else if (data[0] == "about-us")
                this.navCtrl.push(this.AboutPage);
            else if (data[0] == "term-and-conditions")
                this.navCtrl.push(this.TermsPage);
            else if (data[0] == "privacy-policy")
                this.navCtrl.push(this.PrivacyPage);
            else if (data[0] == "contact-us")
                this.navCtrl.push(this.ContactPage);
        }
        else
            this.InAppBrowser.create(url, open_target_blank ? "_blank" : "_system", "location=no");
    };
    HomePage.prototype.changeLatest = function (id, index) {
        if (index === void 0) { index = null; }
        this.latesting = id;
        this.latestIndex = index;
        this.loadedProducts = false;
        this.loadLatest();
    };
    HomePage.prototype.onSwipe = function (e) {
        if (e['deltaX'] < -150 || e['deltaX'] > 150) {
            if (e['deltaX'] > 0) {
                if (this.latestIndex == 0)
                    this.changeLatest(0);
                else if (this.categories[Number(this.latestIndex) - 1])
                    this.changeLatest(this.categories[Number(this.latestIndex) - 1]['id'], Number(this.latestIndex) - 1);
            }
            else {
                if (this.latestIndex == null && this.categories.length > 0)
                    this.changeLatest(this.categories[0]['id'], 0);
                else if (this.categories[Number(this.latestIndex) + 1])
                    this.changeLatest(this.categories[Number(this.latestIndex) + 1]['id'], Number(this.latestIndex) + 1);
            }
        }
    };
    HomePage.prototype.onSwipeContent = function (e) {
        if (e['deltaX'] < -150)
            this.navCtrl.push(this.CategoriesPage);
    };
    HomePage.prototype.viewAll = function () {
        if (this.latesting)
            this.navCtrl.push(this.DetailCategoryPage, { id: this.latesting });
        else
            this.navCtrl.push(this.LatestPage);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cart'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "buttonCart", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slide_update'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "slide_Update", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\home\home.html"*/'<ion-header (swipe)="onSwipeContent($event)">\n  <ion-navbar>\n    <ion-title><img class="home-title" float-left src="assets/images/logo.png"/></ion-title>\n	<ion-buttons end>\n		<button-cart *ngIf="statictext" #cart icon="icon-bag"></button-cart>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<div class="popup-homepage" *ngIf="popup_homepage">\n    <div class="popup-overlay"></div>\n    <div class="popup-img">\n    	<ion-icon class="icon-closepopup icomoon-close-thin" name="ios-close" (click)="closePopup()"></ion-icon>\n        <!-- <span class="icomoon-close-thin" (click)="popup_homepage=null"></span> -->\n        <img src="{{popup_homepage.popup}}" (click)="openLink(popup_homepage.link_popup, true)">\n    </div>\n</div>\n<ion-content>\n<!-- Refresh -->\n<ion-refresher (ionRefresh)="doRefresh($event)">\n	<ion-refresher-content\n		[pullingIcon]="\'general.pullingIcon\'|translate"\n		[pullingText]="\'general.pullToRefresh\'|translate"\n		[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n		[refreshingText]="\'general.refreshing\'|translate">\n	</ion-refresher-content>\n</ion-refresher>\n<!-- Slider -->\n<ion-slides #slide_update *ngIf="slides && 0 < slides.length" class="slides-home" pager="true" loop="true" autoplay="5000" dir="{{display}}">\n	<ion-slide *ngFor="let slide of slides" tappable (click)="openLink(slide.url)">\n		<img [src]="slide.slider_images" float-left />\n		<!-- <img-loader useImg float-left src="{{slide.slider_images}}"></img-loader> -->\n	</ion-slide>\n</ion-slides>\n<!-- Deal of the day -->\n<div *ngIf="deal && 0<deal.length" (swipe)="onSwipeContent($event)">\n	<div padding-horizontal padding-top text-uppercase dark relative>\n		<b>{{\'home.deal\'|translate}}</b>\n		<ion-icon absolute name="icon-tag" primary icon-big></ion-icon>\n	</div>\n	<ion-row padding-8 wrap>\n		<ion-col padding-8 width-50 *ngFor="let product of deal" [navPush]="DetailPage" [navParams]="{id:product.id}">\n			<div relative float-left product-border>\n				<img float-left *ngIf="product.modernshop_images[0].modern_square" [src]="product.modernshop_images[0].modern_square" />\n				<img float-left *ngIf="!product.modernshop_images[0].modern_square" src="assets/images/no-image.png" />\n				<div absolute bottom primary-bg product-sale *ngIf="product.sale_price && product.type!=\'variable\' && product.type!=\'grouped\'">\n					<span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n				</div>\n				<img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n				<img absolute icon-outstock *ngIf="!product.in_stock" src="assets/images/outstock.png" />\n			</div>\n			<p float-left width-100>\n				<span *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n					<!-- <b dark font-120>{{product.price*1||0|price}}</b> -->\n					<!-- <span *ngIf="product.sale_price" margin-left text-through >{{product.regular_price*1|price}}</span> -->\n					<span class="simple-price" [innerHTML]="product.price_html"></span>\n				</span>\n				<span *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n					<b dark font-120 [innerHTML]="product.price_html"></b>\n				</span>\n			</p>\n			<span float-left width-100 [innerHTML]="product.name"></span>\n		</ion-col>\n	</ion-row>\n</div>\n<!-- Latest -->\n<div padding-horizontal padding-top text-uppercase dark (swipe)="onSwipeContent($event)"><b>{{\'home.latest\'|translate}}</b></div>\n<ion-scroll dir="ltr" scrollX="true" *ngIf="categories && 0<categories.length" class="scroll-categories latest">\n	<button ion-button clear class="disable-hover" [color]="latesting?\'gray\':\'primary\'" no-margin (click)="changeLatest(0)">\n		<span [innerHTML]="\'home.all\'|translate"></span>\n	</button>\n	<button ion-button clear class="disable-hover" [color]="category.id==latesting?\'primary\':\'gray\'" no-margin *ngFor="let category of categories; let i=index" (click)="changeLatest(category.id, i)">\n		<span [innerHTML]="category.name"></span>\n	</button>\n</ion-scroll>\n<ion-spinner *ngIf="!loadedProducts" name="ios" margin-auto margin-top></ion-spinner>\n<!-- <div (swipe)="onSwipe($event)"> -->\n<div (swipe)="onSwipeContent($event)" >\n	<ion-row padding-8 wrap *ngIf="products && products.length > 0" class="faded-content" [ngClass]="{\'faded-has-content\':faded}">\n		<ion-col padding-8 width-50 *ngFor="let product of products" [navPush]="DetailPage" [navParams]="{id:product.id}">\n			<div relative float-left product-border>\n				<img float-left *ngIf="product.modernshop_images[0].modern_square" [src]="product.modernshop_images[0].modern_square" />\n				<img float-left *ngIf="!product.modernshop_images[0].modern_square" src="assets/images/no-image.png" />\n				<div absolute bottom primary-bg product-sale *ngIf="product.sale_price && product.type!=\'variable\' && product.type!=\'grouped\'">\n					<span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n				</div>\n				<img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n				<img absolute icon-outstock *ngIf="!product.in_stock" src="assets/images/outstock.png" />\n			</div>\n			<p float-left width-100>\n				<span *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n					<!-- <b dark font-120>{{product.price*1||0|price}}</b>\n					<span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n					<span dark class="simple-price" [innerHTML]="product.price_html"></span>\n				</span>\n				<span *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n					<b dark font-120 [innerHTML]="product.price_html"></b>\n				</span>\n			</p>\n			<span float-left width-100 [innerHTML]="product.name"></span>\n		</ion-col>\n	</ion-row>\n	<div text-center *ngIf="products.length == 0 && loadedProducts" class="no-data" margin-top>{{\'general.no_data\'|translate}}</div>\n</div>\n<button ion-button *ngIf="loadedProducts && products.length != 0" clear class="disable-hover" block color="gray" (click)="viewAll()">{{\'home.viewAll\'|translate}}</button>\n<!-- Categories -->\n<div padding text-uppercase dark (swipe)="onSwipeContent($event)"><b>{{\'home.categories\'|translate}}</b></div>\n<ion-spinner *ngIf="!loadedCategories" name="ios" margin-auto></ion-spinner>\n<ion-scroll dir="{{displays}}" *ngIf="loadedCategories && 0<categories.length" scrollX="true" class="scroll-categories">\n	<div relative *ngFor="let category of categories" class="item-categories" [navPush]="DetailCategoryPage" [navParams]="{id:category.id}">\n		<ion-row center mark absolute width-100 height-100>\n			<div margin-auto light text-center [innerHTML]="category.name"></div>\n		</ion-row>\n		<img *ngIf="category.modernshop_images_categories && category.modernshop_images_categories.modern_square" [src]="category.modernshop_images_categories.modern_square" />\n		<img *ngIf="!category.modernshop_images_categories || !category.modernshop_images_categories.modern_square" src="assets/images/no-image.png" />\n	</div>\n</ion-scroll>\n<div text-center *ngIf="loadedCategories && categories.length<1" class="no-data">{{\'home.no_categories\'|translate}}</div>\n<!-- Client Say -->\n<div relative margin-top *ngIf="clientSay && 0<clientSay.length" class="client-say" light overflow>\n	<img width-100 float-left src="assets/images/client-say-bg.png" />\n	<div mark absolute width-100 height-100 text-center></div>\n	<div absolute width-100 height-100 overflow>\n		<div absolute width-100 padding text-center>{{\'home.whatClientSay\'|translate}}</div>\n		<ion-slides pager="true" class="slides-client-say" loop="true" autoplay="3000" dir="{{display}}">\n			<ion-slide *ngFor="let slide of clientSay" text-center>\n				<div padding-8 [innerHTML]="\'“ \'+(slide.comment_content|viewmore:50)+\' ”\'"></div>\n				<div padding-8>\n					<div><small [innerHTML]="slide.user+\' - \'+(slide.comment_date_gmt|timeAgo)"></small></div>\n					<div class="rate"><div class="rating" [style.width]="slide.rating*20+\'%\'"></div></div>\n				</div>\n			</ion-slide>\n		</ion-slides>\n	</div>\n</div>\n<div (swipe)="onSwipeContent($event)">\n<!-- Service -->\n<ion-row wrap padding *ngIf="statictext">\n	<!-- <ion-col *ngFor="let service of \'home.services\'|translate" width-50> -->\n		<!-- <div secondary-bg text-center padding-4 padding-vertical height-100> -->\n			<!-- <div><ion-icon primary [name]="service.icon" class="services-icon"></ion-icon></div> -->\n			<!-- <div dark><b>{{service.title}}</b><br/></div> -->\n			<!-- <span font-80>{{service.text}}</span> -->\n		<!-- </div> -->\n	<!-- </ion-col> -->\n	<ion-col width-50 margin-auto *ngIf="statictext.modern_homepage_title_1 || statictext.modern_description_homepage_1">\n		<div secondary-bg text-center padding-4 padding-vertical height-100>\n			<div><ion-icon primary name="icon-reply" class="services-icon"></ion-icon></div>\n			<div dark><b [innerHTML]="statictext.modern_homepage_title_1"></b><br/></div>\n			<div font-80 [innerHTML]="statictext.modern_description_homepage_1"></div>\n		</div>\n	</ion-col>\n	<ion-col width-50 margin-auto *ngIf="statictext.modern_homepage_title_2 || statictext.modern_description_homepage_2">\n		<div secondary-bg text-center padding-4 padding-vertical height-100>\n			<div><ion-icon primary name="icon-check" class="services-icon"></ion-icon></div>\n			<div dark><b [innerHTML]="statictext.modern_homepage_title_2"></b><br/></div>\n			<div font-80 [innerHTML]="statictext.modern_description_homepage_2"></div>\n		</div>\n	</ion-col>\n	<ion-col width-50 margin-auto *ngIf="statictext.modern_homepage_title_3 || statictext.modern_description_homepage_3">\n		<div secondary-bg text-center padding-4 padding-vertical height-100>\n			<div><ion-icon primary name="icon-reload" class="services-icon"></ion-icon></div>\n			<div dark><b [innerHTML]="statictext.modern_homepage_title_3"></b><br/></div>\n			<div font-80 [innerHTML]="statictext.modern_description_homepage_3"></div>\n		</div>\n	</ion-col>\n	<ion-col width-50 margin-auto *ngIf="statictext.modern_homepage_title_4 || statictext.modern_description_homepage_4" >\n		<div secondary-bg text-center padding-4 padding-vertical height-100>\n			<div><ion-icon primary name="icon-phone" class="services-icon"></ion-icon></div>\n			<div dark><b [innerHTML]="statictext.modern_homepage_title_4"></b><br/></div>\n			<div font-80 [innerHTML]="statictext.modern_description_homepage_4"></div>\n		</div>\n	</ion-col>\n</ion-row>\n<!-- Newsletter -->\n<!-- <div padding bg-full class="news-letter"> -->\n	<!-- <div text-uppercase light><b>{{\'home.newsletter\'|translate}}</b></div> -->\n	<!-- <ion-item mode="md" bg-transparent no-padding> -->\n		<!-- <ion-input light placeholder="{{\'home.newsletterInput\'|translate}}"></ion-input> -->\n		<!-- <button no-padding-hard ion-button item-right clear class="disable-hover"><ion-icon light name="icon-mail"></ion-icon></button> -->\n	<!-- </ion-item> -->\n<!-- </div> -->\n<!-- About Footer -->\n<!-- <about-footer></about-footer> -->\n	<div padding light text-center class="footer-home" *ngIf="statictext">\n		<h5 text-uppercase margin-top >{{statictext.modern_footer_details_title}}</h5>\n		<p>{{statictext.modern_footer_address}}</p>\n		<a href="tel:{{statictext.modern_footer_phone}}">{{statictext.modern_footer_phone}}</a>\n		<p>{{statictext.modern_footer_email_domain}}</p>\n		<div padding-8 >\n			<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLinkFooter(statictext.modern_link_twitter, true)"><ion-icon name="icon-twitter"></ion-icon></button>\n			<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLinkFooter(statictext.modern_link_facebook, true)" ><ion-icon name="icon-facebook"></ion-icon></button>\n			<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLinkFooter(statictext.modern_link_google, true)"><ion-icon name="logo-instagram"></ion-icon></button>\n		</div>\n		<p>{{\'general.copyright\'|translate}}</p>\n	</div>\n</div>\n</ion-content>\n<ion-footer (swipe)="onSwipeContent($event)"><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_19__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__detail_detail__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom




//Pipes

// Page

var DetailCategoryPage = /** @class */ (function () {
    function DetailCategoryPage(navParams, core, http, storage, translate, Toast) {
        var _this = this;
        this.navParams = navParams;
        this.core = core;
        this.http = http;
        this.storage = storage;
        this.Toast = Toast;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_9__detail_detail__["a" /* DetailPage */];
        this.DetailCategoryPage = DetailCategoryPage_1;
        this.page = 1;
        this.sort = '-date';
        this.range = { lower: 0, upper: 0 };
        this.data = {};
        this.favorite = {};
        this.products = [];
        this.attributes = [];
        this.filter = { grid: true, open: null, value: {}, valueCustom: {} };
        this.categories = [];
        this.noResuilt = false;
        this.quantity = 1;
        this.trans = {};
        this.actionCart = [];
        this.cartArray = {};
        this.faded = false;
        this.loaddata = false;
        translate.get('detail').subscribe(function (trans) { return _this.trans = trans; });
        this.id = navParams.get('id');
        var params = { term_id: this.id };
        http.get(wordpress_url + '/wp-json/wooconnector/product/getcategories', {
            search: core.objectToURLParams(params)
        }).subscribe(function (res) {
            _this.data = res.json();
            _this.getProducts().subscribe(function (products) {
                if (products && products.length > 0) {
                    _this.checkCart();
                    _this.noResuilt = false;
                    _this.page++;
                    _this.products = products;
                    _this.loaded = true;
                    _this.loaddata = true;
                    setTimeout(function () {
                        _this.faded = true;
                    }, 100);
                    http.get(wordpress_url + '/wp-json/wooconnector/product/getattribute')
                        .subscribe(function (res) {
                        _this.attributes = res.json();
                        _this.attributes['custom'] = new __WEBPACK_IMPORTED_MODULE_8__pipes_object_to_array__["a" /* ObjectToArray */]().transform(_this.attributes['custom']);
                        _this.reset();
                    });
                }
                else {
                    _this.loaddata = true;
                    _this.noResuilt = true;
                }
            });
            _this.loadCategories();
        });
    }
    DetailCategoryPage_1 = DetailCategoryPage;
    DetailCategoryPage.prototype.ionViewDidEnter = function () {
        this.checkCart();
        this.getFavorite();
        this.buttonCart.update();
    };
    DetailCategoryPage.prototype.checkCart = function () {
        var _this = this;
        this.storage.get('cart').then(function (val) {
            var cartNew = Object.assign([], val);
            _this.cartArray = {};
            cartNew.forEach(function (productCart) {
                _this.cartArray[productCart['id']] = productCart['id'];
            });
        });
    };
    DetailCategoryPage.prototype.loadCategories = function () {
        var _this = this;
        var params = { cat_num_page: 1, cat_per_page: 100, parent: this.id };
        this.http.get(wordpress_url + '/wp-json/wooconnector/product/getcategories', {
            search: this.core.objectToURLParams(params)
        }).subscribe(function (res) {
            if (res.json() && res.json().length > 0)
                _this.categories = _this.categories.concat(res.json());
            if (res.json() && res.json().length == 100) {
                params.cat_num_page++;
                _this.loadCategories();
            }
        });
    };
    ;
    DetailCategoryPage.prototype.getFavorite = function () {
        var _this = this;
        this.storage.get('favorite').then(function (val) { if (val)
            _this.favorite = val; });
    };
    DetailCategoryPage.prototype.getProducts = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observable) {
            var tmpFilter = [];
            for (var filter in _this.filter['value']) {
                var attr = _this.filter['value'][filter];
                if (Object.keys(attr).length > 0)
                    for (var option in attr) {
                        if (attr[option]) {
                            var now = {};
                            now['keyattr'] = filter;
                            now['valattr'] = option;
                            now['type'] = 'attributes';
                            tmpFilter.push(now);
                        }
                    }
                ;
            }
            for (var filter in _this.filter['valueCustom']) {
                var attr = _this.filter['value'][filter];
                if (attr && Object.keys(attr).length > 0)
                    for (var option in attr) {
                        if (attr[option]) {
                            var now = {};
                            now['keyattr'] = filter;
                            now['valattr'] = option;
                            now['type'] = 'custom';
                            tmpFilter.push(now);
                        }
                    }
                ;
            }
            var params = {
                'post_category': _this.id.toString(),
                'post_num_page': _this.page,
                'post_per_page': wordpress_per_page,
            };
            var sortParams = _this.core.addSortToSearchParams(params, _this.sort);
            if (tmpFilter.length == 0 && !_this.range['lower'] && !_this.range['upper']) {
                _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
                    search: _this.core.objectToURLParams(params)
                }).subscribe(function (products) {
                    observable.next(products.json());
                    observable.complete();
                });
            }
            else {
                if (tmpFilter.length > 0)
                    params['attribute'] = JSON.stringify(tmpFilter);
                if (_this.range['lower'] != 0)
                    params['min_price'] = _this.range['lower'];
                if (_this.range['upper'] != 0)
                    params['max_price'] = _this.range['upper'];
                _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproductbyattribute', {
                    search: _this.core.objectToURLParams(params)
                }).subscribe(function (products) {
                    observable.next(products.json());
                    observable.complete();
                });
            }
        });
    };
    DetailCategoryPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.page = 1;
        this.faded = false;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0)
                _this.page++;
            _this.products = [];
            _this.products = products;
            _this.over = false;
            setTimeout(function () {
                _this.faded = true;
            }, 100);
            refresher.complete();
        });
    };
    DetailCategoryPage.prototype.load = function (infiniteScroll) {
        var _this = this;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.page++;
                _this.products = _this.products.concat(products);
            }
            else
                _this.over = true;
            infiniteScroll.complete();
        });
    };
    DetailCategoryPage.prototype.openCategory = function () {
        if (this.filter['open'] == 'category')
            this.filter['open'] = null;
        else
            this.filter['open'] = 'category';
    };
    DetailCategoryPage.prototype.openFilter = function () {
        if (this.filter['open'] == 'filter')
            this.filter['open'] = null;
        else
            this.filter['open'] = 'filter';
    };
    DetailCategoryPage.prototype.openSort = function () {
        if (this.filter['open'] == 'sort')
            this.filter['open'] = null;
        else
            this.filter['open'] = 'sort';
    };
    DetailCategoryPage.prototype.changeFavorite = function (product) {
        if (this.favorite[product["id"]]) {
            delete this.favorite[product["id"]];
            this.storage.set('favorite', this.favorite);
        }
        else {
            var data = {
                id: product["id"],
                name: product["name"],
                regular_price: product["regular_price"],
                sale_price: product["sale_price"],
                price: product["price"],
                on_sale: product["on_sale"],
                price_html: product["price_html"],
                type: product["type"]
            };
            if (product["modernshop_images"])
                data['images'] = product["modernshop_images"][0].modern_square;
            this.favorite[product["id"]] = data;
            this.storage.set('favorite', this.favorite);
        }
    };
    DetailCategoryPage.prototype.reset = function () {
        var _this = this;
        this.filter['value'] = {};
        this.filter['valueCustom'] = {};
        this.attributes['attributes'].forEach(function (attr) {
            _this.filter['value'][attr['slug']] = {};
        });
        this.attributes['custom'].forEach(function (attr) {
            _this.filter['valueCustom'][attr['slug']] = {};
        });
        this.range = { lower: 0, upper: 0 };
    };
    DetailCategoryPage.prototype.runFilter = function () {
        var _this = this;
        this.openFilter();
        this.page = 1;
        this.products = [];
        this.faded = false;
        this.loaded = false;
        this.loaddata = false;
        this.filtering = true;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.page++;
                _this.products = products;
                _this.filtering = false;
                _this.loaded = true;
                _this.loaddata = true;
                setTimeout(function () {
                    _this.faded = true;
                }, 100);
            }
            else {
                _this.loaddata = true;
                _this.noResuilt = true;
            }
        });
    };
    DetailCategoryPage.prototype.runSort = function () {
        var _this = this;
        this.filter['open'] = null;
        this.page = 1;
        this.products = [];
        this.loaded = false;
        this.faded = false;
        this.loaddata = false;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.page++;
                _this.products = products;
                _this.loaded = true;
                _this.loaddata = true;
                setTimeout(function () {
                    _this.faded = true;
                }, 100);
            }
            else {
                _this.loaddata = true;
                _this.noResuilt = true;
            }
        });
    };
    DetailCategoryPage.prototype.addtoCart = function (detail) {
        var _this = this;
        if (!detail['in_stock']) {
            this.Toast.showShortBottom("Out of Stock").subscribe(function (toast) { }, function (error) { console.log(error); });
            return;
        }
        var data = {};
        var idCart = detail["id"];
        data.idCart = idCart;
        data.id = detail["id"];
        data.name = detail["name"];
        if (detail["wooconnector_crop_images"])
            data.images = detail["wooconnector_crop_images"][0].wooconnector_medium;
        data.regular_price = detail["regular_price"];
        data.sale_price = detail["sale_price"];
        data.price = detail["price"];
        data.quantity = this.quantity;
        data.sold_individually = detail['sold_individually'];
        this.storage.get('cart').then(function (val) {
            var individually = false;
            if (!val)
                val = {};
            if (!val[idCart])
                val[idCart] = data;
            else {
                if (!detail['sold_individually'])
                    val[idCart].quantity += data.quantity;
                else
                    individually = true;
            }
            if (individually) {
                _this.Toast.showShortBottom(_this.trans['individually']['before'] + detail['name'] + _this.trans['individually']['after']).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
            else
                _this.storage.set('cart', val).then(function () {
                    _this.checkCart();
                    _this.buttonCart.update();
                    if (!detail['in_stock'] && detail['backorders'] == 'notify') {
                        _this.Toast.showShortBottom(_this.trans["addOut"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    }
                    else {
                        _this.Toast.showShortBottom(_this.trans["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    }
                });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cart'),
        __metadata("design:type", Object)
    ], DetailCategoryPage.prototype, "buttonCart", void 0);
    DetailCategoryPage = DetailCategoryPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail-category',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\detail-category\detail-category.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title><span no-wrap [innerHTML]="data.name"></span></ion-title>\n	<ion-buttons end>\n		<button-cart #cart icon="icon-bag"></button-cart>\n	</ion-buttons>\n  </ion-navbar>\n  <ion-toolbar class="header-filter">\n	<button *ngIf="categories && 0<categories.length" ion-button clear color="dark" no-margin (click)="openCategory()" class="disable-hover button-drop">\n		<span [attr.primary]="filter.open==\'category\' ? true : null">{{\'categories.category\'|translate}}</span>\n		<ion-icon name="md-arrow-dropdown"></ion-icon>\n	</button>\n	<button ion-button clear color="dark" no-margin (click)="openFilter()" class="disable-hover button-drop">\n		<span [attr.primary]="filter.open==\'filter\' ? true : null">{{\'categories.filter\'|translate}}</span>\n		<ion-icon name="md-arrow-dropdown"></ion-icon>\n	</button>\n	<button ion-button clear color="dark" no-margin (click)="openSort()" class="disable-hover button-drop">\n		<span [attr.primary]="filter.open==\'sort\' ? true : null">{{\'categories.sort\'|translate}}</span>\n		<ion-icon name="md-arrow-dropdown"></ion-icon>\n	</button>\n	<div float-right>\n		<button float-right ion-button clear color="dark" no-margin class="disable-hover"\n		[ngClass]="{\'disabled\':filter.grid}" (click)="filter.grid=false">\n			<ion-icon name="icon-order"></ion-icon>\n		</button>\n		<button float-right ion-button clear color="dark" no-margin class="disable-hover"\n		[ngClass]="{\'disabled\':!filter.grid}" (click)="filter.grid=true">\n			<ion-icon name="icon-grid-out"></ion-icon>\n		</button>\n	</div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n<!-- Refresh -->\n<ion-refresher (ionRefresh)="doRefresh($event)">\n	<ion-refresher-content\n		[pullingIcon]="\'general.pullingIcon\'|translate"\n		[pullingText]="\'general.pullToRefresh\'|translate"\n		[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n		[refreshingText]="\'general.refreshing\'|translate">\n	</ion-refresher-content>\n</ion-refresher>\n<!-- Category -->\n<ion-scroll tappable *ngIf="filter.open==\'category\'" ion-fixed width-100 height-100 mark (click)="filter.open=null" scrollY="true" class="list-categories">\n	<button detail-none ion-item *ngFor="let category of categories" [navPush]="DetailCategoryPage" [navParams]="{id:category.id}">\n		<ion-label dark [innerHTML]="category.name"></ion-label>\n	</button>\n</ion-scroll>\n<!-- Filter -->\n<div *ngIf="filter.open==\'filter\'" ion-fixed width-100 height-100 light-bg>\n	<ion-scroll width-100 height-100 scrollY="true">\n		<ion-list>\n			<!-- Range Price -->\n			<hide-show color="light">\n				<span this-title>\n					<b>{{\'categories.price_range\'|translate}}</b>\n					<span>{{range.lower|price}}</span><span *ngIf="0<range.upper"> - {{range.upper|price}}</span>\n				</span>\n				<ion-range mode="md" this-content dualKnobs="true" [min]="attributes.min_price" [max]="attributes.max_price" [(ngModel)]="range">\n				</ion-range>\n			</hide-show> \n			<hide-show color="light" *ngFor="let attr of attributes.attributes" class="filter-attribute">\n				<span this-title><b text-capitalize [innerHTML]="attr.name"></b></span>\n				<ion-list wrap this-content padding-bottom>\n					<ion-row>\n						<ion-col no-padding width-50 *ngFor="let term of attr.term">\n							<ion-item>\n								<ion-label >{{term.name}}</ion-label>\n								<ion-checkbox [(ngModel)]="filter.value[attr.slug][term.slug]"></ion-checkbox>\n							</ion-item>\n						</ion-col>\n					</ion-row>\n				</ion-list>\n			</hide-show> \n			<hide-show color="light" *ngFor="let attr of attributes.custom" class="filter-attribute">\n				<span this-title><b text-capitalize [innerHTML]="attr.name"></b></span>\n				<ion-list wrap this-content padding-bottom>\n					<ion-row>\n						<ion-col width-50 *ngFor="let term of attr.term|ObjectToArray" no-padding>\n							<ion-item>\n								<ion-label>{{term.name}}</ion-label>\n								<ion-checkbox [(ngModel)]="filter.valueCustom[attr.slug][term.slug]"></ion-checkbox>\n							</ion-item>\n						</ion-col>\n					</ion-row>\n				</ion-list>\n			</hide-show> \n		</ion-list>\n	</ion-scroll>\n</div>\n<!-- Sort -->\n<div *ngIf="filter.open==\'sort\'" ion-fixed width-100 height-100 mark tappable (click)="filter.open=null">\n	<ion-list radio-group [(ngModel)]="sort" class="list-sort" (ngModelChange)="runSort()">\n		<ion-item *ngFor="let option of \'categories.sortData\'|translate">\n			<ion-label [innerHTML]="option.text"></ion-label>\n			<ion-radio [value]="option.value"></ion-radio>\n		</ion-item>\n	</ion-list>		\n</div>\n<!-- List products -->\n<div width-100 text-center padding *ngIf="!loaddata"><ion-spinner name="ios"></ion-spinner></div>\n<ion-row padding-8 wrap *ngIf="0< products.length" class="faded-content" [ngClass]="{\'filter-list\':!filter.grid, \'faded-has-content\':faded}">\n	<ion-col padding-8 relative [attr.width-50]="filter.grid ? true : null" *ngFor="let product of products" class="product-block">\n		<div [navPush]="DetailPage" [navParams]="{id:product.id}" relative class="product-image clearfix">\n			<img float-left *ngIf="product.modernshop_images && product.modernshop_images[0].modern_square" [src]="product.modernshop_images[0].modern_square" />\n			<img float-left *ngIf="!product.modernshop_images || !product.modernshop_images[0].modern_square" src="assets/images/no-image.png" />\n			<div absolute bottom primary-bg product-sale *ngIf="product.sale_price && product.type!=\'variable\' && product.type!=\'grouped\'" class="sale">\n				<span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n			</div>\n			<img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n		</div>\n		<div class="product-info clearfix">\n			<div [navPush]="DetailPage" [navParams]="{id:product.id}">\n				<p [attr.no-margin]="filter.grid ? null : true" width-100>\n					<span class="product-price" *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n						<!-- <b dark font-120>{{product.price*1||0|price}}</b>\n						<span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n						<span class="simple-price" [innerHTML]="product.price_html"></span>\n					</span>\n					<span class="product-price" *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n						<b dark font-120 [innerHTML]="product.price_html"></b>\n					</span>\n				</p>\n				<div [hidden]="filter.grid">\n					<div class="rate">\n						<div class="rating" [style.width]="product.average_rating*20+\'%\'"></div>\n					</div>\n				</div>\n				<!-- <span class="product-title" dark [innerHTML]="product.name"></span> -->\n				<span class="product-title" dark  float-left width-100 [innerHTML]="product.name"></span>\n				<div *ngIf="product.type==\'variable\' && 0< product.attributes.length" [hidden]="filter.grid">\n					<div *ngFor="let attribute of product.attributes|filter:{variation:true}">\n						<span [innerHTML]="attribute.name"></span>: \n						<span dark>{{attribute.options|ArrayJoin:\', \'}}</span>\n					</div>\n				</div>\n				<!-- <div [hidden]="filter.grid" overflow>\n					<div float-left primary no-wrap class="sale">{{\'categories.sold\'|translate}} {{product.total_sales}}</div>\n				</div> -->\n			</div>\n			<div class="button-cart-list" *ngIf="product.type!=\'variable\' && product.type!=\'grouped\' && product.type!=\'external\'">\n				<button ion-button class="button-cart" [disabled]="!product.price" (tap)="addtoCart(product)">\n					<div float-left width-100 font-weight-500>\n						<ion-icon class="icon-cart-add" name="icon-iconcartadd" primary></ion-icon>\n						<span primary class="add-to-cart">{{\'categories.addtocart\' | translate}}</span>\n					</div>\n				</button>\n				<ion-icon *ngIf="cartArray[product.id] == product.id" float-right class="icon-cart-iconcartcheck" name="icon-iconcartcheck" primary></ion-icon>\n			</div>\n			<div class="button-cart-list-option" *ngIf="product.type==\'variable\' || product.type==\'grouped\' || product.type==\'external\'" [navPush]="DetailPage" [navParams]="{id:product.id}">\n				<button ion-button class="button-cart">\n					<div float-left width-100 font-weight-500>\n						<span class="add-to-cart">{{\'categories.chooseoption\' | translate}}</span>\n					</div>\n				</button>\n			</div>\n		</div>\n		<button ion-button absolute top right clear no-margin (click)="changeFavorite(product)"\n		[color]="favorite[product.id] ? \'primary\' : \'dark\'" [hidden]="filter.grid" class="disable-hover btn-favorite">\n				<ion-icon name="icon-favorite"></ion-icon>\n		</button>\n	</ion-col>\n</ion-row>\n<div padding *ngIf="products.length < 1 && noResuilt" text-center style="margin:0 auto;">{{\'general.no_data\'|translate}}</div>\n<ion-infinite-scroll (ionInfinite)="load($event)" *ngIf="!over && !filtering">\n	<ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n<ion-footer>\n	<ion-toolbar>\n		<footer-tabs></footer-tabs>\n		<ion-row absolute width-100 height-100 top left light-bg [hidden]="filter.open!=\'filter\'">\n			<ion-col no-padding height-100>\n				<button ion-button full height-100 color="secondary" (click)="reset()">\n					<span>{{\'general.reset\'|translate}}</span>\n				</button>\n			</ion-col>\n			<ion-col no-padding height-100>\n				<button ion-button full height-100 (click)="runFilter()">\n					<span>{{\'categories.done\'|translate}}</span>\n				</button>\n			</ion-col>\n		</ion-row>\n		<div absolute width-100 height-100 top left mark [hidden]="filter.open!=\'sort\' && filter.open!=\'category\'" tappable (click)="filter.open=null"></div>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\detail-category\detail-category.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_8__pipes_object_to_array__["a" /* ObjectToArray */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */]])
    ], DetailCategoryPage);
    return DetailCategoryPage;
    var DetailCategoryPage_1;
}());

//# sourceMappingURL=detail-category.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__profile_profile__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__order_order__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__favorite_favorite__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__terms_terms__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__privacy_privacy__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__contact_contact__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__about_about__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__search_search__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__petinfo_petinfo__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_static__ = __webpack_require__(242);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom









// Page










// Pipe

var wordpress_order = wordpress_url + '/wp-json/wooconnector/order';
var AccountPage = /** @class */ (function () {
    function AccountPage(storage, storageMul, alertCtrl, translate, platform, http, navCtrl, config, SocialSharing, OneSignal, InAppBrowser, core, actionCtr, Device) {
        this.storage = storage;
        this.storageMul = storageMul;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.platform = platform;
        this.http = http;
        this.navCtrl = navCtrl;
        this.config = config;
        this.SocialSharing = SocialSharing;
        this.OneSignal = OneSignal;
        this.InAppBrowser = InAppBrowser;
        this.core = core;
        this.actionCtr = actionCtr;
        this.Device = Device;
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_12__login_login__["a" /* LoginPage */];
        this.ProfilePage = __WEBPACK_IMPORTED_MODULE_13__profile_profile__["a" /* ProfilePage */];
        this.OrderPage = __WEBPACK_IMPORTED_MODULE_14__order_order__["a" /* OrderPage */];
        this.FavoritePage = __WEBPACK_IMPORTED_MODULE_15__favorite_favorite__["a" /* FavoritePage */];
        this.TermsPage = __WEBPACK_IMPORTED_MODULE_16__terms_terms__["a" /* TermsPage */];
        this.PrivacyPage = __WEBPACK_IMPORTED_MODULE_17__privacy_privacy__["a" /* PrivacyPage */];
        this.ContactPage = __WEBPACK_IMPORTED_MODULE_18__contact_contact__["a" /* ContactPage */];
        this.AboutPage = __WEBPACK_IMPORTED_MODULE_19__about_about__["a" /* AboutPage */];
        this.SearchPage = __WEBPACK_IMPORTED_MODULE_20__search_search__["a" /* SearchPage */];
        this.PetinfoPage = __WEBPACK_IMPORTED_MODULE_21__petinfo_petinfo__["a" /* PetinfoPage */];
        this.data = {};
        // this.getData();
    }
    AccountPage.prototype.ionViewDidEnter = function () {
        // if (this.isCache) this.getData();
        // else this.isCache = true;
        this.getData();
    };
    AccountPage.prototype.getData = function () {
        var _this = this;
        this.storageMul.get(['login', 'user']).then(function (val) {
            if (val) {
                console.log(val);
                if (val["user"])
                    _this.data["user"] = val["user"];
                if (val["login"] && val["login"]["token"]) {
                    _this.data["login"] = val["login"];
                    _this.isLogin = true;
                    _this.data['order'] = 0;
                    var params_1 = { post_num_page: 1, post_per_page: 1000 };
                    _this.loadedOrder = false;
                    var loadOrder_1 = function () {
                        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        headers.set('Authorization', 'Bearer ' + _this.data["login"]["token"]);
                        _this.http.get(wordpress_order + '/getorderbyterm', {
                            headers: headers,
                            search: _this.core.objectToURLParams(params_1)
                        }).subscribe(function (res) {
                            if (Array.isArray(res.json()))
                                _this.data['order'] += res.json().length;
                            if (res.json().length == 1000) {
                                params_1['post_num_page']++;
                                loadOrder_1();
                            }
                            else
                                _this.loadedOrder = true;
                        });
                    };
                    loadOrder_1();
                }
            }
        });
        this.storageMul.get(['favorite', 'notification', 'text'])
            .then(function (val) {
            console.log(val);
            if (val) {
                if (val["favorite"])
                    _this.data["favorite"] = Object.keys(val["favorite"]).length;
                else
                    _this.data["favorite"] = 0;
                if (val["notification"] != false)
                    _this.data["notification"] = true;
                else
                    _this.data["notification"] = false;
                if (val["text"])
                    _this.data["text"] = val["text"];
                else
                    _this.data["text"] = "normal";
            }
        });
    };
    AccountPage.prototype.signOut = function () {
        var _this = this;
        this.translate.get('account.signout').subscribe(function (trans) {
            var confirm = _this.alertCtrl.create({
                title: trans["title"],
                message: trans["message"],
                cssClass: 'alert-signout',
                buttons: [
                    {
                        text: trans["no"],
                    },
                    {
                        text: trans["yes"],
                        handler: function () {
                            _this.data['order'] = 0;
                            _this.storage.remove('login').then(function () { _this.isLogin = false; });
                        }
                    }
                ]
            });
            confirm.present();
        });
    };
    AccountPage.prototype.shareApp = function () {
        if (this.Device.platform == 'Android')
            this.SocialSharing.share(null, null, null, new __WEBPACK_IMPORTED_MODULE_22__pipes_static__["a" /* Static */](this.config).transform('modern_share_rate_android'));
        else
            this.SocialSharing.share(null, null, null, new __WEBPACK_IMPORTED_MODULE_22__pipes_static__["a" /* Static */](this.config).transform('modern_share_rate_ios'));
    };
    AccountPage.prototype.rateApp = function () {
        if (this.Device.platform == 'Android')
            this.InAppBrowser.create(new __WEBPACK_IMPORTED_MODULE_22__pipes_static__["a" /* Static */](this.config).transform('modern_share_rate_android'), "_system");
        else
            this.InAppBrowser.create(new __WEBPACK_IMPORTED_MODULE_22__pipes_static__["a" /* Static */](this.config).transform('modern_share_rate_ios'), "_system");
    };
    AccountPage.prototype.notification = function () {
        var _this = this;
        this.storage.set('notification', this.data["notification"]).then(function () {
            _this.OneSignal.setSubscription(_this.data["notification"]);
        });
    };
    AccountPage.prototype.changeTextSize = function () {
        var _this = this;
        this.translate.get('account.text_size').subscribe(function (trans) {
            var action = _this.actionCtr.create({
                cssClass: 'action-text-size'
            });
            var _loop_1 = function (option) {
                action.addButton({
                    text: trans["option"][option],
                    cssClass: option == _this.data['text'] ? 'selected' : null,
                    handler: function () { _this.updateTextSize(option); }
                });
            };
            for (var option in trans["option"]) {
                _loop_1(option);
            }
            action.addButton({
                text: trans["cancel"],
                role: 'cancel'
            });
            action.present();
        });
    };
    AccountPage.prototype.updateTextSize = function (text) {
        this.storage.set('text', text);
        var html = document.querySelector('html');
        html.className = text;
        this.data["text"] = text;
    };
    AccountPage.prototype.onSwipeContent = function (e) {
        if (e['deltaX'] > 150)
            this.navCtrl.push(this.SearchPage);
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\account\account.html"*/'<ion-content>\n	<div relative overflow class="account-header" text-center (swipe)="onSwipeContent($event)">\n		<img float-left width-100 src="assets/images/account-bg.png" />\n		<div mark absolute top left width-100 height-100></div>\n		<ion-row center padding absolute top left width-100 height-100>\n			<ion-col secondary>\n				<button absolute ion-button color="light" clear navPop class="button-back">\n					<ion-icon icon-big name="md-arrow-back"></ion-icon>\n				</button>\n				<div *ngIf="!isLogin">\n					<div class="account-avatar" margin-auto>\n						<ion-icon name="icon-account"></ion-icon>\n					</div>\n					<button ion-button color="light" clear [navPush]="LoginPage" class="disable-hover">\n						<b>{{\'account.login\'|translate}}</b>\n					</button>\n				</div>\n				<div *ngIf="isLogin">\n					<div class="account-avatar" margin-auto>\n						<ion-icon *ngIf="!data.user.mobiconnector_avatar" name="icon-account" [navPush]="ProfilePage"></ion-icon>\n						<img *ngIf="data.user.mobiconnector_avatar" [src]="data.user.mobiconnector_avatar" [navPush]="ProfilePage" width-100 height-100 />\n					</div>\n					<button absolute ion-button color="light" clear (click)="signOut()" class="disable-hover button-signout">\n						<ion-icon icon-big name="icon-logout"></ion-icon>\n					</button>\n					<h4 no-margin [navPush]="ProfilePage">\n						<b light>{{data.user.display_name}}</b>\n						<ion-icon font-80 name="icon-pen"></ion-icon>\n					</h4>\n					<h5 no-margin>{{data.user.user_email}}</h5>\n				</div>\n			</ion-col>\n		</ion-row>\n	</div>\n	<ion-list no-margin class="account-list" (swipe)="onSwipeContent($event)">\n		<button ion-item detail-none color="light" [navPush]="isLogin?OrderPage:LoginPage">\n			<ion-icon name="icon-list-4" item-left></ion-icon>\n			<ion-label>{{\'account.my_order\'|translate}}</ion-label>\n			<ion-spinner item-right *ngIf="isLogin && !loadedOrder"></ion-spinner>\n			<ion-note item-right *ngIf="loadedOrder || !isLogin">{{data.order||0}}</ion-note>\n		</button>\n		<button ion-item detail-none color="light" [navPush]="PetinfoPage">\n			<ion-icon name="icon-favorite" item-left></ion-icon>\n			<ion-label>My Pets</ion-label>\n		</button>\n		<!--<button ion-item detail-none color="light" [navPush]="FavoritePage">\n			<ion-icon name="icon-favorite" item-left></ion-icon>\n			<ion-label>{{\'account.favorite\'|translate}}</ion-label>\n			<ion-note item-right>{{data.favorite||0}}</ion-note>\n		</button>-->\n		<ion-item color="light" detail-none>\n			<ion-icon name="icon-notification" item-left></ion-icon>\n			<ion-label>{{\'account.push_notification\'|translate}}</ion-label>\n			<ion-toggle mode="md" item-right [(ngModel)]="data.notification" (ngModelChange)="notification()"></ion-toggle>\n		</ion-item>\n		<button ion-item detail-none color="light" (click)="changeTextSize()">\n			<ion-icon name="icon-font" item-left></ion-icon>\n			<ion-label>{{\'account.text_size.title\'|translate}}</ion-label>\n			<ion-note item-right text-capitalize *ngIf="data.text">{{\'account.text_size.option.\'+data.text|translate}}</ion-note>\n		</button>\n		<button ion-item detail-none color="light" (click)="shareApp()">\n			<ion-icon name="icon-send" item-left></ion-icon>\n			<ion-label>{{\'account.app_share\'|translate}}</ion-label>\n		</button>\n		<button ion-item detail-none color="light" (click)="rateApp()">\n			<ion-icon name="icon-star-out" item-left></ion-icon>\n			<ion-label>{{\'account.rate_us\'|translate}}</ion-label>\n		</button>\n		<button ion-item detail-none color="light" [navPush]="TermsPage">\n			<ion-icon name="icon-list" item-left></ion-icon>\n			<ion-label>{{\'account.terms_of_use\'|translate}}</ion-label>\n		</button>\n		<button ion-item detail-none color="light" [navPush]="PrivacyPage">\n			<ion-icon name="icon-list-lock" item-left></ion-icon>\n			<ion-label>{{\'account.privacy_policy\'|translate}}</ion-label>\n		</button>\n		<button ion-item detail-none color="light" [navPush]="ContactPage">\n			<ion-icon name="icon-location" item-left></ion-icon>\n			<ion-label>{{\'account.contact_us\'|translate}}</ion-label>\n		</button>\n		<button ion-item detail-none color="light" [navPush]="AboutPage">\n			<ion-icon name="icon-info" item-left></ion-icon>\n			<ion-label>{{\'account.about_us\'|translate}}</ion-label>\n		</button>\n		<ion-item mode="md">\n			<ion-label text-center>{{\'account.version\'|translate}}</ion-label>\n		</ion-item>\n	</ion-list>\n</ion-content>\n\n<ion-footer (swipe)="onSwipeContent($event)"><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\account\account.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_10__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detail_order_detail_order__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom



// Page

var wordpress_order = wordpress_url + '/wp-json/wooconnector/order';
var OrderPage = /** @class */ (function () {
    function OrderPage(http, core, storage, navCtrl, Toast) {
        this.http = http;
        this.core = core;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.Toast = Toast;
        this.DetailOrderPage = __WEBPACK_IMPORTED_MODULE_7__detail_order_detail_order__["a" /* DetailOrderPage */];
        this.login = {};
        this.date_format = date_format;
        this.page = 1;
        this.noOrder = false;
    }
    OrderPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.page = 1;
        this.storage.get('login').then(function (val) {
            if (val && val['token']) {
                _this.login = val;
                _this.getData().subscribe(function (order) {
                    if (order.length > 0) {
                        _this.noOrder = false;
                        _this.page++;
                        _this.data = order;
                    }
                    else {
                        _this.noOrder = true;
                    }
                });
            }
            else
                _this.navCtrl.pop();
        });
    };
    OrderPage.prototype.getData = function (hide) {
        var _this = this;
        if (hide === void 0) { hide = false; }
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observable) {
            if (!hide)
                _this.core.showLoading();
            var params = { post_per_page: wordpress_per_page, post_num_page: _this.page };
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers.set('Authorization', 'Bearer ' + _this.login["token"]);
            _this.http.get(wordpress_order + '/getorderbyterm', {
                search: _this.core.objectToURLParams(params),
                headers: headers
            }).subscribe(function (res) {
                if (!hide)
                    _this.core.hideLoading();
                observable.next(res.json());
                observable.complete();
            }, function (err) {
                if (!hide)
                    _this.core.hideLoading();
                _this.Toast.showShortBottom(err.json()["message"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            });
        });
    };
    OrderPage.prototype.shop = function () {
        this.navCtrl.popToRoot();
    };
    OrderPage.prototype.load = function (infiniteScroll) {
        var _this = this;
        this.getData(true).subscribe(function (order) {
            if (order.length > 0)
                _this.page++;
            else
                _this.over = true;
            _this.data = _this.data.concat(order);
            infiniteScroll.complete();
        });
    };
    OrderPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.page = 1;
        this.getData(true).subscribe(function (order) {
            _this.over = false;
            if (order.length > 0)
                _this.page++;
            _this.data = order;
            refresher.complete();
        });
    };
    OrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\order\order.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'order.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button-cart #cart icon="icon-bag"></button-cart>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<!-- Refresh -->\n<ion-refresher (ionRefresh)="doRefresh($event)">\n	<ion-refresher-content\n		[pullingIcon]="\'general.pullingIcon\'|translate"\n		[pullingText]="\'general.pullToRefresh\'|translate"\n		[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n		[refreshingText]="\'general.refreshing\'|translate">\n	</ion-refresher-content>\n</ion-refresher>\n<!-- Empty -->\n<ion-row center *ngIf="noOrder" ion-fixed width-100 height-100>\n	<ion-col width-50 style="margin:0 auto" text-center>\n		<h1><ion-icon name="icon-list-4" icon-page></ion-icon></h1>\n		<span>{{\'order.empty\'|translate}}</span>\n		<button margin-vertical ion-button block (click)="shop()">{{\'order.shop\'|translate}}</button>\n	</ion-col>\n</ion-row>\n<!-- Has orders -->\n<ion-row *ngFor="let order of data" class="item-order" [ngClass]="order.status" padding relative>\n	<ion-col no-padding [navPush]="DetailOrderPage" [navParams]="{id:order.id}">\n		<div class="order-id">\n			<b dark>{{\'order.id\'|translate}} - #{{order.id}}</b>\n			<span class="order-status" *ngIf="order.status == \'processing\'" light text-capitalize>{{\'order.status.processing\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'on-hold\'" light text-capitalize>{{\'order.status.on_hold\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'cancelled\'" light text-capitalize>{{\'order.status.cancelled\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'completed\'" light text-capitalize>{{\'order.status.completed\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'pending\'" light text-capitalize>{{\'order.status.pending\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'refunded\'" light text-capitalize>{{\'order.status.refunded\' |translate }}</span>\n			<span class="order-status" *ngIf="order.status == \'failed\'" light text-capitalize>{{\'order.status.failed\' |translate }}</span>\n		</div>\n		<div>{{\'order.date\'|translate}} {{order.date_created|date:date_format}}</div>\n		<div>\n			<span>{{\'order.quantity\'|translate}} {{order.line_items.length}}</span>\n			<span *ngIf="order.line_items.length <2">{{\'order.item\'|translate}}</span>\n			<span *ngIf="order.line_items.length >1">{{\'order.items\'|translate}}</span>\n		</div>\n		<div>{{\'order.total\'|translate}} <span [innerHTML]="order.total"></span></div>\n	</ion-col>\n	<button absolute bottom ion-button clear color="gray" [navPush]="DetailOrderPage" [navParams]="{id:order.id}" class="detail">\n		<span border-dashed>{{\'order.details\'|translate}}</span>\n	</button>\n</ion-row>\n<ion-infinite-scroll (ionInfinite)="load($event)" *ngIf="!over">\n	<ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\order\order.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */]])
    ], OrderPage);
    return OrderPage;
}());

//# sourceMappingURL=order.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Custom


//Pages

var FavoritePage = /** @class */ (function () {
    function FavoritePage(storage, alertCtrl, translate, navCtrl) {
        var _this = this;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */];
        this.data = {};
        storage.get('favorite').then(function (val) {
            ;
            _this.data = val;
        });
    }
    FavoritePage.prototype.clear = function () {
        var _this = this;
        var favoriteClearTrans;
        this.translate.get('favorite.clear').subscribe(function (val) {
            favoriteClearTrans = val;
            var confirm = _this.alertCtrl.create({
                message: favoriteClearTrans["message"],
                cssClass: 'alert-no-title alert-signout',
                buttons: [
                    {
                        text: favoriteClearTrans["no"],
                    },
                    {
                        text: favoriteClearTrans["yes"],
                        cssClass: 'dark',
                        handler: function () {
                            _this.storage.remove('favorite').then(function () { _this.data = {}; });
                        }
                    }
                ]
            });
            confirm.present();
        });
    };
    FavoritePage.prototype.shop = function () {
        this.navCtrl.popToRoot();
    };
    FavoritePage.prototype.delete = function (id) {
        var data = Object.assign({}, this.data);
        delete data[Number(id)];
        this.data = data;
        this.storage.set('favorite', this.data);
    };
    FavoritePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-favorite',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\favorite\favorite.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'favorite.title\'|translate}}</ion-title>\n	<ion-buttons end *ngIf="data && 0 < (data|ObjectToArray).length">\n		<button ion-button clear (click)="clear()" color="primary" class="disable-hover">{{\'favorite.clear.title\'|translate}}</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<ion-row padding-8 wrap *ngIf="data && 0 < (data|ObjectToArray).length">\n	<ion-col padding-8 width-50 *ngFor="let product of (data|ObjectToArray)">\n		<div relative float-left>\n			<img [navPush]="DetailPage" [navParams]="{id:product.id}" float-left *ngIf="product.images" [src]="product.images" />\n			<img [navPush]="DetailPage" [navParams]="{id:product.id}" float-left *ngIf="!product.images" src="assets/images/no-image.png" />\n			<button ion-button clear class="disable-hover delete-favorite" absolute top (click)="delete(product.id)" color="gray">\n				<ion-icon name="icon-trash"></ion-icon>\n			</button>\n			<img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n		</div>\n		<div [navPush]="DetailPage" [navParams]="{id:product.id}">\n			<p float-left width-100>\n				<span *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n					<!-- <b dark font-120>{{product.price*1||0|price}}</b>\n					<span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n					<span dark class="simple-price" [innerHTML]="product.price_html"></span>\n				</span>\n				<span *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n					<b dark font-120 [innerHTML]="product.price_html"></b>\n				</span>\n			</p>\n			<span float-left width-100 [innerHTML]="product.name"></span>\n		</div>\n	</ion-col>\n</ion-row>\n<ion-row center *ngIf="!data || (data|ObjectToArray).length < 1" ion-fixed width-100 height-100>\n	<ion-col width-50 style="margin:0 auto" text-center>\n		<h1><ion-icon name="icon-favorite"></ion-icon></h1>\n		<span>{{\'favorite.empty\'|translate}}</span>\n		<button ion-button block (click)="shop()">{{\'favorite.shop\'|translate}}</button>\n	</ion-col>\n</ion-row>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\favorite\favorite.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], FavoritePage);
    return FavoritePage;
}());

//# sourceMappingURL=favorite.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrivacyPage = /** @class */ (function () {
    function PrivacyPage() {
    }
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-privacy',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\privacy\privacy.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'modern_privacy_policy_title\'|static}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div [innerHTML]="\'modern_description_privacy_policy\'|static"></div>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\privacy\privacy.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_storage_multi_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__address_address__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__thanks_thanks__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__terms_terms__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__appointment_appointment__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom






//Pipes

// Page



 //Lim
var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(storageMul, core, navCtrl, http, platform, InAppBrowser, Toast, translate, alertCtrl, modalCtrl, config) {
        var _this = this;
        this.storageMul = storageMul;
        this.core = core;
        this.navCtrl = navCtrl;
        this.http = http;
        this.platform = platform;
        this.InAppBrowser = InAppBrowser;
        this.Toast = Toast;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.AddressPage = __WEBPACK_IMPORTED_MODULE_10__address_address__["a" /* AddressPage */];
        this.AppointmentPage = __WEBPACK_IMPORTED_MODULE_13__appointment_appointment__["a" /* AppointmentPage */]; //Lim
        this.ThanksPage = __WEBPACK_IMPORTED_MODULE_11__thanks_thanks__["a" /* ThanksPage */];
        this.TermsPage = __WEBPACK_IMPORTED_MODULE_12__terms_terms__["a" /* TermsPage */];
        this.coupon = [];
        translate.get('checkout').subscribe(function (trans) { return _this.trans = trans; });
        core.showLoading();
        this.playerID = config['userID'];
    }
    CheckoutPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.core.showLoading();
        this.storageMul.get(['login', 'user', 'cart', 'coupon', 'useBilling', 'AppointmentDate']).then(function (val) {
            if (val["login"] && val["login"]["token"])
                _this.login = val["login"];
            if (val["user"])
                _this.user = val["user"];
            if (val["AppointmentDate"])
                _this.AppointmentDate = val["AppointmentDate"];
            if (val["cart"]) {
                _this.cart = val["cart"];
                if (_this.user) {
                    _this.products = [];
                    new __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__["a" /* ObjectToArray */]().transform(_this.cart).forEach(function (product) {
                        var now = {};
                        now['product_id'] = product['id'];
                        now['quantity'] = product['quantity'];
                        if (product['variation_id'])
                            now['variation_id'] = product['variation_id'];
                        _this.products.push(now);
                    });
                    var params = {};
                    params['products'] = JSON.stringify(_this.products);
                    if (val['coupon'])
                        params['coupons'] = JSON.stringify(val['coupon']);
                    params['country'] = _this.user['shipping_country'];
                    params['states'] = _this.user['shipping_state'];
                    params['postcode'] = _this.user['shipping_postcode'];
                    var option = {
                        search: _this.core.objectToURLParams(params)
                    };
                    if (_this.login && _this.login['token']) {
                        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        headers.set('Authorization', 'Bearer ' + _this.login["token"]);
                        option['withCredentials'] = true;
                        option['headers'] = headers;
                    }
                    _this.http.get(wordpress_url + '/wp-json/wooconnector/calculator/getall', option).subscribe(function (res) {
                        _this.data = res.json();
                        if (_this.data['total']['discount']) {
                            _this.coupon = _this.data['total']['discount'];
                        }
                        if (_this.data['shipping'] && _this.data['shipping'].length > 0) {
                            _this.data['shipping'].forEach(function (shipping) {
                                shipping['cost'] = Number(shipping['price']) + Number(shipping['tax']);
                            });
                            _this.changeShipping(_this.data['shipping'][0]);
                        }
                        else
                            _this.data['_shipping_tax'] = 0;
                        if (_this.data['payment'])
                            _this.payment = _this.data['payment'][0]['id'];
                        _this.data['_total'] = 0;
                        _this.data['_tax'] = 0;
                        var product;
                        if (!_this.data['total']['discount'])
                            product = _this.data['total'];
                        else
                            product = _this.data['total']['baseitem'];
                        if (product && !product['errors']) {
                            if (!_this.data['total']['discount']) {
                                product['total'].forEach(function (val) {
                                    _this.data['_tax'] += val['tax'];
                                    _this.data['_total'] += val['subtotal'];
                                });
                            }
                            else {
                                if (_this.data['total']['tax'])
                                    _this.data['total']['tax'].forEach(function (tax) { return _this.data['_tax'] += tax['value']; });
                                _this.data['_total'] = _this.data['total']['subtotal'];
                            }
                        }
                        else if (_this.data['total']['errors']) {
                            var message = '';
                            for (var key in _this.data['total']['errors']) {
                                if (_this.data['total']['errors'][key])
                                    message += ' ' + _this.data['total']['errors'][key]['message'];
                            }
                            _this.showAlert(message);
                        }
                        _this.core.hideLoading();
                    });
                }
            }
            if (val['useBilling'] == true)
                _this.useBilling = true;
            else
                _this.useBilling = false;
        });
    };
    CheckoutPage.prototype.total = function () {
        var total = this.data['_total'] + this.data['_tax'];
        if (this.data['_shipping'])
            total += this.data['_shipping'];
        if (this.data['_shipping_tax'])
            total += this.data['_shipping_tax'];
        this.coupon.forEach(function (val) {
            total = Number(total) - (val['value']);
        });
        if (total < 0)
            total = 0;
        return total;
    };
    CheckoutPage.prototype.changeShipping = function (shipping) {
        var _this = this;
        this.shipping = shipping['id'];
        this.data['_shipping'] = Number(shipping['price']);
        this.data['_shipping_tax'] = 0;
        if (shipping['tax'])
            shipping['tax'].forEach(function (tax) { return _this.data['_shipping_tax'] += tax['value']; });
    };
    CheckoutPage.prototype.confirm = function () {
        var _this = this;
        this.core.showLoading();
        var params = {};
        params['products'] = JSON.stringify(this.products);
        Object.assign(params, this.core.filterProfile(this.user));
        params['billing_email'] = this.user['user_email'];
        params['shipping_method'] = this.shipping;
        params['payment_method'] = this.payment;
        params['onesignal_player_id'] = this.playerID;
        params['AppointmentDate'] = this.AppointmentDate;
        if (this.useBilling)
            params['ship_to_different_address'] = 0;
        else
            params['ship_to_different_address'] = 1;
        if (this.coupon) {
            var coupon_1 = [];
            this.coupon.forEach(function (item) { return coupon_1.push(item['code']); });
            params['coupons'] = JSON.stringify(coupon_1);
        }
        params = this.core.objectToURLParams(params);
        if (this.login && this.login['token']) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers.set('Authorization', 'Bearer ' + this.login["token"]);
            this.http.post(wordpress_url + '/wp-json/wooconnector/checkout/processcheckout', params, {
                headers: headers,
                withCredentials: true
            }).subscribe(function (res) {
                _this.core.hideLoading();
                _this.checkout(res.json());
            }, function (err) {
                console.log('Checkout process err', err);
                _this.core.hideLoading();
                _this.showAlert(err.json()['message']);
            });
        }
        else {
            this.http.post(wordpress_url + '/wp-json/wooconnector/checkout/processcheckout', params)
                .subscribe(function (res) {
                _this.core.hideLoading();
                _this.checkout(res.json());
            }, function (err) {
                _this.core.hideLoading();
                _this.showAlert(err.json()['message']);
            });
        }
    };
    CheckoutPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            message: message,
            cssClass: 'alert-no-title',
            buttons: [this.trans['has_error']['button']]
        });
        alert.present();
    };
    CheckoutPage.prototype.checkout = function (res) {
        var _this = this;
        console.log(res);
        var order_id;
        var checkoutUrl = wordpress_url + '/wooconnector-checkout/?data_key=' + res;
        if (this.platform.is('cordova')) {
            this.platform.ready().then(function () {
                var isCheckout = false;
                var openCheckout = _this.InAppBrowser.create(checkoutUrl, '_blank', 'location=no,closebuttoncaption=Close,hardwareback=yes,footer=yes');
                openCheckout.on('loadstart').subscribe(function (res) {
                    console.log(res);
                    var url = wordpress_url;
                    if (res.url.indexOf(url) != 0)
                        url = url.replace('http', 'https');
                    console.log(url);
                    if ((res.url.indexOf(url) == 0 && res.url.indexOf('order-received') != -1)) {
                        order_id = (res.url.split('?')[0]).split('order-received/')[1].replace("/", "");
                        var params = {};
                        params['id'] = order_id;
                        if (_this.login && _this.login['token']) {
                            params['token'] = true;
                        }
                        else
                            params['token'] = false;
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__thanks_thanks__["a" /* ThanksPage */], { params: params }).then(function () {
                            openCheckout.close();
                            _this.storageMul.remove(['cart', 'coupon']);
                        });
                    }
                    else if (res.url.indexOf('cancel_order') != -1 && res.url.indexOf('paypal.com') == -1) {
                        openCheckout.close();
                    }
                });
                openCheckout.on('loaderror').subscribe(function (res) {
                    openCheckout.close();
                    _this.Toast.showLongBottom(_this.trans['message']).subscribe(function (toast) { }, function (error) { console.log(error); });
                });
            });
        }
    };
    CheckoutPage.prototype.showTerms = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.config['text_static']['modern_terms_ofuser_title'],
            message: this.config['text_static']['modern_description_term_ofuse'],
            cssClass: 'term-condition',
            buttons: [
                {
                    text: this.trans['term_popup']['cancel'],
                    role: 'cancel'
                },
                {
                    text: this.trans['term_popup']['accept'],
                    handler: function () {
                        _this.checkCondition = true;
                    }
                }
            ]
        });
        alert.present();
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\checkout\checkout.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'checkout.title\'|translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content secondary-bg>\n<!-- Address -->\n<ion-list class="address" *ngIf="user">\n	<ion-item-divider color="light">\n		<ion-icon name="icon-location" item-left></ion-icon>\n		<ion-label><b dark>{{\'checkout.address\'|translate}}</b></ion-label>\n		<button ion-button clear item-right [navPush]="AddressPage" class="disable-hover">\n			<span>{{\'checkout.change\'|translate}}</span>\n		</button>\n	</ion-item-divider>\n	<hide-show color="light" no-border>\n		<span this-title><b>{{\'checkout.delivery_address\'|translate}}</b></span>\n		<div this-content>\n			<p><b>{{user.shipping_first_name}} {{user.shipping_last_name}}</b></p>\n			<p>{{user.shipping_company}}</p>\n			<p>{{user.shipping_address_1}} {{user.shipping_address_2}}</p>\n			<p>{{user.shipping_city}}, {{user.shipping_state}} {{user.shipping_postcode}}</p>\n			<p>{{user.shipping_country}}</p>\n		</div>\n	</hide-show> \n	<hide-show color="light" no-border>\n		<span this-title><b>{{\'checkout.billing_address\'|translate}}</b></span>\n		<div this-content>\n			<p><b>{{user.billing_first_name}} {{user.billing_last_name}}</b></p>\n			<p>{{user.billing_company}}</p>\n			<p>{{user.billing_address_1}} {{user.billing_address_2}}</p>\n			<p>{{user.billing_city}}, {{user.billing_state}} {{user.billing_postcode}}</p>\n			<p>{{user.billing_country}}</p>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Shipping method -->\n<ion-list *ngIf="data && data.shipping && data.shipping.length > 0">\n	<hide-show color="light" show="true" no-border>\n		<span this-title>\n			<ion-icon name="icon-time" icon-big></ion-icon>\n			<b dark>{{\'checkout.shipping_method\'|translate}}</b>\n		</span>\n		<div this-content>\n			<ion-list radio-group [(ngModel)]="shipping" class="list-shipping" no-margin>\n				<button ion-item detail-none *ngFor="let item of data.shipping" no-padding (click)="changeShipping(item)">\n					<ion-label>\n						<span dark>{{item.title}}:</span>\n						<span *ngIf="item.price==0" success>{{\'checkout.free\'|translate}}</span>\n						<span *ngIf="item.price!=0" success>{{item.price|price}}</span>\n					</ion-label>\n					<ion-radio [value]="item.id" mode="ios"></ion-radio>\n				</button>\n			</ion-list>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Order detail -->\n<ion-list *ngIf="cart && 0<(cart|ObjectToArray).length">\n	<hide-show color="light" show="true" no-border>\n		<div width-100 this-title text-left>\n			<ion-icon name="icon-list-4" icon-big></ion-icon>\n			<b dark>{{\'checkout.order_detail\'|translate}}</b>\n			<span float-right margin-right>{{(cart|ObjectToArray).length}} {{\'checkout.item\'|translate}}</span>\n		</div>\n		<div this-content>\n			<!-- List product -->\n			<ion-list light-bg class="list-product" padding-vertical no-margin>\n			  <ion-row *ngFor="let product of (cart|ObjectToArray)" no-padding relative class="item-product">\n				<ion-col width-25 no-padding>\n					<img *ngIf="product.images" [src]="product.images" />\n					<img *ngIf="!product.images" src="assets/images/no-image.png" />\n				</ion-col>\n				<ion-col no-padding margin-horizontal>\n					<span dark>{{product.name}}</span>\n					<ion-row wrap padding-4-vertical>\n						<ion-col width-50 no-padding *ngFor="let attr of (product.attributes|ObjectToArray)">\n							<span>{{attr.name}}: </span><b text-capitalize>{{attr.option}}</b>\n						</ion-col>\n					</ion-row>\n					<ion-row class="product-quantity" wrap>\n						<ion-col no-padding>\n							<span *ngIf="product.sale_price" text-through>{{product.regular_price|price}}</span>\n							<b dark> {{product.price||0|price}} x{{product.quantity}}</b>\n						</ion-col>\n					</ion-row>\n				</ion-col>\n			  </ion-row>\n			</ion-list>\n			<div light-bg dark class="totals" *ngIf="data" padding-bottom>\n				<div margin-bottom><b dark text-uppercase>{{\'checkout.totals\'|translate}}</b></div>\n				<ion-row>\n					<ion-col>{{\'checkout.total_price\'|translate}}</ion-col>\n					<ion-col text-right>{{data._total|price}}</ion-col>\n				</ion-row>\n				<ion-row *ngIf="shipping">\n					<ion-col>{{\'checkout.shipping\'|translate}}</ion-col>\n					<ion-col text-right *ngIf="data._shipping==0" success>{{\'checkout.free\'|translate}}</ion-col>\n					<ion-col text-right *ngIf="0<data._shipping">{{data._shipping|price}}</ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col>{{\'checkout.tax\'|translate}}</ion-col>\n					<ion-col text-right>{{(data._tax+data._shipping_tax)|price}}</ion-col>\n				</ion-row>\n				<ion-row *ngFor="let coupon of coupon">\n					<ion-col width-66>\n						<span>{{\'checkout.coupon_code\'|translate}}</span>\n						<span primary> ({{coupon.code}}: -{{((coupon.value*1)/data._total*100)|number:\'1.2-2\'}}%) </span>\n					</ion-col>\n					<ion-col text-right primary>-{{coupon.value|price}}</ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col><b dark>{{\'checkout.order_total\'|translate}}</b></ion-col>\n					<ion-col text-right><b dark>{{total()|price}}</b></ion-col>\n				</ion-row>\n				\n			</div>\n		</div>\n	</hide-show> \n</ion-list>\n\n<ion-list>\n	<hide-show color="light" show="true" no-border>\n		<span this-title><ion-icon name="icon-time" icon-big></ion-icon><b>{{\'checkout.appointment_date\'|translate}}</b></span>\n		<div this-content>\n			<p>{{AppointmentDate}}</p>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Payment method -->\n<ion-list *ngIf="data && data.payment">\n	<hide-show color="light" show="true" no-border>\n		<span this-title>\n			<ion-icon name="icon-wallet" icon-big></ion-icon>\n			<b dark>{{\'checkout.payment_method\'|translate}}</b>\n		</span>\n		<div this-content>\n			<ion-list radio-group [(ngModel)]="payment" class="list-payment" no-margin>\n				<button ion-item detail-none *ngFor="let item of data.payment" no-padding (click)="payment=item.id">\n					<ion-label><span dark>{{item.title}}</span></ion-label>\n					<ion-radio [value]="item.id"></ion-radio>\n				</button>\n			</ion-list>\n		</div>\n	</hide-show> \n</ion-list>\n<ion-list padding light-bg no-margin>\n	<div class="checkout-term">\n		<ion-checkbox class="check-allow" mode="md" [(ngModel)]="checkCondition"></ion-checkbox>\n		<div dark class="term-note">{{\'checkout.condition\'|translate}}<span (click)="showTerms()" primary>{{\'checkout.term\' | translate}}</span></div>\n	</div>\n<!-- 	<ion-row *ngIf="data">\n		<ion-col><b dark>{{\'checkout.order_total\'|translate}}</b></ion-col>\n		<ion-col text-right><b dark>{{total()|price}}</b></ion-col>\n	</ion-row> -->\n	<button block ion-button (click)="confirm()" [disabled]="(products && products.length<1) || !payment || !checkCondition">{{\'checkout.confirm\'|translate}}</button>\n</ion-list>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\checkout\checkout.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_3__service_storage_multi_service__["a" /* StorageMulti */], __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__["a" /* ObjectToArray */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__service_storage_multi_service__["a" /* StorageMulti */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_5__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8__service_config_service__["a" /* Config */]])
    ], CheckoutPage);
    return CheckoutPage;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__checkout_checkout__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__address_address__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














// Page



var AppointmentPage = /** @class */ (function () {
    function AppointmentPage(http, storage, storageMul, formBuilder, alertCtrl, core, navCtrl, config, translate, Geolocation, LocationAccuracy, platform, Diagnostic, Device, ngZone, DatePicker) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.storageMul = storageMul;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.core = core;
        this.navCtrl = navCtrl;
        this.Geolocation = Geolocation;
        this.LocationAccuracy = LocationAccuracy;
        this.platform = platform;
        this.Diagnostic = Diagnostic;
        this.Device = Device;
        this.ngZone = ngZone;
        this.DatePicker = DatePicker;
        this.AddressPage = __WEBPACK_IMPORTED_MODULE_16__address_address__["a" /* AddressPage */];
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_14__login_login__["a" /* LoginPage */];
        this.CheckoutPage = __WEBPACK_IMPORTED_MODULE_15__checkout_checkout__["a" /* CheckoutPage */];
        this.login = {};
        this.data = {};
        this.states = {};
        platform.ready().then(function () {
            var options = {
                date: new Date(),
                mode: 'date'
            };
            DatePicker.show(options).then(function (date) {
                if (typeof date == "string")
                    date = new Date(date);
                //alert('Selected date: ' + date);
                var day = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
                var month = (date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
                var dateString = date.getFullYear() + "-" + month + "-" + day;
                _this.strAppointmentDate = dateString;
                _this.getAppointTimes();
            }, function (error) {
                alert('Error: ' + error);
            });
        });
        this.display_mode = display_mode;
        this.formAppointment = this.formBuilder.group({
            //billing_first_name: ['', Validators.required],
            strAppointmentDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.getData();
    }
    AppointmentPage.prototype.ionViewDidEnter = function () {
        if (this.isCache)
            this.getData();
        else
            this.isCache = true;
    };
    AppointmentPage.prototype.getData = function () {
        /*this.storageMul.get(['login', 'useBilling', 'user']).then(val => {
          if (val['login']) this.login = val['login'];
          
          if (val['user']) {
            this.data = val['user'];
            
          }
          this.reset();
        });*/
    };
    AppointmentPage.prototype.reset = function () {
        this.formAppointment.patchValue({
            //billing_first_name: this.data["billing_first_name"],
            strAppointmentDate: this.data["strAppointmentDate"],
        });
        this.rawData = Object.assign({}, this.formAppointment.value);
    };
    AppointmentPage.prototype.gotoAddress = function () {
        var _this = this;
        this.storage.set('AppointmentDate', this.strAppointmentDate + ' ' + this.schSelectedTime);
        if (this.check_require_login) {
            if (this.login)
                this.navCtrl.push(this.AddressPage);
            else
                this.navCtrl.push(this.LoginPage);
        }
        else {
            if (this.login)
                this.navCtrl.push(this.AddressPage);
            else {
                var alert_1 = this.alertCtrl.create({
                    message: this.trans['confirm']['message'],
                    cssClass: 'alert-no-title alert-signout',
                    buttons: [
                        {
                            text: this.trans['confirm']["no"],
                            cssClass: 'dark',
                            handler: function () {
                                _this.navCtrl.push(_this.AddressPage);
                            }
                        },
                        {
                            text: this.trans['confirm']["yes"],
                            handler: function () {
                                _this.navCtrl.push(_this.LoginPage);
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        }
    };
    AppointmentPage.prototype.getAppointTimes = function () {
        /*let alert = this.alertCtrl.create({
                        message: this.strAppointmentDate,
                        cssClass: 'alert-no-title',
                        buttons: ['OK']
                    });
                    alert.present();*/
        var _this = this;
        this.core.showLoading();
        //let params = {};
        //params['date'] = '2018-06-01';
        //let option = {};
        //let headers = new Headers();
        //headers.set('Content-Type', 'text/plain');
        //if (this.login && this.login['token']) {
        //headers.set('Authorization', 'Bearer ' + this.login["token"]);
        //option['withCredentials'] = true;
        //option['headers'] = headers;
        //}
        //const options = {headers, params, responseType: 'text' as 'text'};,options
        this.http.get(wordpress_url + '/getschedules.php' + '?date=' + this.strAppointmentDate)
            .subscribe(function (res) {
            console.log(res);
            _this.core.hideLoading();
            var result = res.text();
            if (result == "5468") {
                _this.schSelectedTime = null;
                _this.schAvailableTimes = null;
            }
            else {
                _this.schSelectedTime = null;
                result = result.substring(0, result.length - 1);
                _this.schAvailableTimes = result.split(";");
            }
            /*let alert = this.alertCtrl.create({
                    message: result,
                    cssClass: 'alert-no-title',
                    buttons: ['OK']
                });
                alert.present();*/
        });
    };
    AppointmentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-appointment',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\appointment\appointment.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title>{{\'appointment.title\'|translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-label color="light" class="head-label" >\n				{{\'appointment.select_date\'|translate}}\n	</ion-label>\n	<ion-datetime class="detail-label" displayFormat="DD/MMM/YYYY" [(ngModel)]="strAppointmentDate" (ionChange)="getAppointTimes()"></ion-datetime>\n	<ion-label color="light" class="head-label">\n				{{\'appointment.select_time\'|translate}}\n	</ion-label>\n\n	<ion-scroll style="width:100%;height:60vh" scrollY="true">\n		<ion-list scroll="true" radio-group [(ngModel)]="schSelectedTime" class="list-payment" [disabled]="!strAppointmentDate" >\n			<button  block ion-item detail-none *ngFor="let item of schAvailableTimes" no-padding (click)="schSelectedTime=item">\n				<ion-label class="timelist-label" ><span dark>{{item}}</span></ion-label>\n				<ion-radio [value]="item"></ion-radio>\n			</button>\n		</ion-list>\n	</ion-scroll>\n</ion-content>\n\n<ion-footer padding>\n	<button  ion-button block icon-right margin-top (click)="gotoAddress()" [disabled]="!schSelectedTime" ><!--class="button-checkout"-->\n				<span text-uppercase>CHECKOUT<!--{{\'appointment.checkout\'|translate}}--></span>\n				<ion-icon name="ios-arrow-round-forward"></ion-icon>\n	</button>\n	<ion-toolbar><footer-tabs></footer-tabs></ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\appointment\appointment.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__["a" /* LocationAccuracy */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_date_picker__["a" /* DatePicker */]])
    ], AppointmentPage);
    return AppointmentPage;
}());

//# sourceMappingURL=appointment.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Core; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom


var Core = /** @class */ (function () {
    function Core(loadingCtrl, platform, Network, config) {
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.Network = Network;
    }
    Core.prototype.objectToURLParams = function (object) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (Array.isArray(object[key])) {
                    object[key].forEach(function (val) {
                        params.append(key + '[]', val);
                    });
                }
                else
                    params.set(key, object[key]);
            }
        }
        return params;
    };
    Core.prototype.showLoading = function (content) {
        var _this = this;
        if (content === void 0) { content = null; }
        if (!this.isLoading) {
            this.isLoading = true;
            this.loading = this.loadingCtrl.create({
                content: content
            });
            this.loading.onDidDismiss(function () {
                _this.isLoading = false;
            });
            this.loading.present();
            setTimeout(function () { _this.hideLoading(); }, request_timeout);
            this.platform.ready().then(function () {
                if (_this.Network.type == "none")
                    _this.hideLoading();
                _this.Network.onDisconnect().subscribe(function () { _this.hideLoading(); });
            });
        }
    };
    Core.prototype.hideLoading = function () { if (this.isLoading)
        this.loading.dismiss(); };
    Core.prototype.getVariation = function (variations, attributes) {
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observable) {
            var variation;
            var _attr = JSON.stringify(attributes).toLowerCase();
            var maxEqual = 0;
            variations.forEach(function (val) {
                var equalAttr = 0;
                val["attributes"].forEach(function (attr) {
                    console.log(_attr);
                    console.log(attr);
                    delete attr['taxanomy'];
                    delete attr['slug'];
                    if (_attr.indexOf(JSON.stringify(attr).toLowerCase()) != -1)
                        equalAttr++;
                });
                if (equalAttr > maxEqual && equalAttr == val["attributes"].length) {
                    variation = val;
                    maxEqual = equalAttr;
                }
            });
            if (!variation)
                variation = variations.filter(function (item) { return item["attributes"].length == 0; })[0];
            observable.next(variation);
            observable.complete();
        });
    };
    Core.prototype.filterProfile = function (profile) {
        if (!profile)
            profile = {};
        return {
            billing_first_name: profile['billing_first_name'],
            billing_last_name: profile['billing_last_name'],
            billing_company: profile['billing_company'],
            billing_country: profile['billing_country'],
            billing_state: profile['billing_state'],
            billing_address_1: profile['billing_address_1'],
            billing_address_2: profile['billing_address_2'],
            billing_city: profile['billing_city'],
            billing_postcode: profile['billing_postcode'],
            billing_phone: profile['billing_phone'],
            shipping_first_name: profile['shipping_first_name'],
            shipping_last_name: profile['shipping_last_name'],
            shipping_company: profile['shipping_company'],
            shipping_country: profile['shipping_country'],
            shipping_state: profile['shipping_state'],
            shipping_address_1: profile['shipping_address_1'],
            shipping_address_2: profile['shipping_address_2'],
            shipping_city: profile['shipping_city'],
            shipping_postcode: profile['shipping_postcode']
        };
    };
    Core.prototype.addSortToSearchParams = function (params, sort_type) {
        if (sort_type == "-date") {
            params['post_order_by'] = 'date';
            params['post_order_page'] = 'ASC';
        }
        else if (sort_type == 'price') {
            params['price_sort'] = 1;
            params['post_order_page'] = 'ASC';
        }
        else if (sort_type == '-price') {
            params['price_sort'] = 1;
            params['post_order_page'] = 'DESC';
        }
        else if (sort_type == '-name') {
            params['name_sort'] = 1;
            params['post_order_page'] = 'DESC';
        }
        else if (sort_type == 'name') {
            params['name_sort'] = 1;
            params['post_order_page'] = 'ASC';
        }
        else if (sort_type == 'popularity') {
            params['popularity_sort'] = 1;
            params['post_order_page'] = 'DESC';
        }
        else if (sort_type == 'rating') {
            params['rating_sort'] = 1;
            params['post_order_page'] = 'DESC';
        }
        return params;
    };
    Core = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_5__config_service__["a" /* Config */]])
    ], Core);
    return Core;
}());

//# sourceMappingURL=core.service.js.map

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 147;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export translateLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TranslateModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_translate_pipe__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_translate_service__ = __webpack_require__(125);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_translate_parser__ = __webpack_require__(234);
/* unused harmony namespace reexport */







function translateLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["c" /* TranslateStaticLoader */](http);
}
var TranslateModule = (function () {
    function TranslateModule() {
    }
    TranslateModule.forRoot = function (providedLoader) {
        if (providedLoader === void 0) { providedLoader = {
            provide: __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["a" /* TranslateLoader */],
            useFactory: translateLoaderFactory,
            deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]]
        }; }
        return {
            ngModule: TranslateModule,
            providers: [providedLoader, __WEBPACK_IMPORTED_MODULE_3__src_translate_service__["b" /* TranslateService */]]
        };
    };
    TranslateModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */], args: [{
                    imports: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */]],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_2__src_translate_pipe__["a" /* TranslatePipe */]
                    ],
                    exports: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
                        __WEBPACK_IMPORTED_MODULE_2__src_translate_pipe__["a" /* TranslatePipe */]
                    ]
                },] },
    ];
    /** @nocollapse */
    TranslateModule.ctorParameters = [];
    return TranslateModule;
}());


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-event/add-event.module": [
		357,
		1
	],
	"../pages/edit-event/edit-event.module": [
		358,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 189;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Config = /** @class */ (function () {
    function Config() {
    }
    Config.prototype.set = function (name, value) {
        this[name] = value;
    };
    Config = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Config);
    return Config;
}());

//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_service__ = __webpack_require__(125);


var TranslatePipe = (function () {
    function TranslatePipe(translate, _ref) {
        this.translate = translate;
        this._ref = _ref;
        this.value = '';
    }
    /* tslint:disable */
    /**
     * @name equals
     *
     * @description
     * Determines if two objects or two values are equivalent.
     *
     * Two objects or values are considered equivalent if at least one of the following is true:
     *
     * * Both objects or values pass `===` comparison.
     * * Both objects or values are of the same type and all of their properties are equal by
     *   comparing them with `equals`.
     *
     * @param {*} o1 Object or value to compare.
     * @param {*} o2 Object or value to compare.
     * @returns {boolean} True if arguments are equal.
     */
    TranslatePipe.prototype.equals = function (o1, o2) {
        if (o1 === o2)
            return true;
        if (o1 === null || o2 === null)
            return false;
        if (o1 !== o1 && o2 !== o2)
            return true; // NaN === NaN
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 == t2 && t1 == 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2))
                    return false;
                if ((length = o1.length) == o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(o2)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in o1) {
                    if (!this.equals(o1[key], o2[key])) {
                        return false;
                    }
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };
    /* tslint:enable */
    TranslatePipe.prototype.updateValue = function (key, interpolateParams) {
        var _this = this;
        this.translate.get(key, interpolateParams).subscribe(function (res) {
            _this.value = res !== undefined ? res : key;
            _this.lastKey = key;
            _this._ref.markForCheck();
        });
    };
    TranslatePipe.prototype.transform = function (query) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!query || query.length === 0) {
            return query;
        }
        // if we ask another time for the same key, return the last value
        if (this.equals(query, this.lastKey) && this.equals(args, this.lastParams)) {
            return this.value;
        }
        var interpolateParams;
        if (args.length && args[0] !== null) {
            if (typeof args[0] === 'string' && args[0].length) {
                // we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
                // which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
                var validArgs = args[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        // store the query, in case it changes
        this.lastKey = query;
        // store the params, in case they change
        this.lastParams = args;
        // set the value
        this.updateValue(query, interpolateParams);
        // if there is a subscription to onLangChange, clean it
        this._dispose();
        // subscribe to onTranslationChange event, in case the translations change
        if (!this.onTranslationChange) {
            this.onTranslationChange = this.translate.onTranslationChange.subscribe(function (event) {
                if (_this.lastKey && event.lang === _this.translate.currentLang) {
                    _this.lastKey = null;
                    _this.updateValue(query, interpolateParams);
                }
            });
        }
        // subscribe to onLangChange event, in case the language changes
        if (!this.onLangChange) {
            this.onLangChange = this.translate.onLangChange.subscribe(function (event) {
                if (_this.lastKey) {
                    _this.lastKey = null; // we want to make sure it doesn't return the same value until it's been updated
                    _this.updateValue(query, interpolateParams);
                }
            });
        }
        return this.value;
    };
    /**
     * Clean any existing subscription to change events
     * @private
     */
    TranslatePipe.prototype._dispose = function () {
        if (typeof this.onTranslationChange !== 'undefined') {
            this.onTranslationChange.unsubscribe();
            this.onTranslationChange = undefined;
        }
        if (typeof this.onLangChange !== 'undefined') {
            this.onLangChange.unsubscribe();
            this.onLangChange = undefined;
        }
    };
    TranslatePipe.prototype.ngOnDestroy = function () {
        this._dispose();
    };
    TranslatePipe.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */] },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */], args: [{
                    name: 'translate',
                    pure: false // required to update the value when the promise is resolved
                },] },
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1__translate_service__["b" /* TranslateService */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], },
    ];
    return TranslatePipe;
}());


/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parser; });
var Parser = (function () {
    function Parser() {
        this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    }
    /**
     * Interpolates a string to replace parameters
     * "This is a {{ key }}" ==> "This is a value", with params = { key: "value" }
     * @param expr
     * @param params
     * @returns {string}
     */
    Parser.prototype.interpolate = function (expr, params) {
        var _this = this;
        if (typeof expr !== 'string' || !params) {
            return expr;
        }
        return expr.replace(this.templateMatcher, function (substring, b) {
            var r = _this.getValue(params, b);
            return typeof r !== 'undefined' ? r : substring;
        });
    };
    /**
     * Gets a value from an object by composed key
     * parser.getValue({ key1: { keyA: 'valueI' }}, 'key1.keyA') ==> 'valueI'
     * @param target
     * @param key
     * @returns {string}
     */
    Parser.prototype.getValue = function (target, key) {
        var keys = key.split('.');
        key = '';
        do {
            key += keys.shift();
            if (target !== undefined && target[key] !== undefined && (typeof target[key] === 'object' || !keys.length)) {
                target = target[key];
                key = '';
            }
            else if (!keys.length) {
                target = undefined;
            }
            else {
                key += '.';
            }
        } while (keys.length);
        return target;
    };
    return Parser;
}());


/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__rating_rating__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom

//Page

var CommentsPage = /** @class */ (function () {
    function CommentsPage(navParams, http, core, modalCtrl) {
        this.navParams = navParams;
        this.http = http;
        this.core = core;
        this.modalCtrl = modalCtrl;
        this.page = 1;
        this.faded = false;
        this.id = navParams.get("id");
        this.allow = navParams.get("allow");
        this.getDataComment();
    }
    CommentsPage.prototype.getDataComment = function () {
        var _this = this;
        this.comments = { total: 0, details: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
        // this.core.showLoading();
        this.getReview(true).subscribe(function (res) {
            _this.comments["reviews"] = res;
            _this.lastComment = _this.comments["reviews"];
            if (!_this.comments["reviews"])
                _this.comments["reviews"] = [];
            _this.calculator();
            _this.loaddata = true;
            setTimeout(function () {
                _this.faded = true;
            }, 100);
        });
    };
    CommentsPage.prototype.getReview = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = true; }
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observable) {
            _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getnewcomment', {
                search: _this.core.objectToURLParams({
                    'product_id': _this.id,
                    'post_per_page': 10,
                    'post_num_page': _this.page
                })
            }).subscribe(function (res) {
                observable.next(res.json());
                observable.complete();
            });
        });
    };
    CommentsPage.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        this.page++;
        this.getReview(true).subscribe(function (res) {
            if (res && res.length > 0) {
                _this.comments["reviews"] = _this.comments.concat(res);
                _this.calculator();
            }
            else
                _this.over = true;
            infiniteScroll.complete();
        });
    };
    CommentsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.page = 1;
        this.faded = false;
        this.comments["reviews"] = [];
        this.getReview(true).subscribe(function (res) {
            if (res && res.length > 0)
                _this.page++;
            _this.comments["reviews"] = res;
            _this.over = false;
            setTimeout(function () {
                _this.faded = true;
            }, 100);
            refresher.complete();
        });
    };
    CommentsPage.prototype.calculator = function () {
        var _this = this;
        this.comments["reviews"].forEach(function (val) {
            _this.comments["total"] += Number(val.rating);
            _this.comments["details"][val.rating] += 1;
        });
        this.bestRating();
        this.setPercent();
    };
    CommentsPage.prototype.bestRating = function () {
        var _this = this;
        if (this.comments["reviews"].length == 0)
            return this.comments["best"] = 0;
        this.comments["best"] = Object.keys(this.comments["details"]).reduce(function (a, b) {
            return _this.comments["details"][a] > _this.comments["details"][b] ? a : b;
        });
    };
    CommentsPage.prototype.setPercent = function () {
        if (this.comments["best"] != null) {
            var best = this.comments["details"][this.comments["best"]];
            this.comments["percent"] = [];
            for (var i = 5; i >= 1; i--) {
                this.comments["percent"].push({
                    rating: i,
                    percent: ((this.comments["details"][i] / best * 100) || 0) + '%'
                });
            }
        }
    };
    CommentsPage.prototype.showRating = function () {
        var _this = this;
        if (this.allow) {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__rating_rating__["a" /* RatingPage */], { id: this.id });
            modal.onDidDismiss(function (reload) {
                console.log(reload);
                _this.page = 1;
                _this.getReview(reload);
            });
            modal.present();
        }
    };
    CommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comments',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\comments\comments.html"*/' <ion-header>\n	<ion-navbar>\n		<ion-title>{{\'comments.title\'|translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<!-- Refresh -->\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content\n			[pullingIcon]="\'general.pullingIcon\'|translate"\n			[pullingText]="\'general.pullToRefresh\'|translate"\n			[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n			[refreshingText]="\'general.refreshing\'|translate">\n		</ion-refresher-content>\n	</ion-refresher>\n	<div width-100 text-center padding *ngIf="!loaddata"><ion-spinner name="ios" ></ion-spinner></div>\n	<div *ngIf="comments.reviews" class="faded-content" [ngClass]="{\'faded-has-content\':faded}">\n		<!-- Ratings -->\n		<b dark>{{\'comments.ratings_reviews\'|translate}}</b>\n		<ion-row padding-vertical class="comments-statis">\n			<ion-col center width-33 text-center>\n				<h4 dark>\n					<span>{{comments.total/comments.reviews.length||0|number:\'1.1-1\'}}</span>\n					<ion-icon name="icon-star"></ion-icon>\n				</h4>\n				<span>{{comments.reviews.length}} {{\'comments.rating\'|translate}}</span>\n			</ion-col>\n			<ion-col border-left padding-horizontal>\n				<div *ngFor="let rating of comments.percent" class="percent" width-100 relative>\n					<div absolute top left dark>\n						<span>{{rating.rating}}</span>\n						<ion-icon name="icon-star"></ion-icon>\n					</div>\n					<div class="percent-background">\n						<div class="percent-value" [style.width]="rating.percent" [ngClass]="\'rating\'+rating.rating" height-100></div>\n					</div>\n				</div>\n			</ion-col>\n		</ion-row>\n		<button ion-button block color="primary" (click)="showRating()" [disabled]="!allow">\n			<span>{{\'comments.button\'|translate}}</span>\n		</button>\n		<!-- List reviews -->\n		<ion-list margin-vertical class="comments-review">\n			<ion-item mode="md" *ngFor="let review of comments.reviews" no-padding dark text-wrap>\n				<ion-avatar item-left float-left>\n					<img *ngIf="review.link_avatar" [src]="review.link_avatar">\n					<img *ngIf="!review.link_avatar" src="assets/images/person.png">\n				</ion-avatar>\n				<h2><b>{{review.user}}</b></h2>\n				<div>\n					<div class="rate"><div class="rating" [style.width]="review.rating*20+\'%\'"></div></div>\n					<span font-80>{{review.comment_date_gmt|date:\'dd/MM/yyyy\'}}</span>\n				</div>\n				<p [innerHTML]="review.comment_content"></p>\n			</ion-item>\n		</ion-list>\n	</div>\n	<ion-infinite-scroll (ionInfinite)="loadMore($event)" *ngIf="!over">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\comments\comments.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CommentsPage);
    return CommentsPage;
}());

//# sourceMappingURL=comments.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom




// Page

var RatingPage = /** @class */ (function () {
    function RatingPage(viewCtrl, navParams, navCtrl, http, core, storage, translate, Toast) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.core = core;
        this.storage = storage;
        this.Toast = Toast;
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */];
        this.login = {};
        translate.get('rating').subscribe(function (trans) { return _this.trans = trans; });
        this.id = navParams.get("id");
    }
    RatingPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('login').then(function (login) { if (login)
            _this.login = login; });
    };
    RatingPage.prototype.dismiss = function (reload) {
        if (reload === void 0) { reload = false; }
        this.viewCtrl.dismiss(reload);
    };
    RatingPage.prototype.rating = function () {
        var _this = this;
        var params = {
            product: this.id,
            comment: this.comment,
            ratestar: this.ratingValue,
            namecustomer: this.name,
            emailcustomer: this.email
        };
        var option = {};
        if (this.login && this.login["token"]) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.set('Content-Type', 'application/json; charset=UTF-8');
            headers.set('Authorization', 'Bearer ' + this.login["token"]);
            option['headers'] = headers,
                option['withCredentials'] = true;
        }
        this.core.showLoading();
        this.http.post(wordpress_url + '/wp-json/wooconnector/product/postreviews', params, option)
            .subscribe(function (res) {
            _this.core.hideLoading();
            if (res.json()["result"] == "success" && res.json()["status"] == "approved") {
                _this.dismiss(true);
                _this.Toast.showShortBottom(res.json()["message"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
            else if (res.json()["result"] == "success" && res.json()["status"] == "unapproved") {
                _this.dismiss(true);
                _this.Toast.showShortBottom(res.json()["message"] + _this.trans["confirmMessage"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
            else if (res.json()["result"] == "success" && res.json()["status"] == "trash") {
                _this.dismiss(true);
                _this.Toast.showShortBottom(_this.trans["confirmTrash"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
            else
                _this.Toast.showShortBottom(_this.trans["fail"]).subscribe(function (toast) { }, function (error) { console.log(error); });
        }, function (err) {
            console.log(err.json()['code']);
            _this.core.hideLoading();
            if (err.json()['code'] == 'rest_comment_login_required') {
                _this.navCtrl.push(_this.LoginPage);
            }
            _this.Toast.showShortBottom(err.json()['message']).subscribe(function (toast) { }, function (error) { console.log(error); });
        });
    };
    RatingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-rating',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\rating\rating.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title>{{\'rating.title\'|translate}}</ion-title>\n	<ion-buttons left>\n		<button ion-button clear (click)="dismiss()" class="back-button-md disable-hover button-close">\n			<ion-icon icon-big name="md-close"></ion-icon>\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<h6 dark>{{\'rating.comment_about\'|translate}}</h6>\n	<div margin-vertical class="rating-value">\n		{{\'rating.your_rating\'|translate}}\n		<a *ngFor="let value of [1,2,3,4,5]" (click)="ratingValue = value">\n			<ion-icon *ngIf="value <= ratingValue" name="icon-star"></ion-icon>\n			<ion-icon *ngIf="ratingValue < value || !ratingValue" name="icon-star-out"></ion-icon>\n		</a>\n	</div>\n	<ion-item mode="md" no-padding *ngIf="!login.token">\n		<ion-input placeholder="{{\'rating.name\'|translate}}" [(ngModel)]="name"></ion-input>\n	</ion-item>\n	<ion-item mode="md" no-padding *ngIf="!login.token">\n		<ion-input placeholder="{{\'rating.email\'|translate}}" [(ngModel)]="email"></ion-input>\n	</ion-item>\n	<ion-item mode="md" no-padding>\n		<ion-input placeholder="{{\'rating.comment\'|translate}}" [(ngModel)]="comment"></ion-input>\n	</ion-item>\n	<button ion-fixed bottom ion-button full (click)="rating()" no-margin [disabled]="!ratingValue || !comment">\n		<span text-uppercase>{{\'rating.post\'|translate}}</span>\n	</button>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\rating\rating.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */]])
    ], RatingPage);
    return RatingPage;
}());

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator_core__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_core_service__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom


// Page



var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, formBuilder, http, core, translate, Toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.core = core;
        this.Toast = Toast;
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */];
        translate.get('signup').subscribe(function (trans) { return _this.trans = trans; });
        this.formSignup = formBuilder.group({
            first_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_7__validator_core__["a" /* CoreValidator */].isEmail])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            repass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_7__validator_core__["a" /* CoreValidator */].confirmPassword])]
        });
    }
    SignupPage.prototype.removeConfirm = function () {
        this.formSignup.patchValue({ repass: null });
    };
    SignupPage.prototype.register = function () {
        var _this = this;
        var params = this.formSignup.value;
        params["display_name"] = params["first_name"] + ' ' + params["last_name"];
        params = this.core.objectToURLParams(params);
        this.core.showLoading();
        this.http.post(wordpress_url + '/wp-json/mobiconnector/user/register', params)
            .subscribe(function (res) {
            _this.core.hideLoading();
            _this.Toast.showShortBottom(_this.trans["success"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            _this.gotoLogin();
        }, function (err) {
            _this.core.hideLoading();
            _this.Toast.showShortBottom(err.json()["message"]).subscribe(function (toast) { }, function (error) { console.log(error); });
        });
    };
    SignupPage.prototype.gotoLogin = function () {
        if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().component == this.LoginPage)
            this.navCtrl.pop();
        else
            this.navCtrl.push(this.LoginPage);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\signup\signup.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'signup.title\'|translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding-horizontal>\n<div padding-horizontal>\n	<ion-list class="login-form">\n	  <form [formGroup]="formSignup">\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'general.first_name\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light formControlName="first_name"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'general.last_name\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light formControlName="last_name"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'general.username\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light formControlName="username"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'general.email\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light type="email" formControlName="email"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'general.password\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light type="password" formControlName="password" (input)="removeConfirm()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating><span light>{{\'signup.confirm_password\'|translate}}</span></ion-label>\n			<ion-input dir="{{display_mode}}" light type="password" formControlName="repass"></ion-input>\n		</ion-item>\n	  </form>\n	</ion-list>\n	<button ion-button block text-uppercase (click)="register()" [disabled]="formSignup.invalid">\n		<span>{{\'signup.title\'|translate}}</span>\n	</button>\n	<button ion-button block clear class="disable-hover" color="light" (click)="gotoLogin()">\n		<span>{{\'signup.login\'|translate}}</span>\n	</button>\n</div>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\signup\signup.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_8__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_8__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_4__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validator_core__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom






var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, storage, http, core, formBuilder, translate, Toast, Camera) {
        var _this = this;
        this.storage = storage;
        this.http = http;
        this.core = core;
        this.formBuilder = formBuilder;
        this.Toast = Toast;
        this.Camera = Camera;
        this.wordpress_user = wordpress_url + '/wp-json/mobiconnector/user';
        translate.get('profile.update_successfully').subscribe(function (trans) { return _this.trans = trans; });
        storage.get('login').then(function (val) {
            if (val && val["token"]) {
                _this.login = val;
                core.showLoading();
                storage.get('user').then(function (user) {
                    core.hideLoading();
                    if (user && user["ID"]) {
                        _this.data = user;
                        _this.formEdit = formBuilder.group({
                            first_name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
                            last_name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
                            user_email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__validator_core__["a" /* CoreValidator */].isEmail])],
                            user_pass: []
                        });
                        _this.reset();
                    }
                    else
                        navCtrl.pop();
                });
            }
            else
                navCtrl.pop();
        });
    }
    ProfilePage.prototype.reset = function () {
        this.formEdit.patchValue({
            "first_name": this.data["first_name"],
            "last_name": this.data["last_name"],
            "user_email": this.data["user_email"]
        });
        this.avatar = this.data["mobiconnector_avatar"];
    };
    ProfilePage.prototype.editAvatar = function () {
        var _this = this;
        this.Camera.getPicture({
            quality: 100,
            sourceType: 0,
            allowEdit: true,
            targetWidth: 180,
            targetHeight: 180,
            destinationType: 0
        }).then(function (imageData) {
            _this.avatar = 'data:image/jpeg;base64,' + imageData;
        }, function (err) { });
    };
    ProfilePage.prototype.save = function () {
        var _this = this;
        this.core.showLoading();
        var params = this.formEdit.value;
        params["display_name"] = params["first_name"] + " " + params["last_name"];
        if (this.avatar != this.data["mobiconnector_avatar"])
            params["user_profile_picture"] = this.avatar;
        params = this.core.objectToURLParams(params);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.set('Authorization', 'Bearer ' + this.login["token"]);
        this.http.post(this.wordpress_user + '/update_profile', params, {
            headers: headers,
            withCredentials: true
        }).subscribe(function (res) {
            _this.core.hideLoading();
            _this.storage.set('user', res.json());
            _this.Toast.showShortBottom(_this.trans).subscribe(function (toast) { }, function (error) { console.log(error); });
        }, function (err) {
            _this.core.hideLoading();
            _this.Toast.showShortBottom(err.json()["message"]).subscribe(function (toast) { }, function (error) { console.log(error); });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\profile\profile.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'profile.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button ion-button clear class="disable-hover" color="primary" (click)="save()">\n			<span>{{\'profile.done\'|translate}}</span>\n		</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<div *ngIf="data">\n	<div class="profile-avatar" margin-auto>\n		<img *ngIf="avatar" [src]="avatar" width-100 height-100 (click)="editAvatar()">\n		<img *ngIf="!avatar" src="assets/images/person.png" (click)="editAvatar()">\n	</div>\n	<button ion-button clear icon-left color="dark" margin-auto (click)="editAvatar()" class="disable-hover">\n		<ion-icon name="icon-pen"></ion-icon>\n		<b>{{\'profile.edit\'|translate}}</b>\n	</button>\n	<ion-list class="edit-form" no-margin padding>\n		<form [formGroup]="formEdit">\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating>{{\'general.first_name\'|translate}}</ion-label>\n				<ion-input dark type="text" formControlName="first_name">\n				</ion-input>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating>{{\'general.last_name\'|translate}}</ion-label>\n				<ion-input dark type="text" formControlName="last_name">\n				</ion-input>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating>{{\'general.email\'|translate}}</ion-label>\n				<ion-input dark type="email" formControlName="user_email">\n				</ion-input>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating>{{\'profile.new_password\'|translate}}</ion-label>\n				<ion-input dark type="text" formControlName="user_pass">\n				</ion-input>\n			</ion-item>\n		</form>\n	</ion-list>\n</div>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\profile\profile.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detail_detail__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom





var DetailOrderPage = /** @class */ (function () {
    function DetailOrderPage(navCtrl, navParams, http, storage, core, translate, Toast, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.core = core;
        this.Toast = Toast;
        this.alertCtrl = alertCtrl;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_7__detail_detail__["a" /* DetailPage */];
        this.date_format = date_format;
        translate.get('detailOrder.popup_cancel').subscribe(function (trans) { return _this.trans = trans; });
        this.id = navParams.get('id');
        core.showLoading();
        storage.get('login').then(function (val) {
            if (val && val['token']) {
                _this.login = val;
                _this.getData();
            }
            else
                navCtrl.pop();
        });
    }
    DetailOrderPage.prototype.getData = function () {
        var _this = this;
        this.core.showLoading();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.set('Authorization', 'Bearer ' + this.login["token"]);
        this.http.get(wordpress_url + '/wp-json/wooconnector/order/getorderbyid?order=' + this.id, {
            headers: headers,
            withCredentials: true
        }).subscribe(function (res) {
            _this.data = res.json();
            _this.core.hideLoading();
            _this.content.resize();
        });
    };
    DetailOrderPage.prototype.changeStatus = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: this.trans['message'],
            cssClass: 'alert-no-title alert-cancel-order',
            buttons: [
                {
                    text: this.trans['no']
                },
                {
                    text: this.trans['yes'],
                    cssClass: 'primary',
                    handler: function () {
                        _this.core.showLoading();
                        var params = _this.core.objectToURLParams({ order: _this.id });
                        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
                        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        headers.set('Authorization', 'Bearer ' + _this.login["token"]);
                        _this.http.post(wordpress_url + '/wp-json/wooconnector/order/changestatus', params, {
                            headers: headers,
                            withCredentials: true
                        }).subscribe(function (res) {
                            _this.core.hideLoading();
                            if (res.json()['result'] == 'success') {
                                _this.Toast.showShortBottom(_this.trans["success"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                                _this.navCtrl.pop();
                            }
                            else {
                                _this.Toast.showShortBottom(_this.trans["fail"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DetailOrderPage.prototype.doRefresh = function (refresher) {
        this.getData();
        refresher.complete();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], DetailOrderPage.prototype, "content", void 0);
    DetailOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail-order',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\detail-order\detail-order.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title *ngIf="data">{{\'detailOrder.title\'|translate}}{{data.id}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content secondary-bg>\n<!-- Refresh -->\n<ion-refresher (ionRefresh)="doRefresh($event)">\n	<ion-refresher-content\n		[pullingIcon]="\'general.pullingIcon\'|translate"\n		[pullingText]="\'general.pullToRefresh\'|translate"\n		[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n		[refreshingText]="\'general.refreshing\'|translate">\n	</ion-refresher-content>\n</ion-refresher>\n<!-- Status -->\n<div padding text-left relative *ngIf="data" class="order-status" [ngClass]="data.status">\n	<span light>{{\'detailOrder.order_status\'|translate}}\n		<!-- <span text-capitalize>{{data.status}}</span> -->\n		<span *ngIf="data.status == \'processing\'"  text-capitalize>{{\'order.status.processing\' |translate }}</span>\n		<span *ngIf="data.status == \'on-hold\'"  text-capitalize>{{\'order.status.on_hold\' |translate }}</span>\n		<span  *ngIf="data.status == \'cancelled\'"  text-capitalize>{{\'order.status.cancelled\' |translate }}</span>\n		<span *ngIf="data.status == \'completed\'"  text-capitalize>{{\'order.status.completed\' |translate }}</span>\n		<span *ngIf="data.status == \'pending\'"  text-capitalize>{{\'order.status.pending\' |translate }}</span>\n		<span *ngIf="data.status == \'refunded\'"  text-capitalize>{{\'order.status.refunded\' |translate }}</span>\n		<span *ngIf="data.status == \'failed\'"  text-capitalize>{{\'order.status.failed\' |translate }}</span>\n	</span>\n	<div absolute top right-0 height-100 class="order-date" text-nowrap>{{data.date_created|date:date_format}}</div>\n</div>\n<!-- Address -->\n<ion-list class="address" *ngIf="data && data.shipping">\n	<ion-item-divider color="light">\n		<ion-icon name="icon-location" item-left></ion-icon>\n		<ion-label><b dark>{{\'detailOrder.address\'|translate}}</b></ion-label>\n	</ion-item-divider>\n	<hide-show color="light" show="true" no-border>\n		<span this-title><b>{{\'detailOrder.delivery_address\'|translate}}</b></span>\n		<div this-content>\n			<p><b>{{data.shipping.first_name}} {{data.shipping.last_name}}</b></p>\n			<p>{{data.shipping.company}}</p>\n			<p>{{data.shipping.address_1}} {{data.shipping.address_2}}</p>\n			<p>{{data.shipping.city}}</p>\n			<p>{{data.shipping.country}}</p>\n			<p>{{data.billing.phone}}</p>\n			<p>{{data.shipping.postcode}}</p>\n		</div>\n	</hide-show> \n	<hide-show color="light" show="true" no-border>\n		<span this-title><b>{{\'detailOrder.billing_address\'|translate}}</b></span>\n		<div this-content>\n			<p><b>{{data.billing.first_name}} {{data.billing.last_name}}</b></p>\n			<p>{{data.billing.company}}</p>\n			<p>{{data.billing.address_1}} {{data.billing.address_2}}</p>\n			<p>{{data.billing.city}}</p>\n			<p>{{data.billing.country}}</p>\n			<p>{{data.billing.phone}}</p>\n			<p>{{data.billing.postcode}}</p>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Shipping method -->\n<ion-list *ngIf="data && data.shipping_lines && 0<data.shipping_lines.length">\n	<hide-show color="light" show="true" no-border>\n		<span this-title>\n			<ion-icon name="icon-time" icon-big></ion-icon>\n			<b dark>{{\'detailOrder.shipping_method\'|translate}}</b>\n		</span>\n		<div this-content>\n			<ion-item mode="md" *ngFor="let item of data.shipping_lines" no-padding>\n					<ion-label>\n						<span dark>{{item.method_title}}: </span>\n						<span primary *ngIf="item.total"><span [innerHTML]="item.total"></span></span>\n						<span primary *ngIf="item.total==0" success>{{\'detailOrder.free\'|translate}}</span>\n					</ion-label>\n			</ion-item>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Payment method -->\n<ion-list *ngIf="data && data.payment_method_title">\n	<hide-show color="light" show="true" no-border>\n		<span this-title>\n			<ion-icon name="icon-wallet" icon-big></ion-icon>\n			<b dark>{{\'detailOrder.payment_method\'|translate}}</b>\n		</span>\n		<div this-content>\n			<ion-item mode="md" no-padding>\n				<ion-label><span dark>{{data.payment_method_title}}</span></ion-label>\n			</ion-item>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Payment info -->\n<ion-list *ngIf="data && data.payment_method_title">\n	<hide-show color="light" show="true" no-border>\n		<span this-title>\n			<ion-icon name="ios-card" icon-big></ion-icon>\n			<b dark>{{\'detailOrder.title_card\'|translate}}</b>\n		</span>\n		<div this-content>\n			<div *ngFor="let detail of data.bacs_accounts">\n				<ion-item mode="md" no-padding>\n					<ion-label><span dark>{{\'detailOrder.name\'|translate}}</span><b float-right>{{detail.account_name}}</b></ion-label>\n				</ion-item>\n				<ion-item mode="md" no-padding>\n					<ion-label><span dark>{{\'detailOrder.cartnumber\'|translate}}</span><b float-right>{{detail.account_number}}</b></ion-label>\n				</ion-item>\n				<ion-item mode="md" no-padding>\n					<ion-label><span dark>{{\'detailOrder.bankname\'|translate}}</span><b float-right>{{detail.bank_name}}</b></ion-label>\n				</ion-item>\n			</div>\n		</div>\n	</hide-show> \n</ion-list>\n<!-- Order detail -->\n<ion-list *ngIf="data && data.line_items && 0<data.line_items.length">\n	<hide-show color="light" show="true" no-border>\n		<span this-title width-100 margin-right-order class="item-order-detail">\n			<ion-icon name="icon-list-4" icon-big float-left></ion-icon>\n			<b dark float-left>{{\'detailOrder.order_detail\'|translate}}</b>\n			<span float-right>{{data.line_items.length}} {{\'detailOrder.items\'|translate}}</span>\n		</span>\n		<div this-content>\n			<!-- List product -->\n			<ion-list light-bg class="list-product" padding-vertical no-margin>\n			  <ion-row *ngFor="let product of data.line_items" no-padding relative class="item-product">\n				<ion-col width-25 no-padding [navPush]="DetailPage" [navParams]="{id:product.product_id}">\n					<img *ngIf="product.images.wooconnector_medium" [src]="product.images.wooconnector_medium">\n					<img *ngIf="!product.images.wooconnector_medium" src="assets/images/no-image.png">\n				</ion-col>\n				<ion-col no-padding margin-horizontal [navPush]="DetailPage" [navParams]="{id:product.id}">\n					<span dark [innerHTML]="product.name"></span>\n					<ion-row wrap padding-4-vertical>\n						<ion-col width-50 no-padding *ngFor="let attr of product.meta">\n							<span>{{attr.label}}: </span><b text-capitalize>{{attr.value}}</b>\n						</ion-col>\n					</ion-row>\n					<ion-row class="product-quantity" wrap>\n						<ion-col no-padding>\n							<b dark><span [innerHTML]="product.sale_price"></span> x{{product.quantity}}</b>\n						</ion-col>\n					</ion-row>\n				</ion-col>\n			  </ion-row>\n			</ion-list>\n			<div light-bg dark class="totals" *ngIf="data" padding-bottom>\n				<div margin-bottom><b dark text-uppercase>{{\'detailOrder.totals\'|translate}}</b></div>\n				<ion-row>\n					<ion-col>{{\'detailOrder.total_price\'|translate}}</ion-col>\n					<ion-col text-right [innerHTML]="data.subtotal"></ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col>{{\'detailOrder.shipping\'|translate}}</ion-col>\n					<ion-col text-right *ngIf="data.shipping_total" [innerHTML]="data.shipping_total"></ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col>{{\'detailOrder.tax\'|translate}}</ion-col>\n					<ion-col text-right [innerHTML]="data.total_tax"></ion-col>\n				</ion-row>\n				<ion-row *ngFor="let coupon of data.coupon_lines">\n					<ion-col>{{\'detailOrder.coupon_code\'|translate}} <span gray>({{coupon.code}})</span></ion-col>\n					<ion-col text-right [innerHTML]="\'-\'+coupon.discount"></ion-col>\n				</ion-row>\n				<ion-row>\n					<ion-col><b dark>{{\'detailOrder.order_total\'|translate}}</b></ion-col>\n					<ion-col text-right><b dark [innerHTML]="data.total"></b></ion-col>\n				</ion-row>\n			</div>\n		</div>\n	</hide-show> \n</ion-list>\n<div padding *ngIf="data && (data.status==\'on-hold\' || data.status==\'pending\')" overflow>\n	<button ion-button block (click)="changeStatus()" no-margin class="button-cancel">\n		<span>{{\'detailOrder.cancel_order\'|translate}}</span>\n	</button>\n</div>\n</ion-content>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\detail-order\detail-order.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], DetailOrderPage);
    return DetailOrderPage;
}());

//# sourceMappingURL=detail-order.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PetinfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PetinfoPage = /** @class */ (function () {
    function PetinfoPage(formBuilder) {
        var _this = this;
        this.formBuilder = formBuilder;
        //selectOptions: selectOptions;
        this.faded = false;
        /*this.selectOptions = {
          title: 'Dog Breed',
          subTitle: 'Select your dog breed',
          mode: 'md'
        };*/
        this.formPetInfo = formBuilder.group({
            PetName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            PetBreed: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            PetDOB: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            PetGender: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            PetSize: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]
        });
        setTimeout(function () {
            _this.faded = true;
        }, 100);
    }
    PetinfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-petinfo',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\petinfo\petinfo.html"*/'<!--\n  Generated template for the PetinfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>My Pet</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="page-petinfo" padding>\n	<ion-list no-margin>\n	  <div [formGroup]="formPetInfo">\n		<img float-left width-50 src="assets/images/dogimage.jpg" />\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>Pet Name</span></ion-label>\n				<ion-input dir="{{display_mode}}" light formControlName="PetName"></ion-input>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>Breed</span></ion-label><!--[selectOptions]="selectOptions" -->\n				  <ion-select formControlName="PetBreed" class="select-option">\n					<ion-option value="a">Retrievers (Labrador)</ion-option>\n					<ion-option value="b">German Shepherd Dogs</ion-option>\n					<ion-option value="c">Retrievers (Golden)</ion-option>\n					<ion-option value="d">French Bulldogs</ion-option>\n					<ion-option value="e">Bulldogs</ion-option>\n					<ion-option value="f">Beagles</ion-option>\n					<ion-option value="g">Poodles</ion-option>\n				  </ion-select>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>Date of Birth</span></ion-label>\n				<ion-datetime dir="{{display_mode}}" light formControlName="PetDOB"></ion-datetime>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>Gender</span></ion-label>\n				<ion-select formControlName="PetGender" class="select-option">\n					<ion-option value="m">Male</ion-option>\n					<ion-option value="f">Female</ion-option>\n				</ion-select>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>Size</span></ion-label>\n				<ion-range min="20" max="80" step="2" light formControlName="PetSize" color="danger" pin="true">\n					<ion-icon small range-left name="paw"></ion-icon>\n					<ion-icon large range-right name="paw"></ion-icon>\n				</ion-range>\n			</ion-item>\n	</div>\n\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\petinfo\petinfo.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], PetinfoPage);
    return PetinfoPage;
}());

//# sourceMappingURL=petinfo.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Static; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_config_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Static = /** @class */ (function () {
    function Static(config) {
        this.config = config;
        this.textStatic = {};
        if (config['text_static'])
            this.textStatic = config['text_static'];
    }
    Static.prototype.transform = function (value) {
        if (this.textStatic[value])
            return this.textStatic[value];
        else
            return null;
    };
    Static = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'static'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_config_service__["a" /* Config */]])
    ], Static);
    return Static;
}());

//# sourceMappingURL=static.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LatestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom

// Page

var LatestPage = /** @class */ (function () {
    function LatestPage(core, http) {
        var _this = this;
        this.core = core;
        this.http = http;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */];
        this.page = 1;
        this.products = [];
        this.noProduct = false;
        this.loaddata = false;
        this.faded = false;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.loaddata = true;
                _this.page++;
                setTimeout(function () {
                    _this.faded = true;
                }, 100);
                _this.products = products;
            }
            else {
                _this.faded = true;
                _this.loaddata = true;
                _this.noProduct = true;
            }
        });
    }
    LatestPage.prototype.getProducts = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observable) {
            var params = { post_num_page: _this.page, post_per_page: wordpress_per_page };
            _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
                search: _this.core.objectToURLParams(params)
            }).subscribe(function (products) {
                observable.next(products.json());
                observable.complete();
            });
        });
    };
    LatestPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.page = 1;
        this.faded = false;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0)
                _this.page++;
            _this.products = [];
            _this.products = products;
            _this.over = false;
            setTimeout(function () {
                _this.faded = true;
            }, 100);
            refresher.complete();
        });
    };
    LatestPage.prototype.load = function (infiniteScroll) {
        var _this = this;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.page++;
                _this.products = _this.products.concat(products);
            }
            else
                _this.over = true;
            infiniteScroll.complete();
        });
    };
    LatestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-latest',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\latest\latest.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'latest.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button-cart #cart icon="icon-bag"></button-cart>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<!-- Refresh -->\n<ion-refresher (ionRefresh)="doRefresh($event)">\n	<ion-refresher-content\n		[pullingIcon]="\'general.pullingIcon\'|translate"\n		[pullingText]="\'general.pullToRefresh\'|translate"\n		[refreshingSpinner]="\'general.refreshingSpinner\'|translate"\n		[refreshingText]="\'general.refreshing\'|translate">\n	</ion-refresher-content>\n</ion-refresher>\n<!-- List products -->\n<div width-100 text-center padding *ngIf="!loaddata"><ion-spinner name="ios" ></ion-spinner></div>\n<ion-row padding-8 wrap *ngIf="products && 0<products.length" class="faded-content" [ngClass]="{\'faded-has-content\':faded}">\n	<ion-col padding-8 width-50 *ngFor="let product of products" [navPush]="DetailPage" [navParams]="{id:product.id}">\n		<div relative float-left product-border>\n			<img float-left *ngIf="product.modernshop_images[0].modern_square" [src]="product.modernshop_images[0].modern_square" />\n			<img float-left *ngIf="!product.modernshop_images[0].modern_square" src="assets/images/no-image.png" />\n			<div absolute bottom primary-bg product-sale *ngIf="product.sale_price && product.type!=\'variable\' && product.type!=\'grouped\'">\n				<span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n			</div>\n			<img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n			<img absolute icon-outstock *ngIf="!product.in_stock" src="assets/images/outstock.png" />\n		</div>\n		<p float-left width-100>\n			<span *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n				<!-- <b dark font-120>{{product.price*1||0|price}}</b>\n				<span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n				<span dark class="simple-price" [innerHTML]="product.price_html"></span>\n			</span>\n			<span *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n				<b dark font-120 [innerHTML]="product.price_html"></b>\n			</span>\n		</p>\n		<span float-left width-100 [innerHTML]="product.name"></span>\n	</ion-col>\n</ion-row>\n<div padding *ngIf="products.length <1 && noresuilt" text-center>{{\'general.no_data\'|translate}}</div>\n<ion-infinite-scroll (ionInfinite)="load($event)" *ngIf="!over">\n	<ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\latest\latest.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], LatestPage);
    return LatestPage;
}());

//# sourceMappingURL=latest.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupadsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PopupadsPage = /** @class */ (function () {
    function PopupadsPage(navCtrl, viewCtrl, http, navParams, storage) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.storage = storage;
        // this.getPopup();
        this.data = navParams.get('image');
    }
    PopupadsPage.prototype.openPopup = function (check) {
        this.storage.set('require', true);
        this.viewCtrl.dismiss(check);
    };
    PopupadsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popupads',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\popupads\popupads.html"*/'<ion-header>\n	<ion-buttons end margin-0 relative>\n		<button ion-button clear margin-0  class="disable-hover" (tap)="openPopup()">\n			<ion-icon class="icon-closepopup" name="ios-close"></ion-icon>\n		</button>\n	</ion-buttons>\n</ion-header>\n\n<ion-content *ngIf="data" class="popup-content">\n	<div class="popup-body" (tap)="openPopup(true)">\n		<img [src]="data" />\n	</div>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\popupads\popupads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], PopupadsPage);
    return PopupadsPage;
}());

//# sourceMappingURL=popupads.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_storage_multi_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__address_address__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__detail_detail__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__appointment_appointment__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom






//Pipes

// Page



 //Lim
var CartPage = /** @class */ (function () {
    function CartPage(storage, storageMul, navCtrl, http, alertCtrl, core, translate, Toast, config) {
        var _this = this;
        this.storage = storage;
        this.storageMul = storageMul;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.core = core;
        this.Toast = Toast;
        this.AddressPage = __WEBPACK_IMPORTED_MODULE_10__address_address__["a" /* AddressPage */];
        this.AppointmentPage = __WEBPACK_IMPORTED_MODULE_13__appointment_appointment__["a" /* AppointmentPage */]; //Lim
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_11__login_login__["a" /* LoginPage */];
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_12__detail_detail__["a" /* DetailPage */];
        this.tax = 0;
        this.coupon = [];
        this.trans = {};
        this.checkCart = false;
        translate.get('cart').subscribe(function (trans) { return _this.trans = trans; });
        this.getData();
        if (config['required_login'])
            this.check_require_login = config['required_login'];
    }
    CartPage.prototype.ionViewDidEnter = function () {
        if (this.isCache)
            this.getData();
        else
            this.isCache = true;
    };
    CartPage.prototype.getData = function () {
        var _this = this;
        this.storageMul.get(['cart', 'coupon', 'login']).then(function (val) {
            if (val && val['cart'])
                _this.data = val['cart'];
            else
                _this.checkCart = true;
            if (val && val['coupon'])
                _this.coupon = val['coupon'];
            _this.login = val['login'];
            if (_this.data && Object.keys(_this.data).length > 0)
                _this.validate();
            console.log(_this.data);
            console.log(_this.checkCart);
        });
    };
    CartPage.prototype.shop = function () {
        this.navCtrl.popToRoot();
    };
    CartPage.prototype.delete = function (id) {
        var data = Object.assign({}, this.data);
        delete data[id];
        this.data = data;
        this.update();
    };
    CartPage.prototype.update = function () {
        var _this = this;
        if (Object.keys(this.data).length > 0) {
            this.storage.set('cart', this.data).then(function () {
                _this.validate();
            });
        }
        else {
            this.storage.remove('cart').then(function () {
                console.log('empty cart');
                _this.checkCart = true;
            });
        }
    };
    CartPage.prototype.validate = function () {
        var _this = this;
        this.core.showLoading();
        var params = {};
        var products = [];
        new __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__["a" /* ObjectToArray */]().transform(this.data).forEach(function (product) {
            var now = {};
            now['product_id'] = product['id'];
            now['quantity'] = product['quantity'];
            if (product['variation_id'])
                now['variation_id'] = product['variation_id'];
            products.push(now);
        });
        params['products'] = JSON.stringify(products);
        params['coupons'] = JSON.stringify(this.coupon);
        var option = {};
        if (this.login && this.login['token']) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers.set('Authorization', 'Bearer ' + this.login["token"]);
            option['withCredentials'] = true;
            option['headers'] = headers;
        }
        this.http.post(wordpress_url + '/wp-json/wooconnector/calculator/addcoupons', this.core.objectToURLParams(params), option)
            .subscribe(function (res) {
            var resp = res.json();
            _this.core.hideLoading();
            _this.tax = 0;
            if (resp['errors']) {
                var message = '';
                var data = Object.assign({}, _this.data);
                for (var key in resp['errors']) {
                    if (resp['errors'][key] && resp['errors'][key]['code'] == 'rest_product_error') {
                        delete data[key];
                        _this.data = data;
                        _this.update();
                    }
                    if (resp['errors'][key] && resp['errors'][key]['errors']) {
                        for (var key1 in resp['errors'][key]['errors']) {
                            if (resp['errors'][key]['errors'][key1]) {
                                message += resp['errors'][key]['errors'][key1][0];
                            }
                        }
                    }
                    if (resp['errors'][key] && resp['errors'][key]['message']) {
                        message += resp['errors'][key]['message'];
                    }
                }
                if (resp['discount']) {
                    var coupon_1 = [];
                    resp['discount'].forEach(function (item) {
                        coupon_1.push(item['code']);
                    });
                    _this.storage.set('coupon', coupon_1).then(function () {
                        _this.coupon = coupon_1;
                    });
                }
                _this.couponData = [];
                _this.coupon.forEach(function (item) {
                    _this.couponData.push({ code: item });
                });
                _this.showAlert(message);
            }
            else
                _this.invalid = false;
            if (resp['discount']) {
                if (Array.isArray(resp['tax']))
                    resp['tax'].forEach(function (tax) { return _this.tax += tax['value']; });
                _this.couponData = resp['discount'];
            }
            else if (resp['total']) {
                resp['total'].forEach(function (product) { return _this.tax += product['tax']; });
            }
        }, function (error) {
            if (error.json()['message']) {
                _this.couponData = [];
                _this.coupon.forEach(function (item) {
                    _this.couponData.push({ code: item });
                });
                _this.invalid = true;
                _this.core.hideLoading();
                _this.showAlert(error.json()['message']);
            }
        });
    };
    CartPage.prototype.showAlert = function (message) {
        var _this = this;
        if (message == 'Sorry, Coupon only one.') {
            message += this.trans["remove_couponOnly"];
            var alert_1 = this.alertCtrl.create({
                message: message,
                cssClass: 'alert-no-title',
                buttons: [
                    {
                        text: this.trans["confirm"]["no"],
                        role: 'cancel'
                    },
                    {
                        text: this.trans["confirm"]["yes"],
                        handler: function () {
                            _this.coupon = [];
                            _this.couponData = [];
                            _this.storage.remove('coupon');
                            _this.apply();
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            if (message) {
                var alert_2 = this.alertCtrl.create({
                    message: message,
                    cssClass: 'alert-no-title',
                    buttons: [
                        {
                            text: this.trans['validate'],
                            handler: function () {
                                _this.couponCode = '';
                            }
                        }
                    ]
                });
                alert_2.present();
            }
        }
    };
    CartPage.prototype.apply = function () {
        var _this = this;
        if (this.couponCode && this.coupon.indexOf(this.couponCode) != -1) {
            this.Toast.showShortBottom(this.trans["already_applied"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            return;
        }
        this.core.showLoading();
        var params = {};
        var products = [];
        new __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__["a" /* ObjectToArray */]().transform(this.data).forEach(function (product) {
            var now = {};
            now['product_id'] = product['id'];
            now['quantity'] = product['quantity'];
            if (product['variation_id'])
                now['variation_id'] = product['variation_id'];
            products.push(now);
        });
        params['products'] = JSON.stringify(products);
        var coupon;
        if (this.couponCode && this.coupon.indexOf(this.couponCode) == -1)
            coupon = this.coupon.concat(this.couponCode);
        else
            coupon = this.coupon.slice();
        params['coupons'] = JSON.stringify(coupon);
        var option = {};
        if (this.login && this.login['token']) {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
            headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers.set('Authorization', 'Bearer ' + this.login["token"]);
            option['withCredentials'] = true;
            option['headers'] = headers;
        }
        this.http.post(wordpress_url + '/wp-json/wooconnector/calculator/addcoupons', this.core.objectToURLParams(params), option)
            .subscribe(function (res) {
            var resp = res.json();
            _this.core.hideLoading();
            // this.tax = 0;
            if (resp['errors']) {
                var message = '';
                for (var key in resp['errors']) {
                    if (resp['errors'][key] && resp['errors'][key]['errors']) {
                        for (var key1 in resp['errors'][key]['errors']) {
                            if (resp['errors'][key]['errors'][key1]) {
                                message += resp['errors'][key]['errors'][key1][0];
                            }
                        }
                    }
                }
                _this.showAlert(message);
            }
            else {
                if (resp['discount']) {
                    if (Array.isArray(resp['tax']))
                        resp['tax'].forEach(function (tax) { return _this.tax += tax['value']; });
                    _this.storage.set('coupon', coupon).then(function () {
                        _this.coupon = coupon;
                        _this.couponData = resp['discount'];
                        _this.couponCode = null;
                        _this.Toast.showShortBottom(_this.trans["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    });
                }
                else {
                    resp['total'].forEach(function (product) { return _this.tax += product['tax']; });
                }
            }
        }, function (error) {
            if (error.json()['message']) {
                _this.core.hideLoading();
                var alert_3 = _this.alertCtrl.create({
                    message: error.json()['message'],
                    cssClass: 'alert-no-title',
                    buttons: [_this.trans['validate']]
                });
                alert_3.present();
            }
        });
    };
    CartPage.prototype.remove = function (index) {
        var _this = this;
        if (this.coupon.length == 1) {
            this.storage.remove('coupon').then(function () {
                _this.coupon = [];
                _this.couponData = [];
                _this.validate();
                _this.Toast.showShortBottom(_this.trans["remove"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            });
        }
        else {
            var coupon = this.coupon.slice(0);
            coupon.splice(Number(index), 1);
            this.storage.set('coupon', coupon).then(function () {
                _this.coupon.splice(Number(index), 1);
                _this.couponData.splice(Number(index), 1);
                _this.validate();
                _this.Toast.showShortBottom(_this.trans["remove"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            });
        }
    };
    CartPage.prototype.total = function () {
        var total = 0;
        for (var key in this.data) {
            var product = this.data[key];
            if (Number(product.sale_price) > 0) {
                total += Number(product.sale_price) * product.quantity;
            }
            else {
                total += Number(product.regular_price) * product.quantity;
            }
        }
        return total;
    };
    CartPage.prototype.gotoAppointment = function () {
        var _this = this;
        if (this.check_require_login) {
            if (this.login)
                this.navCtrl.push(this.AppointmentPage);
            else
                this.navCtrl.push(this.LoginPage);
        }
        else {
            if (this.login)
                this.navCtrl.push(this.AppointmentPage);
            else {
                var alert_4 = this.alertCtrl.create({
                    message: this.trans['confirm']['message'],
                    cssClass: 'alert-no-title alert-signout',
                    buttons: [
                        {
                            text: this.trans['confirm']["no"],
                            cssClass: 'dark',
                            handler: function () {
                                _this.navCtrl.push(_this.AppointmentPage);
                            }
                        },
                        {
                            text: this.trans['confirm']["yes"],
                            handler: function () {
                                _this.navCtrl.push(_this.LoginPage);
                            }
                        }
                    ]
                });
                alert_4.present();
            }
        }
    };
    CartPage.prototype.gotoAddress = function () {
        var _this = this;
        if (this.check_require_login) {
            if (this.login)
                this.navCtrl.push(this.AddressPage);
            else
                this.navCtrl.push(this.LoginPage);
        }
        else {
            if (this.login)
                this.navCtrl.push(this.AddressPage);
            else {
                var alert_5 = this.alertCtrl.create({
                    message: this.trans['confirm']['message'],
                    cssClass: 'alert-no-title alert-signout',
                    buttons: [
                        {
                            text: this.trans['confirm']["no"],
                            cssClass: 'dark',
                            handler: function () {
                                _this.navCtrl.push(_this.AddressPage);
                            }
                        },
                        {
                            text: this.trans['confirm']["yes"],
                            handler: function () {
                                _this.navCtrl.push(_this.LoginPage);
                            }
                        }
                    ]
                });
                alert_5.present();
            }
        }
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\cart\cart.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title>{{\'cart.title\'|translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content secondary-bg>\n<!-- Empty -->\n<ion-row center *ngIf="checkCart && (data|ObjectToArray).length < 1" ion-fixed width-100 height-100>\n	<ion-col width-50 style="margin:0 auto" text-center>\n		<h1><ion-icon name="icon-favorite"></ion-icon></h1>\n		<span>{{\'cart.empty\'|translate}}</span>\n		<button ion-button block (click)="shop()">{{\'cart.shop\'|translate}}</button>\n	</ion-col>\n</ion-row>\n<!-- Have product -->\n<div *ngIf="0 < (data|ObjectToArray).length">\n<!-- List product -->\n<ion-list padding light-bg class="list-product">\n  <ion-row *ngFor="let product of (data|ObjectToArray)" no-padding relative class="item-product">\n    <ion-col width-25 no-padding [navPush]="DetailPage" [navParams]="{id:product.id}">\n		<img *ngIf="product.images" [src]="product.images" />\n		<img *ngIf="!product.images" src="assets/images/no-image.png" />\n	</ion-col>\n	<ion-col no-padding margin-left>\n		<div dark right [innerHTML]="product.name" [navPush]="DetailPage" [navParams]="{id:product.id}"></div>\n		<ion-row wrap padding-4-vertical>\n			<ion-col width-50 no-padding *ngFor="let attr of (product.attributes|ObjectToArray)">\n				<span>{{attr.name}}: </span><b text-capitalize>{{attr.option}}</b>\n			</ion-col>\n		</ion-row>\n		<ion-row class="product-quantity" wrap>\n			<ion-col no-padding class="btn-quantity">\n				<div width-100>\n					<span *ngIf="product.sale_price" text-through>{{product.regular_price|price}}</span>\n					<b left dark>{{product.price||0|price}}</b>\n				</div>\n				<div width-100 *ngIf="!product.sold_individually">\n					<div float-left margin-2><span gray>{{\'cart.qty\'|translate}}</span></div>\n					<button-quantity [(ngModel)]="data[product.idCart].quantity" (update)="update()"></button-quantity>\n				</div>\n			</ion-col>\n			<!-- <ion-col no-padding  >\n				\n			</ion-col> -->\n		</ion-row>\n	</ion-col>\n	<button ion-button clear color="gray" absolute no-margin class="button-delete disable-hover" (click)="delete(product.idCart)">\n		<ion-icon name="icon-trash"></ion-icon>\n	</button>\n  </ion-row>\n</ion-list>\n<!-- Coupon -->\n<ion-list class="cart-coupon">\n	<ion-item>\n		<ion-label color="dark" stacked>\n			<b>{{\'cart.have_coupon\'|translate}}</b>\n		</ion-label>\n		<ion-input dir="{{display_mode}}" placeholder="{{\'cart.coupon_here\'|translate}}" [(ngModel)]="couponCode">\n		</ion-input>\n		<button ion-button item-right text-uppercase [disabled]="!couponCode" (click)="apply()">\n			<span text-uppercase>{{\'cart.apply\'|translate}}</span>\n		</button>\n	</ion-item>\n</ion-list>\n<div padding margin-top light-bg dark class="totals">\n	<div margin-bottom><b dark text-uppercase>{{\'cart.totals\'|translate}}</b></div>\n	<ion-row>\n		<ion-col text-left>{{\'cart.total_price\'|translate}}</ion-col>\n		<ion-col text-right>{{total()|price}}</ion-col>\n	</ion-row>\n	<ion-row>\n		<ion-col text-left>{{\'cart.tax\'|translate}}</ion-col>\n		<ion-col text-right>{{tax|price}}</ion-col>\n	</ion-row>\n	 <ion-row *ngFor="let coupon of couponData; let i=index">\n		<ion-col width-66 class="detail-coupon">\n			<span float-left>{{\'cart.coupon_code\'|translate}}</span>\n			<span primary float-left margin-left> ({{coupon.code}})\n				<!-- <span *ngIf="coupon.value">: -{{((coupon.value*1)/total()*100)|number:\'1.2-2\'}}%</span>)  -->\n			</span>\n			<ion-icon gray tappable margin-left (click)="remove(i)" name="ios-close-circle-outline" float-left></ion-icon>\n		</ion-col>\n		<ion-col text-right primary *ngIf="coupon.value">-{{coupon.value|price}}</ion-col>\n	</ion-row> \n	<button ion-button block icon-right margin-top (click)="gotoAppointment()" [disabled]="invalid" class="button-appointment">\n		<span text-uppercase>APPOINTMENT<!--{{\'appointment\'|translate}}--></span>\n		<ion-icon name="ios-arrow-round-forward"></ion-icon>\n	</button>\n	<!--<button ion-button block icon-right margin-top (click)="gotoAddress()" [disabled]="invalid" class="button-checkout">\n		<span text-uppercase>{{\'cart.checkout\'|translate}}</span>\n		<ion-icon name="ios-arrow-round-forward"></ion-icon>\n	</button>-->\n</div>\n</div>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>\n\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\cart\cart.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_storage_multi_service__["a" /* StorageMulti */], __WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_9__pipes_object_to_array__["a" /* ObjectToArray */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__service_storage_multi_service__["a" /* StorageMulti */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_8__service_config_service__["a" /* Config */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThanksPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_order__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Page


var ThanksPage = /** @class */ (function () {
    function ThanksPage(navParams, storage) {
        this.OrderPage = __WEBPACK_IMPORTED_MODULE_2__order_order__["a" /* OrderPage */];
        this.params = navParams.get('params');
        console.log(this.params);
        // storage.get('login').then(val => {
        // 	if(val && val['token']) this.isLogin = true;
        // });
    }
    ThanksPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-thanks',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\thanks\thanks.html"*/'<ion-header text-center>\n  <ion-navbar hideBackButton="true" text-center>\n    <ion-title>\n		<ion-icon name="icon-check" light></ion-icon>\n		<span light> {{\'thanks.title\'|translate}}</span>\n	</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-title>\n		<div light><b [innerHTML]="\'modern_order_success_thanks\'|static"></b></div>\n		<div light margin-bottom>{{\'thanks.yourID\'|translate}}{{params.id}}</div>\n	</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="page-thanks" padding>\n	<ion-row center ion-fixed width-100 *ngIf="params.token">\n		<ion-col width-50 text-center class="text-order">\n			<h1><ion-icon name="icon-list-4"></ion-icon></h1>\n			<p [innerHTML]="\'modern_canreview_order_title\'|static"></p>\n			<button ion-button block [navPush]="OrderPage">{{\'thanks.myOrder\'|translate}}</button>\n		</ion-col>\n	</ion-row>\n</ion-content>\n\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\thanks\thanks.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], ThanksPage);
    return ThanksPage;
}());

//# sourceMappingURL=thanks.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddEventPage = /** @class */ (function () {
    function AddEventPage(alertCtrl, navCtrl, navParams, calendar) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.event = { title: "", location: "", message: "", startDate: "", endDate: "" };
    }
    AddEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddEventPage');
    };
    AddEventPage.prototype.save = function () {
        var _this = this;
        this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(function (msg) {
            var alert = _this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'Event saved successfully',
                buttons: ['OK']
            });
            alert.present();
            _this.navCtrl.pop();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Failed!',
                subTitle: err,
                buttons: ['OK']
            });
            alert.present();
        });
    };
    AddEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-event',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\add-event\add-event.html"*/'<!--\n  Generated template for the AddEventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add Event</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="save()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="event.title" name="event.title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Location</ion-label>\n        <ion-input type="text" [(ngModel)]="event.location" name="event.location"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Notes</ion-label>\n        <ion-input type="text" [(ngModel)]="event.message" name="event.message"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Start Date</ion-label>\n        <!--<ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.startDate" name="event.startDate"></ion-datetime>-->\n		<ion-input type="date" [(ngModel)]="event.startDate" name="event.startDate"></ion-input>\n	  </ion-item>\n      <ion-item>\n        <ion-label floating>End Date</ion-label>\n        <!--<ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.endDate" name="event.endDate"></ion-datetime>-->\n		<ion-input type="time" [(ngModel)]="event.endDate" name="event.endDate"></ion-input>\n	  </ion-item>\n      <ion-item>\n        <button ion-button type="submit" full round>Save</button>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\add-event\add-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */]])
    ], AddEventPage);
    return AddEventPage;
}());

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditEventPage = /** @class */ (function () {
    function EditEventPage(alertCtrl, navCtrl, navParams, calendar) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.calendar = calendar;
        this.event = { title: "", location: "", message: "", startDate: "", endDate: "" };
        this.oldEvent = { title: "", location: "", message: "", startDate: "", endDate: "" };
        this.event = navParams.get("event");
        var startDate = new Date(navParams.get("event").startDate.replace(/\s/, 'T')).toISOString();
        var endDate = new Date(navParams.get("event").endDate.replace(/\s/, 'T')).toISOString();
        this.event.startDate = startDate;
        this.event.endDate = endDate;
        this.oldEvent = this.event;
    }
    EditEventPage.prototype.ionViewDidLoad = function () {
        console.log(this.event);
    };
    EditEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-event',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\edit-event\edit-event.html"*/'<!--\n  Generated template for the EditEventPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Edit Event</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="update()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Title</ion-label>\n        <ion-input type="text" [(ngModel)]="event.title" name="event.title"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Location</ion-label>\n        <ion-input type="text" [(ngModel)]="event.location" name="event.location"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Notes</ion-label>\n        <ion-input type="text" [(ngModel)]="event.message" name="event.message"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Start Date</ion-label>\n        <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.startDate" name="event.startDate"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>End Date</ion-label>\n        <ion-datetime displayFormat="DD MMM YYYY" pickerFormat="MM/DD/YYYY" [(ngModel)]="event.endDate" name="event.endDate"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <button ion-button type="submit" full round>Update</button>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\edit-event\edit-event.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_calendar__["a" /* Calendar */]])
    ], EditEventPage);
    return EditEventPage;
}());

//# sourceMappingURL=edit-event.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_pro__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ionic_pro__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_screen_orientation__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_about_footer_about_footer__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_button_cart_button_cart__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_footer_tabs_footer_tabs__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_button_quantity_button_quantity__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_hide_show_hide_show__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pipes_filter__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_array_join__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_order_by__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pipes_range__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_price__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pipes_time_ago__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pipes_static__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pipes_viewmore__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_common__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_categories_categories__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_detail_category_detail_category__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_search_search__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_account_account__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_signup_signup__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_detail_detail__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_cart_cart__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_comments_comments__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_rating_rating__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_order_order__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_favorite_favorite__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_terms_terms__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_petinfo_petinfo__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_privacy_privacy__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_contact_contact__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_about_about__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_popupads_popupads__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_address_address__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_appointment_appointment__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_checkout_checkout__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_detail_order_detail_order__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_thanks_thanks__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_latest_latest__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_camera__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_network__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_onesignal__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_social_sharing__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__ionic_native_calendar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_date_picker__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_add_event_add_event__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_edit_event_edit_event__ = __webpack_require__(252);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





__WEBPACK_IMPORTED_MODULE_4__ionic_pro__["Pro"].init('d32002e9', {
    appVersion: '1.1.2'
});


function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["d" /* TranslateStaticLoader */](http, './assets/i18n', '.json');
}

























































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_27__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__components_about_footer_about_footer__["a" /* AboutFooterComponent */],
                __WEBPACK_IMPORTED_MODULE_28__pages_categories_categories__["a" /* CategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_detail_category_detail_category__["a" /* DetailCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_12__components_button_cart_button_cart__["a" /* ButtonCartComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_footer_tabs_footer_tabs__["a" /* FooterTabsComponent */],
                __WEBPACK_IMPORTED_MODULE_34__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_14__components_button_quantity_button_quantity__["a" /* ButtonQuantityComponent */],
                __WEBPACK_IMPORTED_MODULE_17__pipes_filter__["a" /* Filter */],
                __WEBPACK_IMPORTED_MODULE_18__pipes_array_join__["a" /* ArrayJoin */],
                __WEBPACK_IMPORTED_MODULE_19__pipes_object_to_array__["a" /* ObjectToArray */],
                __WEBPACK_IMPORTED_MODULE_36__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_rating_rating__["a" /* RatingPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_order_order__["a" /* OrderPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_favorite_favorite__["a" /* FavoritePage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_petinfo_petinfo__["a" /* PetinfoPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_popupads_popupads__["a" /* PopupadsPage */],
                __WEBPACK_IMPORTED_MODULE_15__components_hide_show_hide_show__["a" /* HideShowComponent */],
                __WEBPACK_IMPORTED_MODULE_20__pipes_order_by__["a" /* OrderBy */],
                __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_appointment_appointment__["a" /* AppointmentPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_21__pipes_range__["a" /* Range */],
                __WEBPACK_IMPORTED_MODULE_22__pipes_price__["a" /* Price */],
                __WEBPACK_IMPORTED_MODULE_50__pages_detail_order_detail_order__["a" /* DetailOrderPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_thanks_thanks__["a" /* ThanksPage */],
                __WEBPACK_IMPORTED_MODULE_23__pipes_time_ago__["a" /* TimeAgo */],
                __WEBPACK_IMPORTED_MODULE_52__pages_latest_latest__["a" /* LatestPage */],
                __WEBPACK_IMPORTED_MODULE_24__pipes_static__["a" /* Static */],
                __WEBPACK_IMPORTED_MODULE_25__pipes_viewmore__["a" /* Viewmore */],
                __WEBPACK_IMPORTED_MODULE_62__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_edit_event_edit_event__["a" /* EditEventPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    backButtonIcon: 'md-arrow-back',
                    mode: 'ios',
                    pageTransition: 'md-transition',
                    animate: false,
                    scrollAssist: false,
                    autoFocusAssist: false
                }, {
                    links: [
                        { loadChildren: '../pages/add-event/add-event.module#AddEventPageModule', name: 'AddEventPage', segment: 'add-event', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edit-event/edit-event.module#EditEventPageModule', name: 'EditEventPage', segment: 'edit-event', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["b" /* TranslateModule */].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */]]
                }),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: 'woocommerce_application',
                    driverOrder: ['sqlite', 'websql', 'indexeddb']
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_27__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_categories_categories__["a" /* CategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_detail_category_detail_category__["a" /* DetailCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_comments_comments__["a" /* CommentsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_rating_rating__["a" /* RatingPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_order_order__["a" /* OrderPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_favorite_favorite__["a" /* FavoritePage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_terms_terms__["a" /* TermsPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_petinfo_petinfo__["a" /* PetinfoPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_popupads_popupads__["a" /* PopupadsPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_appointment_appointment__["a" /* AppointmentPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_detail_order_detail_order__["a" /* DetailOrderPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_thanks_thanks__["a" /* ThanksPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_latest_latest__["a" /* LatestPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_add_event_add_event__["a" /* AddEventPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_edit_event_edit_event__["a" /* EditEventPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_60__ionic_native_calendar__["a" /* Calendar */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_date_picker__["a" /* DatePicker */],
                __WEBPACK_IMPORTED_MODULE_16__service_config_service__["a" /* Config */],
                __WEBPACK_IMPORTED_MODULE_26__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_54__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_55__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_56__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_57__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_59__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_admob_free__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_analytics__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_screen_orientation__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_device__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import 'es6-shim';
// Custom








// Page

var MyApp = /** @class */ (function () {
    function MyApp(platform, translate, storage, http, core, config, ngZone, alertCtrl, statusBar, SplashScreen, Network, screenOrientation, ga, admobFree, device, keyboard) {
        var _this = this;
        this.translate = translate;
        this.storage = storage;
        this.http = http;
        this.core = core;
        this.config = config;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.statusBar = statusBar;
        this.SplashScreen = SplashScreen;
        this.Network = Network;
        this.screenOrientation = screenOrientation;
        this.ga = ga;
        this.admobFree = admobFree;
        this.device = device;
        this.keyboard = keyboard;
        this.HomePage = __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            statusBar.overlaysWebView(false);
            statusBar.styleDefault();
            var html = document.querySelector('html');
            html.setAttribute("dir", display_mode);
            translate.setDefaultLang(application_language);
            translate.use(application_language);
            storage.set('require', false);
            if (platform.is('cordova')) {
                //keyboard.hideKeyboardAccessoryBar(true);
                screenOrientation.lock('portrait');
                var operating_system_1 = '';
                var admob = {};
                if (device.platform == 'Android') {
                    operating_system_1 = 'Android';
                    admob = {
                        banner: admob_android_banner,
                        interstitial: admob_android_interstitial
                    };
                }
                else if (device.platform == 'iOS') {
                    operating_system_1 = 'iOS';
                    admob = {
                        banner: admob_ios_banner,
                        interstitial: admob_ios_interstitial
                    };
                }
                if (admob['banner']) {
                    var bannerConfig = {
                        id: admob['banner'],
                        autoShow: false
                    };
                    admobFree.banner.config(bannerConfig);
                    admobFree.banner.prepare()
                        .then(function () { console.log('banner prepare'); })
                        .catch(function (e) { return console.log(e); });
                }
                if (admob['interstitial']) {
                    var interstitialConfig = {
                        id: admob['interstitial'],
                        autoShow: false
                    };
                    admobFree.interstitial.config(interstitialConfig);
                    admobFree.interstitial.prepare()
                        .then(function () {
                        console.log('interstitial prepare');
                    }).catch(function (e) { return console.log(e); });
                }
                if (google_analytics) {
                    ga.startTrackerWithId(google_analytics).then(function () {
                        ga.trackView(operating_system_1);
                    }).catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
                    ;
                }
                Network.onDisconnect().subscribe(function () {
                    ngZone.run(function () { _this.disconnect = true; });
                });
                Network.onConnect().subscribe(function () {
                    ngZone.run(function () { _this.disconnect = false; });
                });
            }
        });
        storage.get('text').then(function (val) {
            var html = document.querySelector('html');
            html.className = val;
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n<!-- <ion-row width-100 height-100 center *ngIf="!isLoaded">\n	<ion-col relative light-bg>\n		<div absolute text-center width-100 style="top:46%;">\n			<ion-spinner></ion-spinner>\n		</div>\n	</ion-col>\n</ion-row> -->\n<div absolute padding text-center width-100 primary-bg *ngIf="isLoaded && disconnect" class="disconnect">\n	{{\'general.disconnect\'|translate}}\n</div>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_admob_free__["a" /* AdMobFree */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_analytics__["a" /* GoogleAnalytics */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_device__["a" /* Device */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_9__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_admob_free__["a" /* AdMobFree */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__comments_comments__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom








//Pipes

//Page

var DetailPage = /** @class */ (function () {
    function DetailPage(navParams, core, http, storage, translate, alertCtrl, navCtrl, Toast, SocialSharing, PhotoViewer, platform, InAppBrowser) {
        var _this = this;
        this.core = core;
        this.http = http;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.Toast = Toast;
        this.SocialSharing = SocialSharing;
        this.PhotoViewer = PhotoViewer;
        this.platform = platform;
        this.InAppBrowser = InAppBrowser;
        this.CommentsPage = __WEBPACK_IMPORTED_MODULE_12__comments_comments__["a" /* CommentsPage */];
        this.DetailPage = DetailPage_1;
        this.slides = 1;
        this.quantity = 1;
        this.detail = { wooconnector_crop_images: [] };
        this.attributes = {};
        this.reviewCount = [];
        this.favorite = {};
        this.trans = {};
        this.viewMore = false;
        this.page = 1;
        this.faded = false;
        this.loaddata = false;
        this.display = display_mode;
        translate.get('detail').subscribe(function (trans) { return _this.trans = trans; });
        this.id = navParams.get("id");
        this.storage.get('favorite').then(function (val) { if (val)
            _this.favorite = val; });
        this.getData();
    }
    DetailPage_1 = DetailPage;
    DetailPage.prototype.ionViewDidEnter = function () {
        this.buttonCart.update();
    };
    DetailPage.prototype.getData = function () {
        var _this = this;
        // let params = { product_id: this.id };
        // this.core.showLoading();
        this.getProducts().subscribe(function (res) {
            _this.detail = res;
            _this.loaddata = true;
            setTimeout(function () {
                _this.faded = true;
            }, 100);
            _this.reviews_allowed = _this.detail['reviews_allowed'];
            _this.rating = _this.detail['average_rating'];
            _this.ratingCount = _this.detail['rating_count'];
            _this.reviewCount = _this.detail['wooconnector_reviews'];
            _this.description = _this.detail['description'];
            if (!_this.detail['wooconnector_crop_images']) {
                var noImages = { wooconnector_large: 'assets/images/no-image.png' };
                _this.detail['wooconnector_crop_images'] = [];
                _this.detail['wooconnector_crop_images'].push(noImages);
            }
            if (_this.detail['type'] == 'grouped') {
                _this.groupedProduct = _this.detail['grouped_products'].slice();
                _this.groupedProduct.forEach(function (product) {
                    product['quantity'] = 1;
                });
            }
            if (_this.detail['type'] == 'variable')
                _this.images = _this.detail['wooconnector_crop_images'].slice();
            //create attributes
            if (_this.detail.attributes) {
                _this.detail.attributes.forEach(function (val) {
                    if (val["variation"]) {
                        _this.attributes[val["name"]] = {};
                        _this.attributes[val["name"]].id = val["id"];
                        _this.attributes[val["name"]].name = val["name"];
                        _this.attributes[val["name"]].option = val["options"][0].toLowerCase();
                    }
                });
            }
            // //default_attributes
            if (_this.detail.default_attributes.length > 0) {
                _this.detail.default_attributes.forEach(function (val) {
                    _this.attributes[val["name"]].option = val["option"].toLowerCase();
                });
            }
            _this.getVariation();
            // this.core.hideLoading();
            // this.http.get(wordpress_url + '/wp-json/mobiconnector/post/counter_view?post_id=' + this.id)
            // 	.subscribe(() => { this.core.hideLoading(); });
        });
    };
    DetailPage.prototype.getProducts = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"](function (observable) {
            var params = { post_num_page: _this.page, post_per_page: 4 };
            _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct/' + _this.id, {
                search: _this.core.objectToURLParams(params)
            }).subscribe(function (products) {
                observable.next(products.json());
                observable.complete();
            });
        });
    };
    DetailPage.prototype.load = function (infiniteScroll) {
        var _this = this;
        this.page++;
        this.getProducts().subscribe(function (products) {
            if (products['modernshop_look_images'].length > 0) {
                _this.detail['modernshop_look_images'] = _this.detail['modernshop_look_images'].concat(products['modernshop_look_images']);
            }
            else
                _this.over = true;
            infiniteScroll.complete();
        });
    };
    DetailPage.prototype.changeSlides = function (event) {
        if (!event.realIndex)
            event.realIndex = 0;
        this.slides = event.realIndex + 1;
    };
    DetailPage.prototype.changeFavorite = function () {
        var _this = this;
        if (this.favorite[Number(this.id)]) {
            delete this.favorite[Number(this.id)];
            this.storage.set('favorite', this.favorite).then(function () {
                _this.Toast.showShortBottom(_this.trans["favorite"]["remove"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            });
        }
        else {
            var data = {
                id: this.id,
                name: this.detail["name"],
                on_sale: this.detail["on_sale"],
                price_html: this.detail["price_html"],
                regular_price: this.detail["regular_price"],
                sale_price: this.detail["sale_price"],
                price: this.detail["price"],
                type: this.detail["type"]
            };
            if (this.detail["modernshop_images"])
                data['images'] = this.detail["modernshop_images"][0].modern_square;
            this.favorite[Number(this.id)] = data;
            this.storage.set('favorite', this.favorite).then(function () {
                _this.Toast.showShortBottom(_this.trans["favorite"]["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            });
        }
    };
    DetailPage.prototype.viewImage = function (src) {
        if (!this.platform.is('cordova'))
            return;
        this.PhotoViewer.show(src);
    };
    DetailPage.prototype.getVariation = function () {
        var _this = this;
        if (this.detail["type"] == "variable" && this.detail["variations"].length > 0) {
            var attr = new __WEBPACK_IMPORTED_MODULE_11__pipes_object_to_array__["a" /* ObjectToArray */]().transform(this.attributes);
            this.core.getVariation(this.detail["variations"], attr).subscribe(function (res) {
                if (res) {
                    _this.variation = res["id"];
                    var _res = Object.assign({}, res);
                    delete _res["id"];
                    delete _res["attributes"];
                    delete _res["type"];
                    _res['wooconnector_crop_images'] = _res['wooconnector_crop_images'].concat(_this.images);
                    _this.detail = Object.assign(_this.detail, _res);
                }
                else {
                    _this.variation = 0;
                    _this.noVariation();
                }
            });
        }
    };
    DetailPage.prototype.share = function () {
        this.SocialSharing.share(null, null, null, this.detail["permalink"]);
    };
    DetailPage.prototype.addToCart = function () {
        var _this = this;
        if (!this.detail['in_stock']) {
            this.Toast.showShortBottom(this.trans["outStock"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            return;
        }
        if (this.detail['type'] == 'external')
            this.external(this.detail['external_url']);
        else if (this.detail['type'] == 'grouped')
            this.grouped();
        else {
            if (this.detail["manage_stock"] && this.quantity > this.detail["stock_quantity"] && !this.detail['backorders_allowed']) {
                this.Toast.showShortBottom(this.trans["out_of_quantity"] + this.detail["stock_quantity"])
                    .subscribe(function (toast) { }, function (error) { console.log(error); });
                return;
            }
            var data_1 = {};
            var idCart_1 = this.id.toString();
            if (this.detail["type"] == "variable") {
                if (this.variation != 0) {
                    data_1.variation_id = this.variation;
                    // idCart += '_' + this.variation;
                }
                else {
                    this.noVariation();
                    return;
                }
            }
            data_1.idCart = idCart_1;
            data_1.id = this.detail["id"];
            data_1.name = this.detail["name"];
            if (this.detail["wooconnector_crop_images"])
                data_1.images = this.detail["wooconnector_crop_images"][0].wooconnector_medium;
            data_1.attributes = this.attributes;
            data_1.regular_price = this.detail["regular_price"];
            data_1.sale_price = this.detail["sale_price"];
            data_1.price = this.detail["price"];
            data_1.quantity = this.quantity;
            data_1.sold_individually = this.detail['sold_individually'];
            this.storage.get('cart').then(function (val) {
                var individually = false;
                if (!val)
                    val = {};
                if (!val[idCart_1])
                    val[idCart_1] = data_1;
                else {
                    if (!_this.detail['sold_individually'])
                        val[idCart_1].quantity += data_1.quantity;
                    else
                        individually = true;
                }
                if (individually) {
                    _this.Toast.showShortBottom(_this.trans['individually']['before'] + _this.detail['name'] + _this.trans['individually']['after']).subscribe(function (toast) { }, function (error) { console.log(error); });
                }
                else
                    _this.storage.set('cart', val).then(function () {
                        _this.buttonCart.update();
                        if (!_this.detail['in_stock'] && _this.detail['backorders'] == 'notify') {
                            _this.Toast.showShortBottom(_this.trans["addOut"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                        }
                        else {
                            _this.Toast.showShortBottom(_this.trans["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                        }
                    });
            });
        }
    };
    DetailPage.prototype.external = function (link) {
        // cordova["InAppBrowser"].open(link, '_system');
        this.InAppBrowser.create(link, "_system");
    };
    DetailPage.prototype.grouped = function () {
        var _this = this;
        if (this.groupedProduct) {
            this.storage.get('cart').then(function (val) {
                if (!val)
                    val = {};
                var alertContent = '';
                _this.groupedProduct.forEach(function (product) {
                    if (product['type'] == 'simple' && product['quantity'] > 0) {
                        if (product['in_stock'] && product['quantity'] > product['stock_quantity'] && !product['backorders_allowed']) {
                            alertContent += product['name'] + ' ' + _this.trans['out_of_quantity'] + product['stock_quantity'] + '<br/>';
                        }
                        else if (!product['in_stock'] && !product['stock_quantity'] && !product['backorders_allowed']) {
                            alertContent += product['name'] + ' ' + _this.trans['out_of_stock'] + '<br/>';
                        }
                        else {
                            if (!val[product['id']]) {
                                var now = {};
                                now['idCart'] = product['id'];
                                now['id'] = product['id'];
                                now['name'] = product['name'];
                                if (product['wooconnector_crop_images'])
                                    now['images'] = product['wooconnector_crop_images'][0]['wooconnector_medium'];
                                now['regular_price'] = product['regular_price'];
                                now['sale_price'] = product['sale_price'];
                                now['price'] = product['price'];
                                now['quantity'] = Number(product['quantity']);
                                now['sold_individually'] = product['sold_individually'];
                                val[product['id']] = now;
                            }
                            else {
                                if (!product['sold_individually'])
                                    val[product['id']]['quantity'] += product['quantity'];
                                else
                                    alertContent += _this.trans['individually']['before'] + product['name'] + _this.trans['individually']['after'] + '<br/>';
                            }
                            product['quantity'] = 1;
                        }
                    }
                });
                _this.storage.set('cart', val).then(function () {
                    _this.buttonCart.update();
                    if (alertContent != '') {
                        var alert_1 = _this.alertCtrl.create({
                            cssClass: 'alert-no-title',
                            message: alertContent,
                            buttons: [_this.trans['grouped']['button']]
                        });
                        alert_1.present();
                    }
                    else {
                        _this.Toast.showShortBottom(_this.trans["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    }
                });
            });
        }
    };
    DetailPage.prototype.noVariation = function () {
        this.Toast.showShortBottom(this.trans["have_not_variation"]).subscribe(function (toast) { }, function (error) { console.log(error); });
    };
    DetailPage.prototype.doRefresh = function (refresher) {
        this.detail = {};
        this.faded = false;
        this.getData();
        refresher.complete();
    };
    DetailPage.prototype.popToRoot = function () {
        this.navCtrl.popToRoot();
    };
    DetailPage.prototype.onSwipe = function (e) {
        var _this = this;
        if (e['deltaX'] < -150 || e['deltaX'] > 150) {
            if (e['deltaX'] > 0 && this.detail['wooconnector_previous_product']) {
                this.navCtrl.push(this.DetailPage, { id: this.detail['wooconnector_previous_product'] }).then(function () {
                    _this.navCtrl.remove(_this.navCtrl.getActive().index - 1);
                });
            }
            else if (e['deltaX'] < 0 && this.detail['wooconnector_next_product']) {
                this.navCtrl.push(this.DetailPage, { id: this.detail['wooconnector_next_product'] }).then(function () {
                    _this.navCtrl.remove(_this.navCtrl.getActive().index - 1);
                });
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cart'),
        __metadata("design:type", Object)
    ], DetailPage.prototype, "buttonCart", void 0);
    DetailPage = DetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\detail\detail.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'detail.title\'|translate}}</ion-title>\n		<ion-buttons end>\n			<button-cart #cart icon="icon-bag"></button-cart>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content secondary-bg>\n	<!-- Refresh -->\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content [pullingIcon]="\'general.pullingIcon\'|translate" [pullingText]="\'general.pullToRefresh\'|translate"\n		 [refreshingSpinner]="\'general.refreshingSpinner\'|translate" [refreshingText]="\'general.refreshing\'|translate">\n		</ion-refresher-content>\n	</ion-refresher>\n	<!-- Slides -->\n	<div relative class="product-slides faded-content" padding-4 light-bg  [ngClass]="{\'faded-has-content\':faded}">\n		<ion-slides *ngIf="detail.wooconnector_crop_images" (ionSlideDidChange)="changeSlides($event)" pager="true" dir="{{display}}">\n			<ion-slide *ngFor="let image of detail.wooconnector_crop_images">\n				<img float-left *ngIf="image.wooconnector_large" [src]="image.wooconnector_large" (click)="viewImage(image.wooconnector_large)"\n				/>\n				<img float-left *ngIf="!image.wooconnector_large" src="assets/images/no-image.png" />\n			</ion-slide>\n		</ion-slides>\n		<div absolute class="product-status" *ngIf="detail.in_stock">\n			<img float-left *ngIf="detail.on_sale" src="assets/images/instock.png" />\n		</div>\n		<div absolute class="product-status" *ngIf="!detail.in_stock">\n			<img float-left *ngIf="detail.on_sale" src="assets/images/outstock.png" />\n		</div>\n		<button ion-button absolute *ngIf="detail.name" (click)="changeFavorite()"\n		 class="product-favorite disable-hover" light-bg>\n			<ion-icon [color]="favorite[id] ?\'primary\':\'gray\'" icon-big name="md-heart"></ion-icon>\n		</button>\n		<div absolute bottom primary-bg product-sale *ngIf="detail.sale_price">\n			<span light>{{(detail.sale_price/detail.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n		</div>\n		<div absolute text-center padding-4 width-100 class="slides-info" *ngIf="detail.wooconnector_crop_images" dir="ltr">\n			<span light padding-4>{{slides}} of {{detail.wooconnector_crop_images.length}}</span>\n		</div>\n	</div>\n	<!-- Button Home -->\n	<button ion-button ion-fixed bottom margin color="light" class="button-home" (click)="popToRoot()">\n		<ion-icon name="icon-home-2" primary></ion-icon>\n	</button>\n	<!-- Body -->\n	<div width-100 text-center padding *ngIf="!loaddata"><ion-spinner name="ios" ></ion-spinner></div>\n	<div *ngIf="detail.name" (swipe)="onSwipe($event)" class="faded-content" [ngClass]="{\'faded-has-content\':faded}">\n		<!-- Info -->\n		<div padding light-bg>\n			<h3 *ngIf="detail.type!=\'grouped\' && detail.price" no-margin>\n				<span margin-right *ngIf="detail.sale_price" font-80>\n					<span text-through>{{detail.regular_price*1|price}}</span>\n				</span>\n				<b dark font-110>{{detail.price*1||0|price}}</b>\n			</h3>\n			<h3 *ngIf="detail.type==\'grouped\'" no-margin dark>\n				<b font-80 [innerHTML]="detail.price_html"></b>\n			</h3>\n			<span font-110 dark [innerHTML]="detail.name"></span>\n			<ion-row center class="product-rate" [navPush]="CommentsPage" [navParams]="{id:detail.id,data:detail.wooconnector_reviews,allow:reviews_allowed}">\n				<div class="rate">\n					<div class="rating" [style.width]="rating*20+\'%\'"></div>\n				</div>\n				<span margin-left no-wrap>{{ratingCount}} {{\'detail.rating\'|translate}} & {{reviewCount.length}} {{\'detail.review\'|translate}}</span>\n				<ion-icon margin-left name="ios-arrow-forward"></ion-icon>\n			</ion-row>\n		</div>\n		<!-- Attributes -->\n		<div padding margin-top light-bg *ngIf="detail.type!=\'grouped\' && detail.type!=\'external\'">\n			<div *ngIf="detail.type==\'variable\'">\n				<div *ngFor="let attr of detail.attributes | filter:{variation:true}">\n					<!-- Color -->\n					<div *ngIf="(attr.name|uppercase)==\'COLOR\'" class="attribute-color">\n						<div text-uppercase><b dark>{{attr.name}}</b></div>\n						<ion-list mode="md" overflow radio-group [(ngModel)]="attributes[attr.name].option" (ngModelChange)="getVariation()">\n							<ion-item float-left margin-right *ngFor="let option of attr.options" no-padding>\n								<ion-radio [value]="(option|lowercase)" [style.background]="option"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n					<!-- Size or Orther -->\n					<div *ngIf="(attr.name|uppercase)!=\'COLOR\'" [ngClass]="(attr.name|uppercase)==\'SIZE\' ? \'attribute-size\':\'attribute-default\'">\n						<div text-uppercase><b dark>{{attr.name}}</b></div>\n						<ion-list mode="md" overflow radio-group [(ngModel)]="attributes[attr.name].option" (ngModelChange)="getVariation()">\n							<ion-item float-left *ngFor="let option of attr.options" no-padding>\n								<ion-label [attr.text-center]="(attr.name|uppercase)==\'SIZE\'?true:null">{{option}}</ion-label>\n								<ion-radio [value]="(option|lowercase)"></ion-radio>\n							</ion-item>\n						</ion-list>\n					</div>\n				</div>\n			</div>\n			<!-- Quantum & Price-->\n			<div text-uppercase dark no-wrap class="quantity-title">\n				<b>{{\'detail.quantity\'|translate}}</b>\n				<b float-right>{{\'detail.price\'|translate}}</b>\n			</div>\n			<ion-row dark class="quantity-price" wrap>\n				<ion-col no-padding *ngIf="!detail.sold_individually">\n					<button-quantity float-left [(ngModel)]="quantity" [max]="(detail.manage_stock && !detail.backorders_allowed)?detail.stock_quantity:false"></button-quantity>\n				</ion-col>\n				<ion-col no-padding *ngIf="detail.sold_individually">\n					<h3 no-margin><b>1</b></h3>\n				</ion-col>\n				<ion-col no-padding text-right>\n					<h3 no-margin><b>{{detail.price*quantity||0|price}}</b></h3>\n				</ion-col>\n			</ion-row>\n		</div>\n		<!-- Grouped -->\n		<div padding-horizontal border-bottom light-bg *ngIf="detail.type==\'grouped\'">\n			<ion-row *ngFor="let product of groupedProduct; let i = index" class="item-product-grouped">\n				<ion-col no-padding [navPush]="DetailPage" [navParams]="{id:product.id}">\n					<div dark><b [innerHTML]="product.name"></b></div>\n					<span *ngIf="product.sale_price" font-80>\n					<span text-through>{{product.regular_price*1|price}}</span>\n					</span>\n					<b dark>{{product.price*1||0|price}}</b>\n					<ion-badge font-80 *ngIf="product.sale_price">{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</ion-badge>\n					<span *ngIf="!detail.in_stock" font-80>\n					{{\'detail.outStock\'|translate}}\n				</span>\n				</ion-col>\n				<ion-col *ngIf="product.type==\'variable\' || product.type==\'external\'" width-33 no-padding>\n					<button ion-button clear no-margin [navPush]="DetailPage" [navParams]="{id:product.id}" class="disable-hover">\n					<span *ngIf="product.type==\'variable\'">{{\'detail.grouped.variable\'|translate}}</span>\n					<span *ngIf="product.type==\'external\'" text-underline>{{product.button_text}}</span>\n				</button>\n				</ion-col>\n				<ion-col *ngIf="product.type==\'simple\' && detail.in_stock" width-33 no-padding>\n					<ion-item mode="md" *ngIf="product.sold_individually">\n						<ion-checkbox mode="md" [(ngModel)]="groupedProduct[i].quantity" value="1"></ion-checkbox>\n					</ion-item>\n					<button-quantity *ngIf="!product.sold_individually" float-left [(ngModel)]="groupedProduct[i].quantity" min="0" [max]="(product.manage_stock && !product.backorders_allowed)?product.stock_quantity:null"></button-quantity>\n				</ion-col>\n			</ion-row>\n		</div>\n		<!-- About This Item -->\n		<div padding margin-top light-bg border-bottom class="about-this-item" *ngIf="detail.type!=\'grouped\' && (detail.sku || detail.manage_stock || 0< detail.attributes.length)">\n			<div margin-bottom><h6 no-margin dark>{{\'detail.about_this_item\'|translate}}</h6></div>\n			<ion-row *ngIf="detail.sku">\n				<ion-col><b>{{\'detail.sku\'|translate}}</b></ion-col>\n				<ion-col>{{detail.sku}}</ion-col>\n			</ion-row>\n			<ion-row *ngIf="detail.dimensions && detail.dimensions.height">\n				<ion-col><b>{{\'detail.height\'|translate}}</b></ion-col>\n				<ion-col>{{detail.dimensions.height}}</ion-col>\n			</ion-row>\n			<ion-row *ngIf="detail.dimensions && detail.dimensions.length">\n				<ion-col><b>{{\'detail.length\'|translate}}</b></ion-col>\n				<ion-col>{{detail.dimensions.length}}</ion-col>\n			</ion-row>\n			<ion-row *ngIf="detail.dimensions && detail.dimensions.width">\n				<ion-col><b>{{\'detail.width\'|translate}}</b></ion-col>\n				<ion-col>{{detail.dimensions.width}}</ion-col>\n			</ion-row>\n			<ion-row *ngIf="detail.manage_stock">\n				<ion-col><b>{{\'detail.quantity\'|translate}}</b></ion-col>\n				<ion-col>{{detail.stock_quantity||0}} {{\'detail.available\'|translate}}</ion-col>\n			</ion-row>\n			<ion-row *ngFor="let attribute of detail.attributes">\n				<ion-col text-capitalize><b>{{attribute.name}}</b></ion-col>\n				<ion-col>{{attribute.options|ArrayJoin}}</ion-col>\n			</ion-row>\n		</div>\n		<!-- Item Description -->\n		<div padding-horizontal light-bg class="detail-description" *ngIf="description">\n			<div padding-top><h6 no-margin dark>{{\'detail.item_description\'|translate}}</h6></div>\n			<div *ngIf="!viewMore" [innerHtml]="description|viewmore" class="description-content"></div>\n			<div *ngIf="viewMore" [innerHtml]="description" class="description-content disable-hover"></div>\n			<button ion-button clear (click)="viewMore=!viewMore" font-80 no-padding no-margin>\n			<div *ngIf="!viewMore">{{\'detail.view_more\'|translate}}</div>\n			<div *ngIf="viewMore">{{\'detail.view_less\'|translate}}</div>\n		</button>\n		</div>\n		<!-- Buyer Protection -->\n		<div margin-top class="buyer-protection">\n			<div class="buyer-icon">\n				<ion-icon name="icon-safe" success></ion-icon>\n			</div>\n			<div class="buyer-content" padding>\n				<div><b dark [innerHTML]="\'modern_buyer_product_title\'|static"></b></div>\n				<div [innerHTML]="\'modern_description_buyer_product\'|static"></div>\n			</div>\n		</div>\n		<!-- Buy The Look -->\n		<div margin-top light-bg *ngIf="detail.modernshop_look_images && 0<detail.modernshop_look_images.length">\n			<div padding-horizontal padding-top><h6 no-margin dark>{{\'detail.buy_the_look\'|translate}}</h6></div>\n			<ion-row padding-8 wrap>\n				<ion-col padding-8 width-50 *ngFor="let product of detail.modernshop_look_images" [navPush]="DetailPage" [navParams]="{id:product.id}">\n					<div relative overflow>\n						<img float-left *ngIf="product.images && product.images.modern_square" [src]="product.images.modern_square" />\n						<img float-left *ngIf="!product.images || !product.images.modern_square" src="assets/images/no-image.png" />\n						<div absolute bottom primary-bg product-sale *ngIf="product.sale_price">\n							<span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n						</div>\n					</div>\n					<p float-left width-100>\n						<span *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'">\n						<!-- <b dark font-120>{{product.price*1||0|price}}</b>\n						<span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n						<span dark class="simple-price" [innerHTML]="product.price_html"></span>\n						</span>\n						<span *ngIf="product.type==\'variable\' || product.type==\'grouped\'">\n						<b dark font-120 [innerHTML]="product.price_html"></b>\n					</span>\n					</p>\n					<span float-left width-100 [innerHTML]="product.name"></span>\n				</ion-col>\n			</ion-row>\n		</div>\n	</div>\n	<ion-infinite-scroll (ionInfinite)="load($event)" *ngIf="!over" threshold="1%" position="bottom">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n</ion-content>\n<ion-footer class="detail-footer">\n	<ion-toolbar no-padding-hard>\n		<ion-row *ngIf="detail.name">\n			<ion-col border-right no-padding>\n				<button ion-button full clear color="dark" (click)="share()" class="disable-hover">\n				<ion-icon icon-big name="icon-share"></ion-icon>\n			</button>\n			</ion-col>\n			<ion-col no-padding>\n				<button ion-button full clear class="disable-hover" color="dark" [navPush]="CommentsPage" [navParams]="{id:detail.id,data:detail.wooconnector_reviews,allow:reviews_allowed}">\n				<ion-icon icon-big name="icon-chat"></ion-icon>\n				<ion-badge absolute>{{detail.rating_count}}</ion-badge>\n			</button>\n			</ion-col>\n			<ion-col width-50 primary-bg text-center no-padding>\n				<button ion-button full clear class="disable-hover" [disabled]="!(detail.price*1) && detail.price.html == \'\'" color="light" (click)="addToCart()">\n					<h5 no-margin *ngIf="detail.type!=\'external\'">{{\'detail.addToCart\'|translate}}</h5>\n					<span *ngIf="detail.type==\'external\'" no-wrap-ellipsis>\n						<ion-icon name="icon-link"></ion-icon>\n						<span>{{detail.button_text}}</span>\n					</span>\n				</button>\n			</ion-col>\n		</ion-row>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\detail\detail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_11__pipes_object_to_array__["a" /* ObjectToArray */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__["a" /* PhotoViewer */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], DetailPage);
    return DetailPage;
    var DetailPage_1;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AboutFooterComponent = /** @class */ (function () {
    function AboutFooterComponent(navCtrl, InAppBrowser, config, http) {
        this.navCtrl = navCtrl;
        this.InAppBrowser = InAppBrowser;
        this.data = {};
        if (config['text_static']) {
            this.data['facebook'] = config['text_static']['modern_link_facebook'];
            this.data['google'] = config['text_static']['modern_link_google'];
            this.data['twitter'] = config['text_static']['modern_link_twitter'];
        }
    }
    AboutFooterComponent.prototype.openLink = function (url, external) {
        if (external === void 0) { external = false; }
        console.log(url);
        if (!url)
            return;
        else
            this.InAppBrowser.create(url, open_target_blank ? "_blank" : "_system", "location=no");
    };
    AboutFooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'about-footer',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\components\about-footer\about-footer.html"*/'<div padding light text-center class="footer">\n	<h5 text-uppercase margin-top>{{\'modern_footer_details_title\'|static}}</h5>\n	<p>{{\'modern_footer_address\'|static}}</p>\n	<a href="tel:{{\'modern_footer_phone\'|static}}">{{\'modern_footer_phone\'|static}}</a>\n	<p>{{\'modern_footer_email_domain\'|static}}</p>\n	<div padding-8 >\n		<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLink(data.twitter, true)"><ion-icon name="icon-twitter"></ion-icon></button>\n		<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLink(data.facebook, true)" ><ion-icon name="icon-facebook"></ion-icon></button>\n		<button ion-button icon-only clear color="light" class="disable-hover" (click)="openLink(data.google, true)"><ion-icon name="logo-instagram"></ion-icon></button>\n	</div>\n	<p>{{\'general.copyright\'|translate}}</p>\n</div>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\components\about-footer\about-footer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_3__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
    ], AboutFooterComponent);
    return AboutFooterComponent;
}());

//# sourceMappingURL=about-footer.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonCartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_cart_cart__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom


var ButtonCartComponent = /** @class */ (function () {
    function ButtonCartComponent(storage, navCtrl, config) {
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.CartPage = __WEBPACK_IMPORTED_MODULE_3__pages_cart_cart__["a" /* CartPage */];
        this.configCurency = {};
        this.cart = {};
        console.log(config);
        // configCurency = config;
        this.update();
    }
    ButtonCartComponent.prototype.update = function () {
        var _this = this;
        this.storage.get('cart').then(function (val) {
            _this.cart = { count: 0, total: 0 };
            for (var key in val) {
                var product = val[key];
                _this.cart["count"] += product.quantity;
                if (Number(product.sale_price) > 0) {
                    _this.cart["total"] += Number(product.sale_price) * product.quantity;
                }
                else {
                    _this.cart["total"] += Number(product.regular_price) * product.quantity;
                }
            }
        });
    };
    ButtonCartComponent.prototype.gotoCart = function () {
        if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().component == this.CartPage)
            this.navCtrl.pop();
        else
            this.navCtrl.push(this.CartPage);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ButtonCartComponent.prototype, "icon", void 0);
    ButtonCartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'button-cart',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\components\button-cart\button-cart.html"*/' <button ion-button color="dark" icon-only clear (click)="gotoCart()" class="disable-hover">\n	<div>\n		<ion-badge item-right absolute>{{cart.count}}</ion-badge>\n		<ion-icon name="{{icon}}"></ion-icon>\n	</div>\n	<div text-left float-right class="info-cart">\n		<div>{{\'cart.totals\' | translate}}:</div>\n		<span primary>{{cart.total|price}}</span>\n	</div>\n</button>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\components\button-cart\button-cart.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_config_service__["a" /* Config */]])
    ], ButtonCartComponent);
    return ButtonCartComponent;
}());

//# sourceMappingURL=button-cart.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterTabsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_categories_categories__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_search_search__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_account_account__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Custom




var FooterTabsComponent = /** @class */ (function () {
    function FooterTabsComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.HomePage = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.CategoriesPage = __WEBPACK_IMPORTED_MODULE_3__pages_categories_categories__["a" /* CategoriesPage */];
        this.SearchPage = __WEBPACK_IMPORTED_MODULE_4__pages_search_search__["a" /* SearchPage */];
        this.AccountPage = __WEBPACK_IMPORTED_MODULE_5__pages_account_account__["a" /* AccountPage */];
    }
    FooterTabsComponent.prototype.ngOnInit = function () {
        this.active = this.navCtrl.getActive().component;
    };
    FooterTabsComponent.prototype.goto = function (page) {
        if (this.active && page && this.active != page) {
            if (!page)
                this.navCtrl.popToRoot();
            else {
                var previous = this.navCtrl.getPrevious();
                if (previous && previous.component == page)
                    this.navCtrl.pop();
                else
                    this.navCtrl.push(page);
            }
        }
    };
    FooterTabsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'footer-tabs',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\components\footer-tabs\footer-tabs.html"*/'<ion-row>\n	<ion-col text-center tappable (click)="goto(HomePage)" [ngClass]="{\'selected\':active==HomePage}">\n		<ion-icon name="icon-home"></ion-icon>\n		<div class="tab-name">{{\'tabs.home\'|translate}}</div>\n	</ion-col>\n	<ion-col text-center tappable (click)="goto(CategoriesPage)" [ngClass]="{\'selected\':active==CategoriesPage}">\n		<ion-icon name="icon-grid-out"></ion-icon>\n		<div class="tab-name">{{\'tabs.categories\'|translate}}</div>\n	</ion-col>\n	<ion-col text-center tappable (click)="goto(SearchPage)" [ngClass]="{\'selected\':active==SearchPage}">\n		<ion-icon name="icon-search"></ion-icon>\n		<div class="tab-name">{{\'tabs.search\'|translate}}</div>\n	</ion-col>\n	<ion-col text-center tappable (click)="goto(AccountPage)" [ngClass]="{\'selected\':active==AccountPage}">\n		<ion-icon name="icon-account"></ion-icon>\n		<div class="tab-name">{{\'tabs.account\'|translate}}</div>\n	</ion-col>\n</ion-row>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\components\footer-tabs\footer-tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], FooterTabsComponent);
    return FooterTabsComponent;
}());

//# sourceMappingURL=footer-tabs.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonQuantityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* forwardRef */])(function () { return ButtonQuantityComponent; }),
    multi: true
};
var ButtonQuantityComponent = /** @class */ (function () {
    function ButtonQuantityComponent() {
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.innerValue = 1;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    ButtonQuantityComponent.prototype.ngOnInit = function () {
        if (this.min)
            this.min = Number(this.min);
        else
            this.min = 1;
        if (this.max)
            this.max = Number(this.max);
        else
            this.max = 2147483647;
    };
    Object.defineProperty(ButtonQuantityComponent.prototype, "value", {
        get: function () {
            return Number(this.innerValue);
        },
        set: function (v) {
            if (v == null)
                return;
            if (v < this.min)
                v = this.min;
            if (v > this.max)
                v = this.max;
            if (Number.isInteger(Number(v)) && v !== this.innerValue) {
                this.innerValue = Number(v);
                this.onChangeCallback(Number(v));
                this.inputBlur();
            }
            else if (v)
                this.inputBlur();
        },
        enumerable: true,
        configurable: true
    });
    ;
    ButtonQuantityComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    ButtonQuantityComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = Number(value);
        }
    };
    ButtonQuantityComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    ButtonQuantityComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    ButtonQuantityComponent.prototype.minus = function () {
        if (this.innerValue > this.min)
            this.value = Number(this.innerValue) - 1;
        this.update.emit(Number(this.value));
    };
    ButtonQuantityComponent.prototype.plus = function () {
        if (this.innerValue < this.max)
            this.value = Number(this.innerValue) + 1;
        this.update.emit(Number(this.value));
    };
    ButtonQuantityComponent.prototype.inputBlur = function (update) {
        if (update === void 0) { update = false; }
        this.input['nativeElement'].value = Number(this.value);
        if (update)
            this.update.emit(Number(this.value));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('input'),
        __metadata("design:type", Object)
    ], ButtonQuantityComponent.prototype, "input", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ButtonQuantityComponent.prototype, "min", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ButtonQuantityComponent.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], ButtonQuantityComponent.prototype, "update", void 0);
    ButtonQuantityComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'button-quantity',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\components\button-quantity\button-quantity.html"*/'<ion-row class="button-quantity-inner" wrap center>\n	<button no-margin ion-button clear [disabled]="innerValue<=min" (click)="minus()" class="disable-hover">-</button>\n	<input text-center class="value" #input no-margin [(ngModel)]="value" type="number" (blur)="inputBlur(true)" />\n	<button no-margin ion-button clear (click)="plus()" [disabled]="max<=innerValue" class="disable-hover">+</button>\n</ion-row>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\components\button-quantity\button-quantity.html"*/,
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], ButtonQuantityComponent);
    return ButtonQuantityComponent;
}());

//# sourceMappingURL=button-quantity.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HideShowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HideShowComponent = /** @class */ (function () {
    function HideShowComponent() {
        this.show = false;
    }
    HideShowComponent.prototype.change = function () {
        this.show = !this.show;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], HideShowComponent.prototype, "color", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], HideShowComponent.prototype, "show", void 0);
    HideShowComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'hide-show',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\components\hide-show\hide-show.html"*/'<button ion-button full no-margin (click)="change()" [color]="color" class="button-change">\n\n	<ng-content select="[this-title]"></ng-content>\n\n	<ion-icon [name]="show ? \'ios-arrow-up\' : \'ios-arrow-down\'"></ion-icon>\n\n</button>\n\n<div [hidden]="!show" padding-horizontal class="hide-show-content">\n\n	<ng-content select="[this-content]"></ng-content>\n\n</div>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\components\hide-show\hide-show.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HideShowComponent);
    return HideShowComponent;
}());

//# sourceMappingURL=hide-show.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Filter = /** @class */ (function () {
    function Filter() {
    }
    Filter.prototype.transform = function (items, args) {
        if (args) {
            for (var key in args) {
                if (args.hasOwnProperty(key)) {
                    items = items.filter(function (item) { return item[key] == args[key]; });
                }
            }
        }
        return items;
    };
    Filter = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'filter'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Filter);
    return Filter;
}());

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayJoin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ArrayJoin = /** @class */ (function () {
    function ArrayJoin() {
    }
    ArrayJoin.prototype.transform = function (value, args) {
        if (args === void 0) { args = ', '; }
        if (value)
            return value.join(args);
    };
    ArrayJoin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'ArrayJoin'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], ArrayJoin);
    return ArrayJoin;
}());

//# sourceMappingURL=array-join.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderBy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OrderBy = /** @class */ (function () {
    function OrderBy() {
    }
    OrderBy_1 = OrderBy;
    OrderBy._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            if (a && b && a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a && b && a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0;
    };
    OrderBy.prototype.transform = function (input, config) {
        if (config === void 0) { config = ['+']; }
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderBy_1._orderByComparator(a[property], b[property])
                        : -OrderBy_1._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderBy_1._orderByComparator(a[property], b[property])
                        : -OrderBy_1._orderByComparator(a[property], b[property]);
                    if (comparison != 0)
                        return comparison;
                }
                return 0;
            });
        }
    };
    OrderBy = OrderBy_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'orderBy'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], OrderBy);
    return OrderBy;
    var OrderBy_1;
}());

//# sourceMappingURL=order-by.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Range; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Range = /** @class */ (function () {
    function Range() {
    }
    Range.prototype.transform = function (items, args) {
        if (args && args.length == 2) {
            //items = items.filter(item => item[key] == args[key]);
        }
        return items;
    };
    Range = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'range'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Range);
    return Range;
}());

//# sourceMappingURL=range.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Price; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_config_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Price = /** @class */ (function () {
    function Price(config) {
        this.config = config;
        this.currency = config['currency'];
    }
    Price.prototype.transform = function (value) {
        var _value = Number(value);
        if (!_value)
            _value = 0;
        if (this.currency) {
            if (_value && _value.toString().split('.').length == 2) {
                var decimal = _value.toString().split('.');
                if (decimal[1].charAt(this.currency['number_of_decimals']) == 5) {
                    decimal[1] = Number(decimal[1].substring(0, this.currency['number_of_decimals'])) + 1;
                    _value = Number(decimal.join('.'));
                }
            }
            _value = _value.toFixed(this.currency['number_of_decimals']);
            _value = _value.split('.');
            _value.splice(1, 0, this.currency['decimal_separator']);
            _value[0] = _value[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.currency['thousand_separator']);
            var symbol = document.createElement('textarea');
            symbol.innerHTML = this.currency['currency_symbol'];
            switch (this.currency['currency_position']) {
                case 'left':
                    _value.unshift(symbol.value);
                    break;
                case 'left_space':
                    _value.unshift(symbol.value + ' ');
                    break;
                case 'right':
                    _value.push(symbol.value);
                    break;
                case 'right_space':
                    _value.push(' ' + symbol.value);
                    break;
            }
            _value = _value.join('');
        }
        return _value;
    };
    Price = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'price'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_config_service__["a" /* Config */]])
    ], Price);
    return Price;
}());

//# sourceMappingURL=price.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeAgo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimeAgo = /** @class */ (function () {
    function TimeAgo(translate, datePipe) {
        var _this = this;
        this.datePipe = datePipe;
        translate.get('general.timeAgo').subscribe(function (trans) { return _this.trans = trans; });
    }
    TimeAgo.prototype.transform = function (value) {
        var _value;
        var ago = (new Date().getTime() - new Date(value).getTime()) / 1000;
        if (ago < 0)
            _value = this.datePipe.transform(value, date_format);
        else if (ago < 3600) {
            _value = Math.floor(ago / 60);
            if (_value < 2)
                _value += this.trans['minute'];
            else
                _value += this.trans['minutes'];
        }
        else if (ago < 86400) {
            _value = Math.floor(ago / 3600);
            if (_value < 2)
                _value += this.trans['hour'];
            else
                _value += this.trans['hours'];
        }
        else if (ago < 2592000) {
            _value = Math.floor(ago / 86400);
            if (_value < 2)
                _value += this.trans['day'];
            else
                _value += this.trans['days'];
        }
        else
            _value = this.datePipe.transform(value, date_format);
        return _value;
    };
    TimeAgo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'timeAgo'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__module_ng2_translate__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */]])
    ], TimeAgo);
    return TimeAgo;
}());

//# sourceMappingURL=time-ago.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Viewmore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Viewmore = /** @class */ (function () {
    function Viewmore() {
    }
    Viewmore.prototype.transform = function (text, limit) {
        if (!limit)
            limit = 150;
        if (text.length <= limit)
            return text;
        text = text ? String(text).replace(/<[^>]+>/gm, '') : '';
        text = text.replace(/(\r\n|\n|\r)/gm, "");
        text = text.split(" ");
        var newText = [];
        for (var i = 0; i < 15; i++) {
            if (text[i])
                newText.push(text[i]);
        }
        text = newText.join(" ");
        if (text.length > limit)
            text = text.substring(0, limit);
        return text + '...';
    };
    Viewmore = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'viewmore'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Viewmore);
    return Viewmore;
}());

//# sourceMappingURL=viewmore.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__signup_signup__ = __webpack_require__(237);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom





//Page

var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, http, core, storage, navCtrl, alertCtrl, translate, Toast, keyboard) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.http = http;
        this.core = core;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.Toast = Toast;
        this.keyboard = keyboard;
        this.wordpress_user = wordpress_url + '/wp-json/mobiconnector/user';
        this.SignupPage = __WEBPACK_IMPORTED_MODULE_9__signup_signup__["a" /* SignupPage */];
        this.trans = {};
        this.formLogin = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
        translate.get('login').subscribe(function (trans) { if (trans)
            _this.trans = trans; });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.core.showLoading();
        this.http.post(wordpress_url + '/wp-json/mobiconnector/jwt/token', this.formLogin.value)
            .subscribe(function (res) {
            var login = res.json();
            login.username = _this.formLogin.value.username;
            var params = _this.core.objectToURLParams({ 'username': login["username"] });
            _this.http.post(_this.wordpress_user + '/get_info', params).subscribe(function (user) {
                _this.core.hideLoading();
                _this.storage.set('user', user.json()).then(function () {
                    _this.storage.set('login', login).then(function () { return _this.navCtrl.pop(); });
                });
            }, function (err) {
                _this.core.hideLoading();
                _this.formLogin.patchValue({ password: null });
                _this.wrong = true;
            });
        }, function (err) {
            _this.core.hideLoading();
            _this.formLogin.patchValue({ password: null });
            _this.wrong = true;
        });
    };
    LoginPage.prototype.forgot = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: this.trans["forgot_title"],
            message: this.trans["forgot_body"],
            cssClass: 'alert-forgot',
            inputs: [
                {
                    name: 'username',
                    placeholder: this.trans["forgot_placeholder"]
                }
            ],
            buttons: [
                {
                    text: '',
                    cssClass: 'button-cancel'
                },
                {
                    text: this.trans["forgot_send"],
                    cssClass: 'button-confirm',
                    handler: function (data) {
                        if (data.username) {
                            _this.core.showLoading();
                            _this.http.post(wordpress_url + '/wp-json/mobiconnector/user/forgot_password', _this.core.objectToURLParams({ username: data.username })).subscribe(function (res) {
                                _this.core.hideLoading();
                                _this.Toast.showShortBottom(_this.trans["forgot_success"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                            }, function (err) {
                                _this.core.hideLoading();
                                _this.Toast.showShortBottom(err.json()["message"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                            });
                        }
                        else {
                            _this.Toast.showShortBottom(_this.trans["forgot_err"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\login\login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'login.title\'|translate}}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-row ion-fixed center ion-fixed width-100 height-100 padding>\n<ion-col padding>\n	<ion-list class="login-form" no-margin>\n		<form [formGroup]="formLogin">\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating><span light>{{\'general.username\'|translate}}</span></ion-label>\n				<ion-input dir="{{display_mode}}" light formControlName="username"></ion-input>\n			</ion-item>\n			<ion-item mode="md" bg-transparent no-padding>\n				<ion-label floating [attr.font-80]="wrong?true:null" [ngClass]="wrong?\'wrong-password\':\'\'">\n					<span light *ngIf="!wrong">{{\'general.password\'|translate}}</span>\n					<span danger *ngIf="wrong">{{\'login.wrong\'|translate}}</span>\n				</ion-label>\n				<ion-input dir="{{display_mode}}" light type="password" formControlName="password" (focus)="wrong=false"></ion-input>\n				<ion-icon *ngIf="wrong" color="danger" item-right name="icon-info-circle"></ion-icon>\n			</ion-item>\n		</form>\n	</ion-list>\n	<div overflow margin-bottom>\n		<button ion-button float-right clear class="disable-hover" color="secondary" (click)="forgot()">\n			<span>{{\'login.forgot_password\'|translate}}</span>\n		</button>\n	</div>\n	<button ion-button block text-uppercase (click)="login()" [disabled]="formLogin.invalid">\n		<span>{{\'login.title\'|translate}}</span>\n	</button>\n	<div light margin-top text-center>\n		<span>{{\'login.signupText\'|translate}}</span>\n		<span [navPush]="SignupPage">{{\'login.signup\'|translate}}</span>\n	</div>\n</ion-col>\n</ion-row>\n</ion-content>\n '/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectToArray; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ObjectToArray = /** @class */ (function () {
    function ObjectToArray() {
    }
    ObjectToArray.prototype.transform = function (object, args) {
        if (args === void 0) { args = null; }
        var array = [];
        if (object) {
            Object.keys(object).forEach(function (key) {
                if (args)
                    array.push(key);
                else
                    array.push(object[key]);
            });
        }
        return array;
    };
    ObjectToArray = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'ObjectToArray'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], ObjectToArray);
    return ObjectToArray;
}());

//# sourceMappingURL=object-to-array.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageMulti; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Custom

var StorageMulti = /** @class */ (function () {
    function StorageMulti(storage) {
        this.storage = storage;
    }
    StorageMulti.prototype.get = function (keys) {
        var _this = this;
        var promises = [];
        keys.forEach(function (key) { return promises.push(_this.storage.get(key)); });
        return Promise.all(promises).then(function (values) {
            var result = {};
            values.map(function (value, index) {
                result[keys[index]] = value;
            });
            return result;
        });
    };
    StorageMulti.prototype.remove = function (keys) {
        var _this = this;
        var promises = [];
        keys.forEach(function (key) { return promises.push(_this.storage.remove(key)); });
        return Promise.all(promises);
    };
    StorageMulti = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], StorageMulti);
    return StorageMulti;
}());

//# sourceMappingURL=storage-multi.service.js.map

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreValidator; });
var CoreValidator = /** @class */ (function () {
    function CoreValidator() {
    }
    CoreValidator.isEmail = function (control) {
        var regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regExp.test(control.value)) {
            return { "invalidEmail": true };
        }
        return null;
    };
    CoreValidator.isPhone = function (control) {
        var regExp = /^[0-9\-\+]{9,15}$/;
        if (!regExp.test(control.value)) {
            return { "invalidMobile": true };
        }
        return null;
    };
    CoreValidator.confirmPassword = function (control) {
        var e = control.root.value["password"];
        if (e && control.value != e) {
            return { "invalidEqual": true };
        }
        return null;
    };
    return CoreValidator;
}());

//# sourceMappingURL=core.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_category_detail_category__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Custom

// Page


var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(http, core, navCtrl) {
        var _this = this;
        this.http = http;
        this.core = core;
        this.navCtrl = navCtrl;
        this.DetailCategoryPage = __WEBPACK_IMPORTED_MODULE_4__detail_category_detail_category__["a" /* DetailCategoryPage */];
        this.SearchPage = __WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */];
        this.parents = [];
        this.noResuilt = false;
        this.faded = false;
        this.loaddata = false;
        var params = { cat_num_page: 1, cat_per_page: 100, parent: '0' };
        var loadCategories = function () {
            http.get(wordpress_url + '/wp-json/wooconnector/product/getcategories', {
                search: core.objectToURLParams(params)
            }).subscribe(function (res) {
                _this.loaddata = true;
                _this.parents = _this.parents.concat(res.json());
                setTimeout(function () {
                    _this.faded = true;
                }, 100);
                if (res.json() && res.json().length == 100) {
                    _this.noResuilt = false;
                    params.cat_num_page++;
                    loadCategories();
                }
                else {
                    _this.loaddata = true;
                    _this.noResuilt = true;
                }
            });
        };
        loadCategories();
    }
    CategoriesPage.prototype.ionViewDidEnter = function () {
        this.buttonCart.update();
    };
    CategoriesPage.prototype.onSwipeContent = function (e) {
        if (e['deltaX'] < -150 || e['deltaX'] > 150) {
            if (e['deltaX'] < 0)
                this.navCtrl.push(this.SearchPage);
            else
                this.navCtrl.popToRoot();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cart'),
        __metadata("design:type", Object)
    ], CategoriesPage.prototype, "buttonCart", void 0);
    CategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-categories',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\categories\categories.html"*/'<ion-header (swipe)="onSwipeContent($event)">\n  <ion-navbar>\n	<ion-title>{{\'categories.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button-cart #cart icon="icon-bag"></button-cart>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<!-- Empty -->\n	<ion-row *ngIf="parents.length < 1 && noResuilt" ion-fixed width-100 height-100 (swipe)="onSwipeContent($event)">\n		<ion-col width-50 style="margin:0 auto;" text-center>\n			<span>{{\'categories.no_data\'|translate}}</span>\n		</ion-col>\n	</ion-row>\n	<!-- Has categories -->\n	 <div width-100 text-center padding *ngIf="!loaddata"><ion-spinner name="ios" ></ion-spinner></div>\n	<ion-row *ngIf="0 < parents.length" wrap padding-4 class="faded-content" [ngClass]="{\'faded-has-content\':faded}">\n		<ion-col width-50 *ngFor="let category of parents" class="item-category"\n		[navPush]="DetailCategoryPage" [navParams]="{id:category.id}" padding-4>\n			<div relative size-full overflow (swipe)="onSwipeContent($event)">\n				<ion-row mark absolute top left width-100 height-100 center>\n					<ion-col text-center light>\n						<div class="name"><b [innerHtml]="category.name"></b></div>\n					</ion-col>\n				</ion-row>\n				<img float-left *ngIf="category.modernshop_images_categories && category.modernshop_images_categories.modern_square" [src]="category.modernshop_images_categories.modern_square" />\n				<img float-left *ngIf="!category.modernshop_images_categories || !category.modernshop_images_categories.modern_square" src="assets/images/no-image.png" />\n			</div>\n		</ion-col>\n	</ion-row>\n</ion-content>\n<ion-footer (swipe)="onSwipeContent($event)"><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\categories\categories.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], CategoriesPage);
    return CategoriesPage;
}());

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_object_to_array__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__detail_detail__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__categories_categories__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__account_account__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom



//Pipes

// Page



var SearchPage = /** @class */ (function () {
    function SearchPage(http, core, storage, navCtrl, Toast) {
        var _this = this;
        this.http = http;
        this.core = core;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.Toast = Toast;
        this.DetailPage = __WEBPACK_IMPORTED_MODULE_8__detail_detail__["a" /* DetailPage */];
        this.CategoriesPage = __WEBPACK_IMPORTED_MODULE_9__categories_categories__["a" /* CategoriesPage */];
        this.AccountPage = __WEBPACK_IMPORTED_MODULE_10__account_account__["a" /* AccountPage */];
        this.products = [];
        this.attributes = [];
        this.page = 1;
        this.sort = '-date_created_gmt';
        this.range = { lower: 0, upper: 0 };
        this.filter = { grid: true, open: null, value: {}, valueCustom: {} };
        this.grid = true;
        this.favorite = {};
        this.trans = {};
        this.actionCart = [];
        this.cartArray = {};
        this.noResuilt = false;
        this.quantity = 1;
        this.data = [];
        this.faded = false;
        this.loaddata = false;
        http.get(wordpress_url + '/wp-json/wooconnector/product/getattribute')
            .subscribe(function (res) {
            _this.attributes = res.json();
            _this.attributes['custom'] = new __WEBPACK_IMPORTED_MODULE_7__pipes_object_to_array__["a" /* ObjectToArray */]().transform(_this.attributes['custom']);
            _this.reset();
            // core.hideLoading();
        });
    }
    SearchPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.inputSearch) {
            console.log(this.inputSearch);
            this.inputSearch["clearTextInput"] = function () {
                (void 0);
                _this.inputSearch._value = '';
                // this.inputSearch.ionChange(this.inputSearch._value);
                _this.inputSearch.writeValue(_this.inputSearch._value);
                setTimeout(function () { _this.inputSearch.setFocus(); }, 100);
            };
        }
    };
    SearchPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.checkCart();
        this.getFavorite();
        this.buttonCart.update();
        setTimeout(function () { _this.inputSearch.setFocus(); }, 100);
    };
    SearchPage.prototype.checkCart = function () {
        var _this = this;
        this.storage.get('cart').then(function (val) {
            var cartNew = Object.assign([], val);
            _this.cartArray = {};
            cartNew.forEach(function (productCart) {
                _this.cartArray[productCart['id']] = productCart['id'];
                console.log(_this.cartArray);
            });
        });
    };
    SearchPage.prototype.getFavorite = function () {
        var _this = this;
        this.storage.get('favorite').then(function (val) { if (val)
            _this.favorite = val; });
    };
    SearchPage.prototype.reset = function () {
        var _this = this;
        this.filter['value'] = {};
        this.filter['valueCustom'] = {};
        this.attributes['attributes'].forEach(function (attr) {
            _this.filter['value'][attr['slug']] = {};
        });
        this.attributes['custom'].forEach(function (attr) {
            _this.filter['valueCustom'][attr['slug']] = {};
        });
        this.range = { lower: 0, upper: 0 };
    };
    SearchPage.prototype.openFilter = function () {
        if (this.filter['open'] == 'filter')
            this.filter['open'] = null;
        else
            this.filter['open'] = 'filter';
    };
    SearchPage.prototype.openSort = function () {
        if (this.filter['open'] == 'sort')
            this.filter['open'] = null;
        else
            this.filter['open'] = 'sort';
    };
    SearchPage.prototype.search = function () {
        var _this = this;
        if (this.filter['open'] == 'filter')
            this.openFilter();
        this.page = 1;
        this.over = false;
        this.loaddata = true;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.noResuilt = false;
                _this.loaddata = false;
                _this.page++;
                if (_this.data) {
                    products.forEach(function (val) {
                        _this.data.forEach(function (cart) {
                            if (val['id'] == cart['id'])
                                val['onCart'] = true;
                        });
                    });
                }
                _this.products = products;
                setTimeout(function () {
                    _this.faded = true;
                }, 100);
            }
            else {
                _this.products = [];
                _this.noResuilt = true;
                _this.loaddata = false;
            }
        });
    };
    SearchPage.prototype.getProducts = function () {
        var _this = this;
        // return new Observable(observable => {
        // 	let params = {
        // 		search: this.keyword,
        // 		post_num_page: this.page,
        // 		post_per_page: wordpress_per_page
        // 	};
        // 	this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
        // 		search: this.core.objectToURLParams(params)
        // 	}).subscribe(products => {
        // 		observable.next(products.json());
        // 		observable.complete();
        // 	});
        // });
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observable) {
            var tmpFilter = [];
            for (var filter in _this.filter['value']) {
                var attr = _this.filter['value'][filter];
                if (Object.keys(attr).length > 0)
                    for (var option in attr) {
                        if (attr[option]) {
                            var now = {};
                            now['keyattr'] = filter;
                            now['valattr'] = option;
                            now['type'] = 'attributes';
                            tmpFilter.push(now);
                        }
                    }
                ;
            }
            for (var filter in _this.filter['valueCustom']) {
                var attr = _this.filter['value'][filter];
                if (attr && Object.keys(attr).length > 0)
                    for (var option in attr) {
                        if (attr[option]) {
                            var now = {};
                            now['keyattr'] = filter;
                            now['valattr'] = option;
                            now['type'] = 'custom';
                            tmpFilter.push(now);
                        }
                    }
                ;
            }
            var params = {
                'search': _this.keyword,
                'post_num_page': _this.page,
                'post_per_page': wordpress_per_page,
            };
            var sortParams = _this.core.addSortToSearchParams(params, _this.sort);
            if (tmpFilter.length == 0 && !_this.range['lower'] && !_this.range['upper']) {
                _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproduct', {
                    search: _this.core.objectToURLParams(params)
                }).subscribe(function (products) {
                    observable.next(products.json());
                    observable.complete();
                });
            }
            else {
                if (tmpFilter.length > 0)
                    params['attribute'] = JSON.stringify(tmpFilter);
                if (_this.range['lower'] != 0)
                    params['min_price'] = _this.range['lower'];
                if (_this.range['upper'] != 0)
                    params['max_price'] = _this.range['upper'];
                _this.http.get(wordpress_url + '/wp-json/wooconnector/product/getproductbyattribute', {
                    search: _this.core.objectToURLParams(params)
                }).subscribe(function (products) {
                    observable.next(products.json());
                    observable.complete();
                });
            }
        });
    };
    SearchPage.prototype.load = function (infiniteScroll) {
        var _this = this;
        this.getProducts().subscribe(function (products) {
            if (products && products.length > 0) {
                _this.page++;
                _this.products = _this.products.concat(products);
            }
            else
                _this.over = true;
            infiniteScroll.complete();
        });
    };
    SearchPage.prototype.changeFavorite = function (product) {
        if (this.favorite[product["id"]]) {
            delete this.favorite[product["id"]];
            this.storage.set('favorite', this.favorite);
        }
        else {
            var data = {
                id: product["id"],
                name: product["name"],
                regular_price: product["regular_price"],
                sale_price: product["sale_price"],
                price: product["price"],
                on_sale: product["on_sale"],
                price_html: product["price_html"],
                type: product["type"]
            };
            if (product["modernshop_images"])
                data['images'] = product["modernshop_images"][0].modern_square;
            this.favorite[product["id"]] = data;
            this.storage.set('favorite', this.favorite);
        }
    };
    SearchPage.prototype.addtoCart = function (detail) {
        var _this = this;
        if (!detail['in_stock']) {
            this.Toast.showShortBottom("Out of Stock").subscribe(function (toast) { }, function (error) { console.log(error); });
            return;
        }
        var data = {};
        var idCart = detail["id"];
        data.idCart = idCart;
        data.id = detail["id"];
        data.name = detail["name"];
        if (detail["wooconnector_crop_images"])
            data.images = detail["wooconnector_crop_images"][0].wooconnector_medium;
        data.regular_price = detail["regular_price"];
        data.sale_price = detail["sale_price"];
        data.price = detail["price"];
        data.quantity = this.quantity;
        data.sold_individually = detail['sold_individually'];
        this.storage.get('cart').then(function (val) {
            var individually = false;
            if (!val)
                val = {};
            if (!val[idCart])
                val[idCart] = data;
            else {
                if (!detail['sold_individually'])
                    val[idCart].quantity += data.quantity;
                else
                    individually = true;
            }
            if (individually) {
                _this.Toast.showShortBottom(_this.trans['individually']['before'] + detail['name'] + _this.trans['individually']['after']).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
            else
                _this.storage.set('cart', val).then(function () {
                    _this.checkCart();
                    _this.buttonCart.update();
                    if (!detail['in_stock'] && detail['backorders'] == 'notify') {
                        _this.Toast.showShortBottom(_this.trans["addOut"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    }
                    else {
                        _this.Toast.showShortBottom(_this.trans["add"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                    }
                });
        });
    };
    SearchPage.prototype.onSwipeContent = function (e) {
        if (e['deltaX'] < -150 || e['deltaX'] > 150) {
            if (e['deltaX'] < 0)
                this.navCtrl.push(this.AccountPage);
            else
                this.navCtrl.push(this.CategoriesPage);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* TextInput */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* TextInput */])
    ], SearchPage.prototype, "inputSearch", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cart'),
        __metadata("design:type", Object)
    ], SearchPage.prototype, "buttonCart", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\search\search.html"*/'<ion-header (swipe)="onSwipeContent($event)">\n  <ion-navbar>\n    <ion-item mode="md" class="search-input">\n      <ion-input #TextInput autocomplete="on" autocorrect = "on" placeholder="{{\'search.title\'|translate}}" clearInput [(ngModel)]="keyword" (keyup.enter)="search()">\n      </ion-input>\n    </ion-item>\n    <ion-buttons end>\n      <button-cart #cart icon="icon-bag"></button-cart>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar class="header-filter">\n    <button ion-button clear color="dark" no-margin (click)="openFilter()" class="disable-hover button-drop">\n      <span [attr.primary]="filter.open==\'filter\' ? true : null">{{\'categories.filter\'|translate}}</span>\n      <ion-icon name="md-arrow-dropdown"></ion-icon>\n    </button>\n    <button ion-button clear color="dark" no-margin (click)="openSort()" class="disable-hover button-drop">\n      <span [attr.primary]="filter.open==\'sort\' ? true : null">{{\'categories.sort\'|translate}}</span>\n      <ion-icon name="md-arrow-dropdown"></ion-icon>\n    </button>\n    <div float-right>\n      <button float-right ion-button clear color="dark" no-margin class="disable-hover"\n      [ngClass]="{\'disabled\':filter.grid}" (click)="filter.grid=false">\n        <ion-icon name="icon-order"></ion-icon>\n      </button>\n      <button float-right ion-button clear color="dark" no-margin class="disable-hover"\n      [ngClass]="{\'disabled\':!filter.grid}" (click)="filter.grid=true">\n        <ion-icon name="icon-grid-out"></ion-icon>\n      </button>\n    </div>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n    <div (swipe)="onSwipeContent($event)">\n    <!-- Filter -->\n          <div *ngIf="filter.open==\'filter\'" ion-fixed width-100 height-100 light-bg>\n            <ion-scroll width-100 height-100 scrollY="true">\n              <ion-list>\n                <!-- Range Price -->\n                <hide-show color="light">\n                  <span this-title>\n                    <b>{{\'categories.price_range\'|translate}}</b>\n                    <span>{{range.lower|price}}</span><span *ngIf="0<range.upper"> - {{range.upper|price}}</span>\n                  </span>\n                  <ion-range mode="md" this-content dualKnobs="true" [min]="attributes.min_price" [max]="attributes.max_price" [(ngModel)]="range">\n                  </ion-range>\n                </hide-show> \n                <hide-show color="light" *ngFor="let attr of attributes.attributes" class="filter-attribute">\n                  <span this-title><b text-capitalize [innerHTML]="attr.name"></b></span>\n                  <ion-row wrap this-content padding-bottom>\n                    <ion-col width-50 *ngFor="let term of attr.term" no-padding>\n                      <ion-item mode="md" no-padding>\n                        <ion-label [innerHTML]="term.name"></ion-label>\n                        <ion-checkbox [(ngModel)]="filter.value[attr.slug][term.slug]"></ion-checkbox>\n                      </ion-item>\n                    </ion-col>\n                  </ion-row>\n                </hide-show> \n                <hide-show color="light" *ngFor="let attr of attributes.custom" class="filter-attribute">\n                  <span this-title><b text-capitalize [innerHTML]="attr.name"></b></span>\n                  <ion-row wrap this-content padding-bottom>\n                    <ion-col width-50 *ngFor="let term of attr.term|ObjectToArray" no-padding>\n                      <ion-item mode="md" no-padding>\n                        <ion-label [innerHTML]="term.name"></ion-label>\n                        <ion-checkbox [(ngModel)]="filter.valueCustom[attr.slug][term.slug]"></ion-checkbox>\n                      </ion-item>\n                    </ion-col>\n                  </ion-row>\n                </hide-show> \n              </ion-list>\n            </ion-scroll>\n          </div>\n          <!-- Sort -->\n          <div *ngIf="filter.open==\'sort\'" ion-fixed width-100 height-100 mark tappable (click)="filter.open=null">\n            <ion-list radio-group [(ngModel)]="sort" class="list-sort" (ngModelChange)="filter.open=null">\n              <ion-item *ngFor="let option of \'categories.sortData\'|translate">\n                <ion-label [innerHTML]="option.text"></ion-label>\n                <ion-radio [value]="option.value"></ion-radio>\n              </ion-item>\n            </ion-list>   \n          </div>\n          <!-- No result -->\n          <ion-row center ion-fixed width-100 height-100 *ngIf="noResuilt" (swipe)="onSwipeContent($event)">\n            <ion-col width-100 text-center>{{\'search.no_result\'|translate}}</ion-col>\n          </ion-row>\n          <!-- Has result -->\n         <!-- List products -->\n         <div width-100 text-center padding *ngIf="loaddata"><ion-spinner name="ios"></ion-spinner></div>\n        <ion-row padding-8 wrap *ngIf="0< products.length" class="faded-content" [ngClass]="{\'filter-list\':!filter.grid, \'faded-has-content\':faded}" (swipe)="onSwipeContent($event)">\n          <ion-col padding-8 relative [attr.width-50]="filter.grid ? true : null" *ngFor="let product of products|orderBy:sort" class="product-block">\n            <div [navPush]="DetailPage" [navParams]="{id:product.id}" relative class="product-image clearfix">\n              <img float-left *ngIf="product.modernshop_images && product.modernshop_images[0].modern_square" [src]="product.modernshop_images[0].modern_square" />\n              <img float-left *ngIf="!product.modernshop_images || !product.modernshop_images[0].modern_square" src="assets/images/no-image.png" />\n              <div absolute bottom primary-bg product-sale *ngIf="product.sale_price && product.type!=\'variable\' && product.type!=\'grouped\'" class="sale">\n                <span light>{{(product.sale_price/product.regular_price*100)-100|number:\'1.0-0\'}}%</span>\n              </div>\n              <img absolute icon-sale *ngIf="(product.type==\'variable\'||product.type==\'grouped\') && product.on_sale" src="assets/images/icon-sale.png" />\n            </div>\n            <div class="product-info clearfix">\n              <div [navPush]="DetailPage" [navParams]="{id:product.id}">\n                <p [attr.no-margin]="filter.grid ? null : true" width-100>\n                  <span class="product-price" *ngIf="product.type!=\'variable\' && product.type!=\'grouped\'" font-90>\n                    <!-- <b dark font-120>{{product.price*1||0|price}}</b>\n                    <span *ngIf="product.sale_price" margin-left text-through>{{product.regular_price*1|price}}</span> -->\n                    <span dark class="simple-price" [innerHTML]="product.price_html"></span>\n                  </span>\n                  <span class="product-price" *ngIf="product.type==\'variable\' || product.type==\'grouped\'" font-90>\n                    <b dark font-120 [innerHTML]="product.price_html"></b>\n                  </span>\n                </p>\n                <div [hidden]="filter.grid">\n                  <div class="rate">\n                    <div class="rating" [style.width]="product.average_rating*20+\'%\'"></div>\n                  </div>\n                </div>\n                <span class="product-title" dark [innerHTML]="product.name"></span>\n                <div *ngIf="product.type==\'variable\' && 0< product.attributes.length" [hidden]="filter.grid">\n                  <div *ngFor="let attribute of product.attributes|filter:{variation:true}">\n                    <span [innerHTML]="attribute.name"></span>: \n                    <span dark>{{attribute.options|ArrayJoin:\', \'}}</span>\n                  </div>\n                </div>\n                <!-- <div [hidden]="filter.grid" overflow>\n                  <div float-left primary no-wrap class="sale">{{\'categories.sold\'|translate}} {{product.total_sales}}</div>\n                </div> -->\n              </div>\n              <div class="button-cart-list" *ngIf="product.type!=\'variable\' && product.type!=\'grouped\' && product.type!=\'external\'">\n                <button ion-button class="button-cart" [disabled]="!product.price" (tap)="addtoCart(product)">\n                  <div float-left width-100 font-weight-500>\n                    <ion-icon class="icon-cart-add" name="icon-iconcartadd" primary></ion-icon>\n                    <span primary class="add-to-cart">{{\'categories.addtocart\' | translate}}</span>\n                  </div>\n                </button>\n                <ion-icon *ngIf="cartArray[product.id] == product.id" float-right class="icon-cart-iconcartcheck" name="icon-iconcartcheck" primary></ion-icon>\n              </div>\n              <div class="button-cart-list-option" *ngIf="product.type==\'variable\' || product.type==\'grouped\' || product.type==\'external\'" [navPush]="DetailPage" [navParams]="{id:product.id}">\n                <button ion-button class="button-cart">\n                  <div float-left width-100 font-weight-500>\n                    <span class="add-to-cart">{{\'categories.chooseoption\' | translate}}</span>\n                  </div>\n                </button>\n              </div>\n            </div>\n            <button ion-button absolute top right clear no-margin (click)="changeFavorite(product)"\n            [color]="favorite[product.id] ? \'primary\' : \'dark\'" [hidden]="filter.grid" class="disable-hover btn-favorite">\n                <ion-icon name="icon-favorite"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n        <ion-infinite-scroll (ionInfinite)="load($event)" *ngIf="!over">\n          <ion-infinite-scroll-content></ion-infinite-scroll-content>\n        </ion-infinite-scroll>\n    </div>\n</ion-content>\n<ion-footer (swipe)="onSwipeContent($event)">\n    <ion-toolbar>\n      <footer-tabs></footer-tabs>\n      <ion-row absolute width-100 height-100 top left light-bg [hidden]="filter.open!=\'filter\'">\n        <ion-col no-padding height-100>\n          <button ion-button full height-100 color="secondary" (click)="reset()">\n            <span>{{\'general.reset\'|translate}}</span>\n          </button>\n        </ion-col>\n        <ion-col no-padding height-100>\n          <button ion-button full height-100 (click)="search()">\n            <span>{{\'categories.done\'|translate}}</span>\n          </button>\n        </ion-col>\n      </ion-row>\n      <div absolute width-100 height-100 top left mark [hidden]="filter.open!=\'sort\' && filter.open!=\'category\'" tappable (click)="filter.open=null"></div>\n    </ion-toolbar>\n  </ion-footer>\n'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\search\search.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_7__pipes_object_to_array__["a" /* ObjectToArray */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TermsPage = /** @class */ (function () {
    function TermsPage() {
        var _this = this;
        this.faded = false;
        setTimeout(function () {
            _this.faded = true;
        }, 100);
    }
    TermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-terms',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\terms\terms.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'modern_terms_ofuser_title\'|static}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div *ngIf="faded" class="faded-content" [ngClass]="{\'faded-has-content\':faded}" [innerHTML]="\'modern_description_term_ofuse\'|static"></div>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\terms\terms.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TermsPage);
    return TermsPage;
}());

//# sourceMappingURL=terms.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validator_core__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__about_about__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom




// Page

var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, formBuilder, http, storage, translate, Toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.http = http;
        this.Toast = Toast;
        this.AboutPage = __WEBPACK_IMPORTED_MODULE_8__about_about__["a" /* AboutPage */];
        this.formContact = formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__validator_core__["a" /* CoreValidator */].isEmail])],
            subject: [''],
            message: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        storage.get('user').then(function (user) {
            _this.formContact.patchValue({
                name: user['display_name'],
                email: user['user_email']
            });
        });
        translate.get('contact').subscribe(function (trans) { return _this.trans = trans; });
    }
    ContactPage.prototype.gotoAbout = function () {
        if (this.navCtrl.getPrevious().component == this.AboutPage)
            this.navCtrl.pop();
        else
            this.navCtrl.push(this.AboutPage);
    };
    ContactPage.prototype.send = function () {
        var _this = this;
        this.isSend = true;
        this.http.post(wordpress_url + '/wp-json/wooconnector/contactus/sendmail', this.formContact.value)
            .subscribe(function (res) {
            _this.isSend = false;
            if (res.json()['result'] == 'success') {
                _this.Toast.showShortTop(_this.trans["success"]).subscribe(function (toast) { }, function (error) { console.log(error); });
                _this.formContact.patchValue({ message: null });
            }
            else {
                _this.Toast.showShortTop(_this.trans["error"]).subscribe(function (toast) { }, function (error) { console.log(error); });
            }
        });
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{\'contact.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button ion-button clear (click)="gotoAbout()" class="disable-hover">\n			<span text-capitalize>{{\'contact.about\'|translate}}</span>\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div padding>\n		<h5><b dark text-uppercase>{{\'contact.send_a_message\'|translate}}</b></h5>\n		<ion-list class="contact-form">\n		  <form [formGroup]="formContact">\n			<ion-item mode="md" no-padding>\n				<ion-input dir="{{display_mode}}" placeholder="{{\'contact.name\'|translate}}" formControlName="name"></ion-input>\n			</ion-item>\n			<ion-item mode="md" no-padding>\n				<ion-input dir="{{display_mode}}" type="email" placeholder="{{\'contact.email\'|translate}}" formControlName="email"></ion-input>\n			</ion-item>\n			<ion-item mode="md" no-padding>\n				<ion-input dir="{{display_mode}}" placeholder="{{\'contact.subject\'|translate}}" formControlName="subject"></ion-input>\n			</ion-item>\n			<ion-item mode="md" no-padding>\n				<ion-textarea dir="{{display_mode}}" placeholder="{{\'contact.message\'|translate}}" formControlName="message"></ion-textarea>\n			</ion-item>\n			<div margin-top overflow>\n				<ion-spinner *ngIf="isSend" name="ios" float-left></ion-spinner>\n				<button ion-button float-right [disabled]="formContact.invalid" (click)="send()">{{\'contact.send\'|translate}}</button>\n			</div>\n		  </form>\n		</ion-list>\n	</div>\n	<about-footer></about-footer>\n</ion-content>\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Page

var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.ContactPage = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
        this.faded = false;
        setTimeout(function () {
            _this.faded = true;
        }, 100);
    }
    AboutPage.prototype.gotoContact = function () {
        if (this.navCtrl.getPrevious().component == this.ContactPage)
            this.navCtrl.pop();
        else
            this.navCtrl.push(this.ContactPage);
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\about\about.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{\'modern_privacy_about_us\'|static}}</ion-title>\n		<ion-buttons end>\n			<button ion-button clear (click)="gotoContact()" class="disable-hover">\n				<span text-capitalize>{{\'about.contact\'|translate}}</span>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div *ngIf="faded" class="faded-content" [ngClass]="{\'faded-has-content\':faded}" [innerHTML]="\'modern_description_about_us\'|static"></div>\n</ion-content>\n\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validator_core__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_core_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_config_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__checkout_checkout__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Custom










// Page


var AddressPage = /** @class */ (function () {
    function AddressPage(http, storage, storageMul, formBuilder, core, navCtrl, config, translate, Geolocation, LocationAccuracy, platform, Diagnostic, Device, ngZone) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.storageMul = storageMul;
        this.formBuilder = formBuilder;
        this.core = core;
        this.navCtrl = navCtrl;
        this.Geolocation = Geolocation;
        this.LocationAccuracy = LocationAccuracy;
        this.platform = platform;
        this.Diagnostic = Diagnostic;
        this.Device = Device;
        this.ngZone = ngZone;
        this.LoginPage = __WEBPACK_IMPORTED_MODULE_14__login_login__["a" /* LoginPage */];
        this.CheckoutPage = __WEBPACK_IMPORTED_MODULE_15__checkout_checkout__["a" /* CheckoutPage */];
        this.login = {};
        this.data = {};
        this.countries = [];
        this.states = {};
        this.shippingStateRequired = false;
        this.billingStateRequired = false;
        console.log(Device);
        this.display_mode = display_mode;
        translate.get('states').subscribe(function (trans) {
            if (trans == 'states')
                trans = {};
            if (config['countries'])
                _this.countries = config['countries'];
            _this.states = Object.assign(trans, config['states']);
        });
        translate.get('address.location').subscribe(function (trans) { return _this.trans = trans; });
        this.formAddress = this.formBuilder.group({
            billing_first_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_last_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_company: [''],
            billing_address_1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_address_2: [''],
            billing_city: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_country: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_state: [''],
            billing_postcode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            billing_phone: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validator_core__["a" /* CoreValidator */].isPhone])],
            user_email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validator_core__["a" /* CoreValidator */].isEmail])],
            shipping_first_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            shipping_last_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            shipping_company: [''],
            shipping_address_1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            shipping_address_2: [''],
            shipping_city: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            shipping_country: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            shipping_state: [''],
            shipping_postcode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.getData();
    }
    AddressPage.prototype.ionViewDidEnter = function () {
        if (this.isCache)
            this.getData();
        else
            this.isCache = true;
    };
    AddressPage.prototype.getData = function () {
        var _this = this;
        this.storageMul.get(['login', 'useBilling', 'user']).then(function (val) {
            if (val['login'])
                _this.login = val['login'];
            if (val['useBilling'] == false)
                _this.useBilling = false;
            else
                _this.useBilling = true;
            if (val['user']) {
                _this.data = val['user'];
                _this.changeCountryBilling(_this.data['billing_country']);
                _this.changeCountryShipping(_this.data['shipping_country']);
            }
            _this.reset();
        });
    };
    AddressPage.prototype.reset = function () {
        this.formAddress.patchValue({
            billing_first_name: this.data["billing_first_name"],
            billing_last_name: this.data["billing_last_name"],
            billing_company: this.data["billing_company"],
            billing_address_1: this.data["billing_address_1"],
            billing_address_2: this.data["billing_address_2"],
            billing_city: this.data["billing_city"],
            billing_country: this.data["billing_country"],
            billing_state: this.data["billing_state"],
            billing_postcode: this.data["billing_postcode"],
            billing_phone: this.data["billing_phone"],
            user_email: this.data["user_email"],
            shipping_first_name: this.data["shipping_first_name"],
            shipping_last_name: this.data["shipping_last_name"],
            shipping_company: this.data["shipping_company"],
            shipping_address_1: this.data["shipping_address_1"],
            shipping_address_2: this.data["shipping_address_2"],
            shipping_city: this.data["shipping_city"],
            shipping_country: this.data["shipping_country"],
            shipping_state: this.data["shipping_state"],
            shipping_postcode: this.data["shipping_postcode"]
        });
        this.rawData = Object.assign({}, this.formAddress.value);
    };
    AddressPage.prototype.updateShipping = function () {
        if (this.useBilling) {
            this.formAddress.patchValue({
                shipping_first_name: this.formAddress.value["billing_first_name"],
                shipping_last_name: this.formAddress.value["billing_last_name"],
                shipping_company: this.formAddress.value["billing_company"],
                shipping_address_1: this.formAddress.value["billing_address_1"],
                shipping_address_2: this.formAddress.value["billing_address_2"],
                shipping_city: this.formAddress.value["billing_city"],
                shipping_country: this.formAddress.value["billing_country"],
                shipping_state: this.formAddress.value["billing_state"],
                shipping_postcode: this.formAddress.value["billing_postcode"]
            });
        }
    };
    AddressPage.prototype.checkUseBilling = function () {
        if (this.useBilling)
            this.updateShipping();
    };
    AddressPage.prototype.changeCountryBilling = function (e) {
        if (this.states[e]) {
            console.log('Billing 1');
            this.statesBilling = this.states[e];
            this.billingStateRequired = true;
            this.formAddress.patchValue({ billing_state: '' });
        }
        else {
            this.statesBilling = null;
            console.log('Billing 2');
            this.billingStateRequired = false;
            this.formAddress.patchValue({ billing_state: '' });
        }
        if (this.useBilling)
            this.formAddress.patchValue({
                shipping_country: this.formAddress.value["billing_country"]
            });
    };
    AddressPage.prototype.changeCountryShipping = function (e) {
        if (this.states[e]) {
            console.log('Shipping 1');
            this.statesShipping = this.states[e];
            this.shippingStateRequired = true;
            this.formAddress.patchValue({ shipping_state: '' });
        }
        else {
            console.log('Shipping 2');
            this.statesShipping = null;
            this.shippingStateRequired = false;
            this.formAddress.patchValue({ shipping_state: '' });
        }
    };
    AddressPage.prototype.changeBillingState = function (e) {
        if (this.useBilling)
            this.formAddress.patchValue({
                shipping_state: this.formAddress.value["billing_state"]
            });
    };
    AddressPage.prototype.confirm = function () {
        var _this = this;
        this.storage.set('useBilling', this.useBilling);
        if (this.useBilling)
            this.updateShipping();
        if (JSON.stringify(this.rawData) != JSON.stringify(this.formAddress.value)) {
            if (this.login["token"]) {
                var params = this.core.objectToURLParams(this.formAddress.value);
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                headers.set('Authorization', 'Bearer ' + this.login["token"]);
                this.core.showLoading();
                this.http.post(wordpress_url + '/wp-json/wooconnector/user/update_profile', params, {
                    headers: headers,
                    withCredentials: true
                }).subscribe(function (res) {
                    _this.data = res.json();
                    _this.storage.set('user', _this.data).then(function () {
                        _this.gotoCheckout();
                    });
                    _this.core.hideLoading();
                });
            }
            else {
                this.data = this.formAddress.value;
                this.storage.set('user', this.data).then(function () {
                    _this.gotoCheckout();
                });
            }
        }
        else
            this.gotoCheckout();
    };
    AddressPage.prototype.gotoCheckout = function () {
        var _this = this;
        if (this.navCtrl.getPrevious() && this.navCtrl.getPrevious().component == this.CheckoutPage)
            this.navCtrl.pop();
        else {
            this.navCtrl.push(this.CheckoutPage).then(function () {
                _this.navCtrl.remove(_this.navCtrl.getActive().index - 1);
            });
        }
    };
    AddressPage.prototype.location = function () {
        var _this = this;
        if (!this.platform.is('cordova'))
            return;
        this.core.showLoading();
        this.LocationAccuracy.canRequest().then(function (can) {
            if ((!can && _this.Device.platform == 'iOS') || (can && _this.Device.platform == 'Android')) {
                _this.LocationAccuracy.request(_this.LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                    _this.Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(function (resp) {
                        var latlng;
                        if (resp['coords'])
                            latlng = resp['coords']['latitude'] + ',' + resp['coords']['longitude'];
                        if (!latlng)
                            return;
                        _this.http.get('http://maps.google.com/maps/api/geocode/json?latlng=' + latlng).subscribe(function (res) {
                            if (res.json()['status'] == 'OK' && res.json()['results']) {
                                var address = res.json()['results'][0];
                                var city_1;
                                var country_1;
                                address['address_components'].forEach(function (component) {
                                    if (component['types'].indexOf('administrative_area_level_1') != -1)
                                        city_1 = component['long_name'];
                                    if (component['types'].indexOf('country') != -1)
                                        country_1 = component['short_name'];
                                });
                                _this.formAddress.patchValue({
                                    billing_address_1: address['formatted_address'],
                                    billing_city: city_1,
                                    billing_country: country_1
                                });
                            }
                        });
                        _this.core.hideLoading();
                    }).catch(function (error) {
                        _this.core.hideLoading();
                    });
                }, function (err) { return _this.core.hideLoading(); });
            }
            else {
                _this.Diagnostic.requestLocationAuthorization('always').then(function (res) {
                    if (res)
                        _this.location();
                });
                _this.core.hideLoading();
            }
        });
    };
    AddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-address',template:/*ion-inline-start:"C:\MobileApp\modernshop\modernshop\src\pages\address\address.html"*/'<ion-header>\n  <ion-navbar>\n	<ion-title>{{\'address.title\'|translate}}</ion-title>\n	<ion-buttons end>\n		<button ion-button (click)="location()">\n			<ion-icon name="ios-locate-outline"></ion-icon>\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<!-- Billing -->\n<div text-uppercase dark>{{\'address.your_billing\'|translate}}</div>\n<ion-list>\n	<form [formGroup]="formAddress">\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'general.first_name\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_first_name" (input)="checkUseBilling()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'general.last_name\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_last_name" (input)="checkUseBilling()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.company\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_company"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.address_1\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_address_1" (input)="checkUseBilling()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.address_2\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_address_2"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.city\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_city" (input)="checkUseBilling()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.zip\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_postcode" (input)="checkUseBilling()"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.country\'|translate}}</ion-label>\n			<ion-select dir="{{display_mode}}" [selectOptions]="{cssClass:\'select-address\'}" [cancelText]="\'general.cancel\'|translate" [okText]="\'general.ok\'|translate" type="text" formControlName="billing_country" (ionChange)="changeCountryBilling($event)">\n				<ion-option *ngFor="let country of countries" [value]="country.value">\n					<span [innerHtml]="country.name"></span>\n				</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding *ngIf="statesBilling && statesBilling!=\'input\'">\n			<ion-label floating>{{\'address.states\'|translate}}</ion-label>\n			<ion-select dir="{{display_mode}}" [selectOptions]="{cssClass:\'select-address\'}" [cancelText]="\'general.cancel\'|translate" [okText]="\'general.ok\'|translate" type="text" formControlName="billing_state" (ionChange)="checkUseBilling()">\n				<ion-option *ngFor="let state of statesBilling" [value]="state.value">\n					<span [innerHtml]="state.name"></span>\n				</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding *ngIf="statesBilling==\'input\'">\n			<ion-label floating>{{\'address.states\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="billing_state" (input)="changeBillingState($event)"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.phone\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="tel" formControlName="billing_phone"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.email\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="user_email"></ion-input>\n		</ion-item>\n	</form>\n</ion-list>\n<!-- Delivery -->\n<div text-uppercase dark>{{\'address.your_delivery\'|translate}}</div>\n<ion-item mode="md" class="checkbox-use-billing" no-padding>\n	<ion-label text-wrap>{{\'address.use_billing\'|translate}}</ion-label>\n	<ion-checkbox mode="md" [(ngModel)]="useBilling" (ionChange)="updateShipping()"></ion-checkbox>\n</ion-item>\n<ion-list *ngIf="!useBilling">\n	<form [formGroup]="formAddress">\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'general.first_name\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_first_name"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'general.last_name\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_last_name"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.company\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_company"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.address_1\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_address_1"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.address_2\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_address_2"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.city\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_city"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.zip\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_postcode"></ion-input>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding>\n			<ion-label floating>{{\'address.country\'|translate}}</ion-label>\n			<ion-select dir="{{display_mode}}" [selectOptions]="{cssClass:\'select-address\'}" [cancelText]="\'general.cancel\'|translate" [okText]="\'general.ok\'|translate" type="text" formControlName="shipping_country" (ionChange)="changeCountryShipping($event)">\n				<ion-option *ngFor="let country of countries" [value]="country.value">\n					<span [innerHtml]="country.name"></span>\n				</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding *ngIf="statesShipping && statesShipping!=\'input\'">\n			<ion-label floating>{{\'address.states\'|translate}}</ion-label>\n			<ion-select dir="{{display_mode}}" [selectOptions]="{cssClass:\'select-address\'}" [cancelText]="\'general.cancel\'|translate" [okText]="\'general.ok\'|translate" type="text" formControlName="shipping_state">\n				<ion-option *ngFor="let state of statesShipping" [value]="state.value">\n					<span [innerHtml]="state.name"></span>\n				</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item mode="md" bg-transparent no-padding *ngIf="statesShipping==\'input\'">\n			<ion-label floating>{{\'address.states\'|translate}}</ion-label>\n			<ion-input dir="{{display_mode}}" type="text" formControlName="shipping_state"></ion-input>\n		</ion-item>\n	</form>\n</ion-list>\n<button ion-button block text-uppercase (click)="confirm()" \n	[disabled]="formAddress.invalid || (formAddress.controls.billing_state.value == \'\' && billingStateRequired)\n	|| (formAddress.controls.shipping_state.value == \'\' && shippingStateRequired)">\n	<span text-uppercase>{{\'address.confirm\'|translate}}</span>\n</button>\n</ion-content>\n\n<ion-footer><ion-toolbar><footer-tabs></footer-tabs></ion-toolbar></ion-footer>'/*ion-inline-end:"C:\MobileApp\modernshop\modernshop\src\pages\address\address.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */], __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__["a" /* LocationAccuracy */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__service_storage_multi_service__["a" /* StorageMulti */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_7__service_core_service__["a" /* Core */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8__service_config_service__["a" /* Config */],
            __WEBPACK_IMPORTED_MODULE_9__module_ng2_translate__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], AddressPage);
    return AddressPage;
}());

//# sourceMappingURL=address.js.map

/***/ })

},[253]);
//# sourceMappingURL=main.js.map