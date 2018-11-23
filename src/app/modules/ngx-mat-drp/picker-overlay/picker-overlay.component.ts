import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PresetItem, NgxDrpOptions } from "../model/model";
import { RangeStoreService } from "../services/range-store.service";
import { OverlayRef } from "@angular/cdk/overlay";
import { ConfigStoreService } from "../services/config-store.service";
import { pickerOverlayAnimations } from "./picker-overlay.animations";

@Component({
  selector: "ngx-mat-drp-picker-overlay",
  templateUrl: "./picker-overlay.component.html",
  styleUrls: ["./picker-overlay.component.css"],
  animations: [pickerOverlayAnimations.transformPanel],
  encapsulation: ViewEncapsulation.None
})
export class PickerOverlayComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  fromMinDate: Date;
  fromMaxDate: Date;
  toMinDate: Date;
  toMaxDate: Date;
  presets: Array<PresetItem> = [];
  startDatePrefix: string;
  endDatePrefix: string;
  applyLabel: string;
  applyOnPresetClick: boolean;
  cancelLabel: string;
  shouldAnimate: string;

  constructor(
    private rangeStoreService: RangeStoreService,
    private configStoreService: ConfigStoreService,
    private overlayRef: OverlayRef
  ) {}

  ngOnInit() {
    this.fromDate = this.rangeStoreService.fromDate;
    this.toDate = this.rangeStoreService.toDate;
    this.startDatePrefix =
      this.configStoreService.ngxDrpOptions.startDatePrefix || "FROM:";
    this.endDatePrefix =
      this.configStoreService.ngxDrpOptions.endDatePrefix || "TO:";
    this.applyLabel =
      this.configStoreService.ngxDrpOptions.applyLabel || "Apply";
    this.cancelLabel =
      this.configStoreService.ngxDrpOptions.cancelLabel || "Cancel";
    this.presets = this.configStoreService.ngxDrpOptions.presets;
    this.applyOnPresetClick =
      this.configStoreService.ngxDrpOptions.applyOnPresetClick || false;
    this.shouldAnimate = this.configStoreService.ngxDrpOptions.animation
      ? "enter"
      : "noop";
    ({
      fromDate: this.fromMinDate,
      toDate: this.fromMaxDate
    } = this.configStoreService.ngxDrpOptions.fromMinMax);
    ({
      fromDate: this.toMinDate,
      toDate: this.toMaxDate
    } = this.configStoreService.ngxDrpOptions.toMinMax);
  }

  updateFromDate(date) {
    this.fromDate = date;
  }

  updateToDate(date) {
    this.toDate = date;
  }

  updateRangeByPreset(presetItem: PresetItem) {
    this.updateFromDate(presetItem.range.fromDate);
    this.updateToDate(presetItem.range.toDate);
    if (this.applyOnPresetClick) {
      this.applyNewDates(null);
    }
  }

  applyNewDates(e) {
    this.rangeStoreService.updateRange(this.fromDate, this.toDate);
    this.disposeOverLay();
  }

  discardNewDates(e) {
    // this.rangeStoreService.updateRange();
    this.disposeOverLay();
  }

  private disposeOverLay() {
    this.overlayRef.dispose();
  }
}
