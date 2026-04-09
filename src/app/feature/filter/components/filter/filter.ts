import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FilterForm } from '../filter-form/filter-form';

@Component({
  selector: 'app-filter',
  imports: [NzButtonModule, NzDrawerModule, FilterForm],
  templateUrl:'./filter.html',
  styleUrl: './filter.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filter {
  visible = signal(false);

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }

}
