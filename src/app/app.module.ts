import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
Pro.init('d32002e9', {
  appVersion: '1.1.2'
})

import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from '../module/ng2-translate';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AboutFooterComponent } from '../components/about-footer/about-footer';
import { ButtonCartComponent } from '../components/button-cart/button-cart';
import { FooterTabsComponent } from '../components/footer-tabs/footer-tabs';
import { ButtonQuantityComponent } from '../components/button-quantity/button-quantity';
import { HideShowComponent } from '../components/hide-show/hide-show';
import { Config } from '../service/config.service';
import { Filter } from '../pipes/filter';
import { ArrayJoin } from '../pipes/array-join';
import { ObjectToArray } from '../pipes/object-to-array';
import { OrderBy } from '../pipes/order-by';
import { Range } from '../pipes/range';
import { Price } from '../pipes/price';
import { TimeAgo } from '../pipes/time-ago';
import { Static } from '../pipes/static';
import { Viewmore } from '../pipes/viewmore';
import { DatePipe } from '@angular/common';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { CategoriesPage } from '../pages/categories/categories';
import { DetailCategoryPage } from '../pages/detail-category/detail-category';
import { SearchPage } from '../pages/search/search';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DetailPage } from '../pages/detail/detail';
import { CartPage } from '../pages/cart/cart';
import { CommentsPage } from '../pages/comments/comments';
import { RatingPage } from '../pages/rating/rating';
import { OrderPage } from '../pages/order/order';
import { FavoritePage } from '../pages/favorite/favorite';
import { TermsPage } from '../pages/terms/terms';
import { PetinfoPage } from '../pages/petinfo/petinfo';
import { MypetsPage } from '../pages/mypets/mypets';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { PopupadsPage } from '../pages/popupads/popupads';
import { ProfilePage } from '../pages/profile/profile';
import { AddressPage } from '../pages/address/address';
import { AppointmentPage } from '../pages/appointment/appointment';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DetailOrderPage } from '../pages/detail-order/detail-order';
import { ThanksPage } from '../pages/thanks/thanks';
import { LatestPage } from '../pages/latest/latest';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { OneSignal } from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';
import { Calendar } from '@ionic-native/calendar';
import {DatePicker} from '@ionic-native/date-picker';
import { AddEventPage } from '../pages/add-event/add-event';
import { EditEventPage } from '../pages/edit-event/edit-event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutFooterComponent,
    CategoriesPage,
    DetailCategoryPage,
    SearchPage,
    AccountPage,
    LoginPage,
    SignupPage,
    ButtonCartComponent,
    FooterTabsComponent,
    DetailPage,
    CartPage,
    ButtonQuantityComponent,
    Filter,
    ArrayJoin,
    ObjectToArray,
    CommentsPage,
    RatingPage,
    OrderPage,
    FavoritePage,
    TermsPage,
    PetinfoPage,
    MypetsPage,
	PrivacyPage,
    ContactPage,
    AboutPage,
    PopupadsPage,
    HideShowComponent,
    OrderBy,
    ProfilePage,
    AddressPage,
    AppointmentPage,
    CheckoutPage,
    Range,
    Price,
    DetailOrderPage,
    ThanksPage,
    TimeAgo,
    LatestPage,
    Static,
    Viewmore,
    SplashPage,
    AddEventPage,
    EditEventPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      mode: 'ios',
      pageTransition: 'md-transition',
      animate: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicStorageModule.forRoot({ 
      name: 'woocommerce_application', 
      driverOrder: ['sqlite', 'websql', 'indexeddb'] 
    })
  ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
		SplashPage,
        CategoriesPage,
        DetailCategoryPage,
        SearchPage,
        AccountPage,
        LoginPage,
        SignupPage,
        DetailPage,
        CartPage,
        CommentsPage,
        RatingPage,
        OrderPage,
        FavoritePage,
        TermsPage,
        PetinfoPage,
        MypetsPage,
		PrivacyPage,
        ContactPage,
        AboutPage,
        ProfilePage,
        PopupadsPage,
        AddressPage,
        AppointmentPage,
        CheckoutPage,
        DetailOrderPage,
        ThanksPage,
        LatestPage,
	AddEventPage,
    EditEventPage
    ],
    providers: [
	    Calendar,
		DatePicker,
        Config,
        DatePipe,
        SplashScreen,
        StatusBar,
        Camera,
        InAppBrowser,
        Network,
        OneSignal,
        Keyboard,
        SocialSharing,
        Toast,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
