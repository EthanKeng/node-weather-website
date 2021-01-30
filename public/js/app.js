const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherUrl = "/weather?address=" 

// messageOne.textContent = 'Test from JS '
// messageTwo.textContent = ' '

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchTerm.value
    
    messageOne.textContent = 'Loading weather data... '
    messageTwo.textContent = ' '

    fetch(weatherUrl+location).then((response) => {
        response.json().then((data)=>{
            // console.log(data)
            if (data.error) {
                messageOne.textContent = data.error
            } else {

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            
            }
        })
    })
})



// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })    
// })
