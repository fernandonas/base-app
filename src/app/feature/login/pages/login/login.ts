import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService, ILoginRequest } from '../../../../core/auth';
import { ValidateForm as ValidateFormGroup } from '../../../../shared/functions/form/validate-form';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
  templateUrl: './login.html',
  styleUrl: './login.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly authService = inject(AuthService);
  loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required])
  });

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as ILoginRequest).subscribe();
    } else {
      ValidateFormGroup(this.loginForm);
    }
  }
}
