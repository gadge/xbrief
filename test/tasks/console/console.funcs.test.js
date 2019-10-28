

it('console: test', () => {
  const label = 'something'

  /**
   * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
   * When `stdout` is not a TTY, this method does nothing.
   */
  console.clear()
  /**
   * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
   */
  console.count(label)
  /**
   * Resets the internal counter specific to `label`.
   */
  console.countReset(label)
  /**
   * The `console.debug()` function is an alias for {@link console.log()}.
   */
  console.debug(label)
  /**
   * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
   * This function bypasses any custom `inspect()` function defined on `obj`.
   */
  console.dir(label)
  /**
   * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
   */
  console.dirxml(new Map([['foo', 1], ['bar', 2]]))
  /**
   * Prints to `stderr` with newline.
   */
  console.error(label)
  /**
   * Increases indentation of subsequent lines by two spaces.
   * If one or more `label`s are provided, those are printed first without the additional indentation.
   */
  console.group(label, label)
  /**
   * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
   */
  console.groupCollapsed(label, label)
  /**
   * Decreases indentation of subsequent lines by two spaces.
   */
  console.groupEnd()
  /**
   * The {@link console.info()} function is an alias for {@link console.log()}.
   */
  console.info(label)
  /**
   * Prints to `stdout` with newline.
   */
  console.log(label)
  /**
   * This method does not display anything unless used in the inspector.
   *  Prints to `stdout` the array `array` formatted as a table.
   */
  console.table(label)
  /**
   * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
   */
  console.time(label)
  /**
   * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
   */
  console.timeEnd(label)
  /**
   * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
   */
  console.timeLog(label)
  // /**
  //  * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
  //  */
  // console.trace(label)
  /**
   * The {@link console.warn()} function is an alias for {@link console.error()}.
   */
  console.warn(label)

  /**
   * This method does not display anything unless used in the inspector.
   *  Starts a JavaScript CPU profile with an optional label.
   */
  console.profile(label)
  /**
   * This method does not display anything unless used in the inspector.
   *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
   */
  console.profileEnd(label)
  /**
   * This method does not display anything unless used in the inspector.
   *  Adds an event with the label `label` to the Timeline panel of the inspector.
   */
  console.timeStamp(label)
})

