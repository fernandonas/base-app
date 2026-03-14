import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService, ILoginRequest } from '../../../../core/auth';
import { ValidateForm as ValidateFormGroup } from '../../../../shared/functions/form/validate-form';
import { IRegisterRequest } from '../../../../core/auth/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [NzFormModule, NzInputModule, FormsModule, ReactiveFormsModule, NzButtonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly authService = inject(AuthService);
  registerForm = this.formBuilder.group({
    username: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required])
  });

  public register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as IRegisterRequest).subscribe();
    } else {
      ValidateFormGroup(this.registerForm);
    }
  }
}
