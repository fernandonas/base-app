import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from '../../../../shared/services/user-service';
import { IUserResponse } from '../../../../shared/models';
import { lastValueFrom } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-home',
  imports: [NzButtonModule, NzSpinModule],
  templateUrl: './home.html',
  styleUrl: './home.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  private readonly authservice = inject(AuthService);
  private readonly userService = inject(UserService);

  user = resource({
    loader: () => lastValueFrom(this.userService.getUser()),
    defaultValue: undefined
  });

  logout(): void {
    this.authservice.logout();
  } 

}
