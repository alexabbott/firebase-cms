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
   * clearCart()
   * Clears:
   * - localstorage.cart
   * - localstorage.order
   */
  public clearCart(): void {
    this._window.localStorage.setItem('cart', null);
    this._window.localStorage.setItem('order', null);
  }

  /**
   * hasItems()
   * Returns boolean, if localstorage has items stored in cart.
   */
  public cartHasItems(): boolean {
    return (this._window.localStorage.getItem('cart') !== null);
  }

  /**
   * getItems()
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

}
