import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, signal, type OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';

type Filter = {
  s1?: string;
  s2?: string;
  s3?: string;
  s4?: string;
};

@Component({
  selector: 'app-filter-form',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NzSelectModule, NzButtonModule],
  templateUrl: './filter-form.html',
  styleUrl: './filter-form.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterForm {
  selected1 = model<string | null>(null);
  selected2 = model<string | null>(null);
  selected3 = model<string | null>(null);
  selected4 = model<string | null>(null);

  // listas de opções
  options1 = signal<any[]>([]);
  options2 = signal<any[]>([]);
  options3 = signal<any[]>([]);
  options4 = signal<any[]>([]);

  appliedFilter = signal<Filter>({});

  constructor() {
    this.loadOptions1();
  }

  onChange1(value: string) {
    this.selected1.set(value);

    // limpa dependentes
    this.selected2.set(null);
    this.selected3.set(null);
    this.selected4.set(null);

    this.options2.set([]);
    this.options3.set([]);
    this.options4.set([]);

    this.loadOptions2(value);
  }

  onChange2(value: string) {
    this.selected2.set(value);

    this.selected3.set(null);
    this.selected4.set(null);

    this.options3.set([]);
    this.options4.set([]);

    this.loadOptions3(value);
  }

  onChange3(value: string) {
    this.selected3.set(value);

    this.selected4.set(null);
    this.options4.set([]);

    this.loadOptions4(value);
  }

  onChange4(value: string) {
    this.selected4.set(value);
  }

  loadOptions1() {
    this.options1.set([{ id: '1', name: 'A' }, { id: '2', name: 'B' }]);
  }

  loadOptions2(parentId: string) {
    // chamada API baseada no anterior
    this.options2.set([{ id: '10', name: 'Sub A' }]);
  }

  loadOptions3(parentId: string) {
    this.options3.set([{ id: '20', name: 'Sub Sub A' }]);
  }

  loadOptions4(parentId: string) {
    this.options4.set([{ id: '30', name: 'Final' }]);
  }

  applyFilter() {
    this.appliedFilter.set({
      s1: this.selected1() ?? undefined,
      s2: this.selected2() ?? undefined,
      s3: this.selected3() ?? undefined,
      s4: this.selected4() ?? undefined
    });

    console.log('Filtro aplicado:', this.appliedFilter());
  }

}
