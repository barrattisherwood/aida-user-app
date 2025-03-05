import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appAnimatedTooltip]',
  standalone: true,
})
export class AnimatedTooltipDirective {
  @Input('appAnimatedTooltip') tooltipText: string = '';

  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.addClass(this.tooltipElement, 'animated-tooltip');
  }

  @HostListener('mouseenter') onMouseEnter() {
    debugger;
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'visible');
    this.renderer.setProperty(this.tooltipElement, 'textContent', this.tooltipText);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.tooltipElement, 'visibility', 'hidden');
  }
}
