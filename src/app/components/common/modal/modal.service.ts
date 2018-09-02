import {
  ComponentFactoryResolver,
  Injectable,
  ComponentRef,
  ViewContainerRef
} from '@angular/core';

@Injectable()
export class ModalService {
  rootViewContainer: ViewContainerRef;
  component: ComponentRef<any>;

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(myComponent) {
    const factory = this.factoryResolver.resolveComponentFactory(myComponent);
    this.component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(this.component.hostView);
  }

  removeDynamicComponent() {
    this.component.destroy();
  }
}
