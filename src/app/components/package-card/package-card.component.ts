import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss'] // ← должно быть style**Urls**, не styleUrl
})
export class PackageCardComponent {
  @Input() pkg: any;
  @Input() isDepenpency: any;
  @Output() hover = new EventEmitter<string | null>();

  get formattedDownloads(): string {
    const num = this.pkg?.weeklyDownloads ?? 0;
    if (num >= 1_000_000) return `${Math.floor(num / 1_000_000)}M`;
    if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
    return `${num}`;
  }

  get nameParts(): string {
    return this.pkg.id.split('/') ?? [];
  }

  onMouseEnter(): void {
    this.hover.emit(this.pkg.id)
  }

  onMouseLeave(): void {
    this.hover.emit(null)
  }
}

