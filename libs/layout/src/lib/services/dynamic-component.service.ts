import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  NgModuleRef,
  ViewContainerRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public addComponentToRef(
    componentClass: any,
    ref: ViewContainerRef,
    data?: { [name: string]: any },
    moduleRef?: NgModuleRef<any>
  ): ComponentRef<any> {
    const cfr = moduleRef
      ? moduleRef.componentFactoryResolver
      : this.componentFactoryResolver;

    const componentFactory = cfr.resolveComponentFactory(componentClass);
    const component = ref.createComponent(componentFactory);

    if (data) {
      Object.keys(data).forEach((option) => {
        component.instance[option] = data[option];
      });
    }

    return component;
  }
}
