import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'optimum_pooling';
  showDropdown: boolean = false;

  currentLanguage: string = 'en'; // Default to 'en' initially

  constructor(private translate: TranslateService,
              private cookies: CookieService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.translate.setDefaultLang('en');
    const cookieLanguage = this.getCookies('language');
    this.currentLanguage = (cookieLanguage === 'en' || cookieLanguage === 'hi') ? cookieLanguage : 'en';
    this.translate.use(this.currentLanguage);
  }
  setCookies(key : string, value : string) {
    this.cookies.set(key, value);
  }
  getCookies(key : string) {
    return this.cookies.get(key);
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  showLanguageSwitcher = false;
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
      this.showLanguageSwitcher = (currentRoute === 'login');
    });
  }


  switchLanguage(language: string): void {
    if (language === 'en' || language === 'hi') {
      this.setCookies('language', language);
      this.translate.use(language);
      this.currentLanguage = language;
    }
    this.showDropdown = false; // Close dropdown after selection
  }
}
