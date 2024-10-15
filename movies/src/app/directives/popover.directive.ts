import {ComponentRef, Directive, ElementRef, HostListener, Input, Renderer2, ViewContainerRef} from '@angular/core';
import {PopoverComponent} from "../../components/popover/popover.component";

@Directive({
  selector: '[appPopover]',
  standalone: true
})
export class PopoverDirective {

  @Input('appPopover') popoverContent: string;
  private popoverRef?: ComponentRef<PopoverComponent>

  constructor(
    private elRef: ElementRef,
    private viewRef: ViewContainerRef,
    private render: Renderer2
  ) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.popoverRef) {
      this.showpopover()
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.popoverRef) {
      this.hidePopover()
    }
  }


  showpopover() {
    this.popoverRef = this.viewRef.createComponent(PopoverComponent);


    const rect = this.elRef.nativeElement.getBoundingClientRect();
    const position = {x: rect.left, y: rect.bottom};

    const popoverEl = this.popoverRef.location.nativeElement


    this.popoverRef.instance.position = position

    this.render.setProperty(popoverEl, 'textContent', this.popoverContent)
  }

  hidePopover() {

    if (this.popoverRef) {
      this.popoverRef.destroy();
      this.popoverRef = undefined
    }

  }

}
