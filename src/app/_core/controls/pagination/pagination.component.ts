import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'control-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.scss' ]
})
export class PaginationComponent {

  @Input()
  currentPage: string;
  @Input()
  pageCount: string;
  @Output()
  private page: EventEmitter<number>;

  constructor() {
    this.page = new EventEmitter<number>();
  }

  get currentPage0(): number {
    const currentPage = Number(this.currentPage);
    return isNaN(currentPage) ? 1 : currentPage;
  }

  get pageCount0(): number {
    const pageCount = Number(this.pageCount);
    return isNaN(pageCount) ? 1 : pageCount;
  }

  changePage(count: number): void {
    this.page.emit(this.currentPage0 + count);
  }
}
