import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PackageCardComponent } from '../package-card/package-card.component';
import consts from '../../../../consts';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCardComponent],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent implements OnInit {
  @Output() packages: any;

  loading: boolean = false;

  dependencies: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadingPackages()
  }

  loadingPackages() {
    this.loading = true;
    this.http.get<any[]>(`${consts.serverURL}packages`)
      .subscribe(data => {
        this.packages = data;
        this.loading = false;
        console.log(data)
      });
  }
  loadingDependency(id: any) {
    if(id != null) {
      const encodedId = encodeURIComponent(id);
      this.http.get<any[]>(`${consts.serverURL}packages/${encodedId}/dependencies`)
      .subscribe(data => {
        this.dependencies = data;
        console.log(this.dependencies)
      });
    } else {
      this.dependencies = [];
    }
  }
}