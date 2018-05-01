
export interface PresetItem {
    presetLabel: string;
    range:Range;
}

export interface Range {
    fromDate: Date;
    toDate: Date;
}

export interface CalendarDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    shouldCloseOnBackdropClick?: boolean;
}

export interface NgxDrpOptions {
    presets: Array<PresetItem>;
    format: string;
    range: Range;
    excludeWeekends?: boolean;
    locale?:string;
    fromMinMax?:Range;
    toMinMax?:Range;
    applyLabel?:string;
    cancelLabel?:string;

}