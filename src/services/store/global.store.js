// GlobalStore.js
import { BehaviorSubject } from 'rxjs';
import { GLOBAL_STORE_OBJECT } from '../constants.service';

export class GlobalStore {
  storeDetails = new BehaviorSubject({ ...JSON.parse(JSON.stringify(GLOBAL_STORE_OBJECT)) });

  /**
   * Update the global store.
   * @param config - Object containing the updated state.
   */
  updateStore = (config) => {
    const currentState = this.storeDetails.value;
    const newState = { ...currentState, ...config };
    this.storeDetails.next(newState);
  }

  /**
   * Reset store to default
   * @param {*} 
   */
  resetStore = () => {
    const currentState = JSON.parse(JSON.stringify(GLOBAL_STORE_OBJECT));
    this.storeDetails.next(currentState);
  }
}

// Create a singleton instance of GlobalStore
export const globalStore = new GlobalStore();