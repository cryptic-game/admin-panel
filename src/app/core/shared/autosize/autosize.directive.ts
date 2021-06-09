import { AfterContentChecked, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutosize]'
})
export class AutosizeDirective implements AfterContentChecked {

  private static readonly RESIZE_DEBOUNCE = 200;
  private lastWindowResize = 0;
  private oldContent?: string;
  private oldWidth?: number;

  constructor(
    private readonly ele: ElementRef<HTMLTextAreaElement>,
    private readonly renderer: Renderer2
  ) {
    this.ele.nativeElement.style.overflow = 'hidden';
    setTimeout(() => this.adjust());
  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  @HostListener('input')
  private onInput(): void {
    this.adjust();
  }

  @HostListener('window:resize')
  private onWindowResize(): void {
    const now = Date.now();
    if (this.lastWindowResize + AutosizeDirective.RESIZE_DEBOUNCE > now) {
      return;
    }

    this.lastWindowResize = now;
    this.adjust();
  }

  private adjust(): void {
    const currentContent = this.ele.nativeElement.value;
    const currentWidth = this.ele.nativeElement.offsetWidth;

    // element did not changes -> skip this
    if (currentContent === this.oldContent && currentWidth === this.oldWidth) {
      return;
    }

    this.oldContent = currentContent;
    this.oldWidth = currentWidth;

    const parent = this.ele.nativeElement.parentNode;
    if (!parent) {
      throw new Error('Unexpected Error: missing \'parent\'');
    }

    const clone = this.ele.nativeElement.cloneNode(true) as HTMLElement;
    clone.style.width = currentWidth + 'px';
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.textContent = currentContent;

    parent.appendChild(clone);

    clone.style.overflow = 'hidden';
    clone.style.height = 'auto';

    let height = clone.scrollHeight;

    // add into height top and bottom borders' width
    const computedStyle = window.getComputedStyle(clone, null);
    height += parseInt(computedStyle.getPropertyValue('border-top-width'));
    height += parseInt(computedStyle.getPropertyValue('border-bottom-width'));

    // add into height top and bottom paddings width
    height += parseInt(computedStyle.getPropertyValue('padding-top'));
    height += parseInt(computedStyle.getPropertyValue('padding-bottom'));

    this.renderer.setStyle(
      this.ele.nativeElement,
      'height',
      height + 'px'
    );

    parent.removeChild(clone);
  }
}

