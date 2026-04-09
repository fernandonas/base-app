import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import keycloak from 'keycloak-js';
import { UserService } from '../../../../../shared/services/user-service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [NzButtonModule, RouterLink],
  templateUrl: './page-header.html',
  styleUrl: './page-header.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  private readonly kc = inject(keycloak);
  private readonly userServices = inject(UserService);
  user = this.userServices.getUser();
  logout = () => this.kc.logout();
}
