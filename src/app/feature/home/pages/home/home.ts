import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}
