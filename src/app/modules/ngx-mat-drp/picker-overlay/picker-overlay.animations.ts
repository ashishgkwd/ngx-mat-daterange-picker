import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  group
} from '@angular/animations';

export const pickerOverlayAnimations: {
  readonly transformPanel: AnimationTriggerMetadata;
} = {
  /** Transforms the height of the picker overlay content. */
  transformPanel: trigger('transformPickerOverlay', [
    state('void', style({opacity: 0, transform: 'scale(1, 0)'})),
    state('enter', style({opacity: 1, transform: 'scale(1, 1)'})),
    transition('void => enter', group([
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ])),
    transition('* => void', animate('100ms linear', style({opacity: 0})))
  ])
};
