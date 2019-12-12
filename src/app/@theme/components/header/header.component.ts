import { Component, OnDestroy, OnInit } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbDialogService, NbSearchService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HeaderProfilComponent } from './header-profil/header-profil.component';
import { Router } from '@angular/router';
import { VarConfig } from '../../../config/var.config';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Sombre',
    },
    {
      value: 'cosmic',
      name: 'Cosmique',
    },
    {
      value: 'corporate',
      name: 'Basique',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Mon compte', action: 'profile' }, { title: 'Se déconnecter', action: 'logout' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private searchService: NbSearchService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private dialogService: NbDialogService,
              private router: Router,
              public vg: VarConfig) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        this.user = users.nick;
        // this.user = this.vg.user.response;
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.searchService.onSearchSubmit().subscribe(data => {
        const url = '/pages/dossier/' + data.term;
        this.router.navigate([url]);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  goToChat() {
    this.router.navigate(['/pages/help/chat']);
  }
  action() {
    this.dialogService.open(HeaderProfilComponent, {});
  }

  seConncter() {
    this.dialogService.open(LoginComponent, {});
  }

  onCreerDME() {
    this.router.navigate(['/pages/dossier']); // diriger vers la page not found
  }
}
