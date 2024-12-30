// GlobalStore.js
import { BehaviorSubject } from 'rxjs';

export class GlobalStore {
  storeDetails = new BehaviorSubject({ counter: 0 });

  /**
   * Update the global store.
   * @param config - Object containing the updated state.
   */
  updateStore(config) {
    const currentState = this.storeDetails.value;
    const newState = { ...currentState, ...config };
    this.storeDetails.next(newState);
  }
}

// Create a singleton instance of GlobalStore
export const globalStore = new GlobalStore();