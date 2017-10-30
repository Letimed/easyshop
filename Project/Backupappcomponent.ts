/** constructor(private fb: Facebook, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private firebase: Firebase) {
     this.initializeApp();

       //init firebase
              Firebase.initializeApp({
	                         apiKey: "AIzaSyBH-4w_el5hFraTwNbJ5uQQxds7u0srb_g",
				                    authDomain: "easyshoppy-5f0d7.firebaseapp.com",
						                       databaseURL: "https://easyshoppy-5f0d7.firebaseio.com",
								                          projectId: "easyshoppy-5f0d7",
											                     storageBucket: "easyshoppy-5f0d7.appspot.com",
													                        messagingSenderId: "378512581486"
																           });

       // used for an example of ngFor and navigation
              this.pages = [
	               { title: 'Home', component: HomePage },
		                { title: 'List', component: ListPage },
				         { title: 'CallApi', component: CallApi },
					          { title: 'Navigation', component: NavigationPage }
						         ];
							      }

     initializeApp() {
            this.platform.ready().then(() => {

         // Okay, so the platform is ready and our plugins are available.
	          // Here you can do any higher level native things you might need.
		           this.statusBar.styleDefault();
			            this.splashScreen.hide();

         /**
	          this.fb.login(['public_profile', 'user_friends', 'email'])
		             .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
			                .catch(e => console.log('Error logging into Facebook', e));
					           this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);*/
						          });
							       }*/
							       