import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, resource } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-expenses',
  imports: [],
  templateUrl: './expenses.html',
  styleUrl: './expenses.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Expenses {
  private readonly httpClient = inject(HttpClient);


  expenses = resource({
    loader: async () => await firstValueFrom(this.httpClient.get<{ message: string }>(environment.api.expenses))
  })
}
