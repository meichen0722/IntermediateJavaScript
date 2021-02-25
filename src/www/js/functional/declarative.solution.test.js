import { pipe } from 'ramda'

describe('Declarative', () => {
  it('Rewrite from imperative to declarative', () => {
    const animals = ['bird', 'orangutan', 'monkey', 'cat', 'lionfish']

    const result4 = animals
      .filter(x => x.length > 4)
      .reverse()
      .map(x => x.concat('!'))
      .sort((a, b) => a.length < b.length ? -1 : 1)
      .join(' < ')

    expect(result4).toEqual('monkey! < lionfish! < orangutan!')
  })

  it('rewrite the declarative function using named functions and pipe', () => {
    const nums = [1, 2, 3, 4, 5]

    const add = (a, b) => a + b
    const sum = xs => xs.reduce(add)
    const double = x => x * 2

    const result3 = pipe(
      sum,
      x => nums.map(y => y + x),
      x => x.map(double)
    )(nums)

    expect(result3).toEqual([32, 34, 36, 38, 40])
  })
})
