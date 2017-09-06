import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @ViewChild('searchit') private elementRef: ElementRef;

  constructor(
    public globalService: GlobalService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

  }

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  performSearch(event) {
    this.globalService.searchTerm.next(event);
  }

}
