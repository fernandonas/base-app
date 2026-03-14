import { AbstractControl, FormGroup } from "@angular/forms";

export function ValidateForm(form: FormGroup): void {
    Object.values(form.controls).forEach((control: AbstractControl) => {
        if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
    });
}