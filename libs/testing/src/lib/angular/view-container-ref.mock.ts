export class ViewContainerRefMock {
  public returnEl: any;

  public createComponent: jest.Mock = jest.fn().mockImplementation(() => ({
    instance: this.returnEl
  }));

  public setReturnComponent(component: any): void {
    this.returnEl = component;
  }
}
