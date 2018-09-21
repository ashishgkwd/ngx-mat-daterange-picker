import { Injectable, ElementRef, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NgxDrpOptions, CalendarOverlayConfig } from '../model/model';
import { takeWhile } from 'rxjs/operators';
import { PickerOverlayComponent } from '../picker-overlay/picker-overlay.component';

const DEFAULT_CONFIG: CalendarOverlayConfig = {
  panelClass: 'ngx-mat-drp-overlay',
  hasBackdrop: true,
  backdropClass: 'ngx-mat-drp-overlay-backdrop',
  shouldCloseOnBackdropClick: true
};

@Injectable()
export class CalendarOverlayService {
  private hostElemRef: ElementRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  open(
    config: CalendarOverlayConfig = {},
    hostElemRef: ElementRef
  ): OverlayRef {
    this.hostElemRef = hostElemRef;
    const overlayConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(overlayConfig);
    const portalInjector = this.createInjector(overlayRef);
    const calendarPortal = new ComponentPortal(
      PickerOverlayComponent,
      null,
      portalInjector
    );
    overlayRef.attach(calendarPortal);

    overlayRef
      .backdropClick()
      .pipe(takeWhile(() => overlayConfig.shouldCloseOnBackdropClick))
      .subscribe(() => overlayRef.dispose());

    return overlayRef;
  }

  private createOverlay(config: CalendarOverlayConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: CalendarOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.hostElemRef)
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withDefaultOffsetY(12)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  private createInjector(overlayRef: OverlayRef): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
