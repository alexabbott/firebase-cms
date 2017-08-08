import { Injectable } from '@angular/core';
import { WindowRefService } from "app/services/window-ref.service";

@Injectable()
export class LocalCartService {
  private _window: Window;

  constructor(
    windowRef: WindowRefService
  ) {
    this._window = windowRef.nativeWindow;
  }

  /**
   * clearAll()
   * Clears:
   * - localstorage.cart
   * - localstorage.order
   */
  public clearAll(): void {
    this.clearCart();
    this.clearOrder();
  }

  /**
   * clearCart()
   *
   * clears localstorage cart
   */
  public clearCart(): void {
    this._window.localStorage.setItem('cart', null);
  }

  /**
   * cartHasItems()
   * Returns boolean, if localstorage has items stored in cart.
   */
  public cartHasItems(): boolean {
    return (this._window.localStorage.getItem('cart') !== null);
  }

  /**
   * cartGetItems()
   * returns json object of all items in localstorage cart
   */
  public cartGetItems(): any {
    if (this.cartHasItems()) {
      let cart = this._window.localStorage.getItem('cart');
      cart = JSON.parse(cart);
      return cart;
    }
    return null
  }

  /**
   * clearOrder()
   *
   * Clears localstorage order
   */
  public clearOrder(): void {
    this._window.localStorage.setItem('order', null);
  }

  /**
   * cartUpdateItems()
   * @param items - Items to store in localstorage cart
   */
  public cartUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    this._window.localStorage.setItem('cart', itemStr);
  }

  /**
   * orderHasItems()
   * * Returns boolean, if localstorage has items stored in order.
   */
  public orderHasItems(): boolean {
    return (this._window.localStorage.getItem('order') !== null);
  }

  /**
   * orderGetItems()
   * returns json object of all items in localstorage order
   */
  public orderGetItems(): any {
    if (this.orderHasItems()) {
      let order = this._window.localStorage.getItem('order');
      order = JSON.parse(order);
      return order;
    }
    return null;
  }

  /**
   * orderUpdateItems()
   * @param items - Items to store in localstorage order
   */
  public orderUpdateItems(items: any): void {
    const itemStr = JSON.stringify(items);
    this._window.localStorage.setItem('order', itemStr);
  }

}
