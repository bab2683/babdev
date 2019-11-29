export class ViewContainerRefMock {
  returnEl: any;

  createComponent: jest.Mock = jest.fn().mockImplementation(() => ({
    instance: this.returnEl
  }));

  setReturnComponent(component: any) {
    this.returnEl = component;
  }
}
