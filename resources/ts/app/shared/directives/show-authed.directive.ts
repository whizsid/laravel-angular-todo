import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import UserService from '../../core/services/user.service';
import User from '../../core/models/user.model';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {
    this.userService.getLoggedUser.subscribe(this.updateUser );
  }

  condition: boolean;

  ngOnInit() {
    if (this.userService.loggedUser || !this.condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  updateUser = (user: User | undefined) => {
      this.viewContainer.clear();

      if ( (user && this.condition) || (!user && ! this.condition) ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

}
