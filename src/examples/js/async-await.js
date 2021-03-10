/******************************************************************************/
// Define `fetch' for Node.js:
function fetch() {
  let json = () => Promise.resolve({})
  return Promise.resolve({ json })
}

/******************************************************************************/
// <<: async
async function example() {
  return 'Hello World'
}

example().then(function (str) {
  console.log(str) // "Hello World"
})
// :>>

/******************************************************************************/
// <<: await
async function example2() {
  let str = await example()
  console.log(str) // "Hello World"
}
// :>>

let x = example2()
console.assert(x instanceof Promise)
x.then(y => console.assert(y === undefined))

/******************************************************************************/
// <<: getArtist
async function getArtist() {
  try {
    const { data: artist } = await axios.get('/api/artists/1')

    const { data: albums } = await axios.get('/api/artists/1/albums')
    artist.albums = albums

    return artist
  } catch (e) {
    // Rejected promises throw exceptions
    // when using `await'.
  }
}
// :>>

let p = getArtist()
console.assert(p instanceof Promise)
p.then(o => console.assert(o.albums))

/******************************************************************************/
// <<: getArtistP
async function getArtistP() {
  // Kick off two requests in parallel:
  const p1 = axios.get('/api/artists/1').then(res => res.data)
  const p2 = axios.get('/api/artists/1/albums').then(res => res.data)

  // Wait for both requests to finish:
  const [artist, albums] = await Promise.all([p1, p2])

  artist.albums = albums
  return artist
}
// :>>

let p1 = getArtistP()
console.assert(p1 instanceof Promise)
p1.then(o => console.assert(o.albums))
