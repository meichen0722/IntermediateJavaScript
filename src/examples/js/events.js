// section 1
{
  document.getElementById('click-type')
    .addEventListener('click', () => { console.log('clicked') })

  document.getElementById('change-type')
    .addEventListener('change', (e) => {
      console.log('change', e.target.value)
    })

  document.getElementById('checked-type')
    .addEventListener('change', (e) => {
      console.log('change', e.target.checked)
    })

  document.getElementById('keydown-type')
    .addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        console.log('=== You Pressed Enter! ===')
      } else {
        console.log('key', e.key, 'keydown', e.target.value)
      }
    })

  document.getElementById('submit-type')
    .addEventListener('submit', (e) => {
      e.preventDefault()
      console.log('submitting')
      const data = new FormData(e.currentTarget)
      for (const [name, value] of data.entries()) {
        console.log(`${name} = ${value}`)
      }
    })
}

// section 2
{
  document.getElementById('add-option')
    .addEventListener('click', () => {
      const ul = document.getElementsByTagName('ul')[0]
      const li = document.createElement('li')
      li.innerText = 'Option 4'
      ul.appendChild(li)
    })

  document.getElementById('add-to-li')
    .addEventListener('click', () => {
      // <<: multiple-handlers
      Array.from(document.getElementsByTagName('li'))
        .forEach((li, i) => {
          li.addEventListener('click', () => {
            console.log(`Clicked option ${i + 1}`)
          })
        })
      // :>>
    })

  document.getElementById('add-to-parent')
    .addEventListener('click', () => {
      // <<: parent-delegation
      const ul = document.getElementsByTagName('ul')[0]
      ul.addEventListener('click', (e) => {
        console.log(ul === e.currentTarget) // true
        console.log(`Clicked ${e.target.innerText}`)
      })
      // :>>
    })
}
