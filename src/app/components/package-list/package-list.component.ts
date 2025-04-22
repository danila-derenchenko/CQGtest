import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageCardComponent } from '../package-card/package-card.component';
import consts from '../../../../consts';
import { Package } from '../types';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCardComponent, FormsModule],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];
  dependencies: string[] = [];
  loading: boolean = false;
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadingPackages();
  }

  get filteredPackages(): Package[] {
    const term = this.searchTerm.toLowerCase();
    return this.packages.filter(p =>
      p.id.toLowerCase().includes(term)
    );
  }

  loadingPackages(): void {
    this.loading = true;
    this.http.get<Package[]>(`${consts.serverURL}packages`)
      .subscribe(data => {
        this.packages = data;
        this.loading = false;
        console.log(data);
      });
  }

  loadingDependency(id: string | null): void {
    if (id) {
      const encodedId = encodeURIComponent(id);
      this.http.get<string[]>(`${consts.serverURL}packages/${encodedId}/dependencies`)
        .subscribe(data => {
          this.dependencies = data;
          console.log(this.dependencies);
        });
    } else {
      this.dependencies = [];
    }
  }
}
