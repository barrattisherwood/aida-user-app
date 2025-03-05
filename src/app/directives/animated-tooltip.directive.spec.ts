import { AnimatedTooltipDirective } from './animated-tooltip.directive';

describe('AnimatedTooltipDirective', () => {
  it('should create an instance', () => {
    const elRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    const rendererMock = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'addClass']);
    const directive = new AnimatedTooltipDirective(elRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
