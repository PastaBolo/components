import { Directive, OnInit, HostBinding, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: '[appSvgImage]',
})
export class SvgImageDirective implements OnInit {
  @HostBinding('innerHTML') svg: SafeHtml;
  @Input() source: string;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.httpClient
      .get(`${this.source}.svg`, { responseType: 'text' })
      .subscribe(
        res => this.svg = this.sanitizer.bypassSecurityTrustHtml(res)
      );
  }
}
