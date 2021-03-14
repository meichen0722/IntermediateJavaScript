/**
 * Create a class `TempTracker`
 *
 * It has two methods:
 *
 *   setTemp: takes a single argument and sets the
 *            current temperature to the value of the argument.
 *
 *   getTemp: returns the last temperature set by
 *            the setTemp function.
 *
 */

export class TempTracker {
  constructor() {
    this._temp = 0
  }
  getTemp() {
    return this._temp
  }
  setTemp(temp) {
    this._temp = temp 
  }
}

/**
 * Create a class `AverageTempTracker`
 *
 * Offers the same functionality as `TempTracker`
 *
 * Additionally, it implements:
 *
 *   getAverageTemp: returns the average of temps that
 *                   have been set
 *
 */

export class AverageTempTracker extends TempTracker {
  constructor() {
    super()
    this._temps = []
  }
  setTemp(temp) {
    super.setTemp(temp)
    this._temps.push(temp)
  }
  getAverageTemp() {
    return this._temps.reduce((sum, temp) => sum + temp) / this._temps.length
  }
}

/**
 * Create a class `BoundedTempTracker`
 *
 * Implements functionality of `TempTracker`
 *
 * Additionally, it implements:
 *      setTemp: same as before, but it does not set the temp
 *               if it is greater than 100 or less than 0.
 *
 *      getTemp: same as before, but it tracks each time
 *               getTemp has been called
 *
 *      getTempReads: returns how many times `getTemp` has
 *                    been called
 *
 */

export class BoundedTempTracker extends TempTracker {
  constructor() {
    super()
    this._reads = 0
  }
  setTemp(temp) {
    if(temp < 100 && temp > 0) {
      this._temp = temp
    }
  }
  getTemp() {
    this._reads++
    return super.getTemp()  //RETURN!
  }
  getTempReads() {
    return this._reads
  }
}

export class Counter {
  /**
   * Step 1: Rewrite setting the initial state without
   * the `constructor` method.
   */
  // constructor() {
  //   this.counter = 1
  // }
  #counter = 1

  /**
   * Step 2: rewrite `this.counter` to use a private field
   *         so it can't be accessed outside the class.
   */
  tick() { return this.#counter++ }
}
