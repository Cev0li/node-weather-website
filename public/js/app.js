console.log('Client side javascript is loaded.')

const weatherForm = document.querySelector('#weathersubmit')
const search = document.querySelector('#locationbutton')
const messageOne = document.querySelector('#messageone')
const messageTwo = document.querySelector('#messagetwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
    .then((response) => {
        response.json()
            .then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
    })
})


})