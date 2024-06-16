import { Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AccordionComponent } from "../accordion.component";

@Component({
  selector: 'app-accordion-group, app-accordion-panel',
  templateUrl: './accordion-group.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'panel',
    style: 'display: block'
  },
  styleUrls: ['./accordion-group.component.scss']
})
export class AccordionPanelComponent implements OnInit, OnDestroy {
  /** turn on/off animation */
  isAnimated = false;
  /** Clickable text in accordion's group header, check `accordion heading` below for using html in header */
  @Input() heading!: string;
  /** Provides an ability to use Bootstrap's contextual panel classes
   * (`panel-primary`, `panel-success`, `panel-info`, etc...).
   * List of all available classes [available here]
   * (https://getbootstrap.com/docs/3.3/components/#panels-alternatives)
   */
  @Input() panelClass = 'panel-default';
  /** if <code>true</code> — disables accordion group */
  @Input() isDisabled = false;
  @Input() icon: string | undefined;
  /** Emits when the opened state changes */
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  // Questionable, maybe .panel-open should be on child div.panel element?
  /** Is accordion group open or closed. This property supports two-way binding */
  @HostBinding('class.panel-open')
  @Input()
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    if (value !== this.isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }
      this._isOpen = value;
      Promise.resolve(null)
      .then(() => {
        this.isOpenChange.emit(value);
      });
    }
  }

  protected _isOpen = false;
  protected accordion: AccordionComponent;

  constructor(@Inject(AccordionComponent) accordion: AccordionComponent) {
    this.accordion = accordion;
  }

  ngOnInit(): void {
    this.accordion.addGroup(this);
  }

  ngOnDestroy(): void {
    this.accordion.removeGroup(this);
  }

  toggleOpen(): void {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
}