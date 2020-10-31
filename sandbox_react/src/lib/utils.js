import { curry } from 'ramda'

/**
 * Workaround for broken `findWhere` behavior for mounted components when searching by text
 * https://github.com/airbnb/enzyme/issues/1566
 */
const textContent = (node) => {
  try {
    // enzyme sometimes blows up on text()
    return node.text()
  } catch (_e) {
    return ''
  }
}

// useful for finding a node by its text
export const findByText = (text, wrapper, options = {}) => {
  if (!wrapper) throw new Error('Expected a wrapper but did not receive one')
  const comparator = options.exact
    ? (x) => textContent(x) === text
    : (x) => new RegExp(text).test(textContent(x))
  return wrapper
    .findWhere(comparator)
    .filterWhere((x) => x.html().startsWith('<'))
    .last()
}

export const sel = curry((dataTestId, wrapper) =>
  wrapper.find(`[data-test-id="${dataTestId}"]`)
)

export const simulateChange = (wrapper, value) => (
  wrapper.simulate('change', { target: { value } })
)
