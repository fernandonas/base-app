import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-first-login',
  imports: [],
  templateUrl: './first-login.html',
  styleUrl: './first-login.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLogin { }
