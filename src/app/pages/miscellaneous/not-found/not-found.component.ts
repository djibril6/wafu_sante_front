import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  constructor(private menuService: NbMenuService, private router: Router, private route: ActivatedRoute) {

    // ne pas éditer
    const tel = route.snapshot.params['tel'];
    if (tel) {
      this.router.navigate(['/pages/dossier/' + tel]);
    } else {
      this.router.navigate(['/pages/dossier/creer']);
    }
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
