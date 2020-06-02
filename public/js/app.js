const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let location = search.value
    let url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            } else {
                //console.log(data.forecast)
                //console.log(data.placeName)
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.placeName
            }
        })
    })
})