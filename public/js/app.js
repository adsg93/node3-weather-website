const weatherForm = document.querySelector('form')
const element = (id) => {
    return document.getElementById(id)
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //saving form data in LocData object
    let locData = {
        location: element('location').value,
        Units: element('c').checked === true ? element('c').value : element('f').value
    }

    //create fetch url
    let url = '/weather?address=' + encodeURIComponent(locData.location)

    //loading message
    element('one').textContent = 'loading!'

    //fetch data from url
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                element('one').textContent = 'Error : ' + data.error
                element('two').textContent = ''
            } else {
                element('one').textContent = 'Place : ' + data.place
                element('two').textContent = 'currentTemp : ' + data.currentTemp
            }
        })
    })
})