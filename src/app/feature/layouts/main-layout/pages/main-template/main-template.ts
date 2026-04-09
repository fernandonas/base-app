import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-main-template',
  imports: [RouterOutlet, NzButtonModule, PageHeader],
  templateUrl: './main-template.html',
  styleUrl: './main-template.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTemplate { }
