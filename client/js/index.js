
// Actions
const button = document.querySelector('.btn')
const inputElement = document.querySelector('.input')
// Error
const error = document.querySelector('.error')

// Containers
const imageContainer = document.querySelector('.image-container');
const characterName = document.querySelector('.name');
const height = document.querySelector('.height');
const mass = document.querySelector('.mass');
const hairColor = document.querySelector('.hair-color');
const eyeColor = document.querySelector('.eye-color');
const birthYear = document.querySelector('.birth-year');
const flexContainer = document.querySelector('.flex-container-none')

// Values
let inputValue = null

// Queries
async function getPerson() {
    let data = await axios.post(`http://localhost:5000/`, { name: inputValue });

    return data;
}

// Listeners
inputElement.addEventListener('input', (event) => {
    inputValue = event.target.value
})

button.addEventListener('click', async (event) => {
    
    try {
        let query = await getPerson()

        const img = document.createElement("img")

        if (imageContainer.children.length !== 0) { 
            let child = imageContainer.lastElementChild
            imageContainer.removeChild(child)
            imageContainer.appendChild(img)
            img.setAttribute('src', query.data.imageURL)
        } else {
            imageContainer.appendChild(img)
            img.setAttribute('src', query.data.imageURL)
        }

        characterName.innerHTML = `Name: ${query.data.person.name}`
        height.innerHTML = `Height: ${query.data.person.height}`
        mass.innerHTML = `Weight: ${query.data.person.mass}`
        hairColor.innerHTML = `Hair color: ${query.data.person.hair_color}`
        eyeColor.innerHTML = `Eye color: ${query.data.person.eye_color}`
        birthYear.innerHTML = `Birth year: ${query.data.person.birth_year}`

        if (flexContainer.classList.contains('flex-container-none')) {
            flexContainer.classList.remove('flex-container-none')
            flexContainer.classList.add('flex-container')
        }
        
    } catch (e) {
        flexContainer.classList.remove('flex-container')
        flexContainer.classList.add('flex-container-none')
        error.classList.toggle('error-active')
    }

})

if ("" == document.cookie)
{ // Инициализация cookie.
 setCookie(1);
 console.log('Первое посещение сайта')
}
else {
   var cookies = parseCookie();
   // Вывод приветствия, числа посещений и увеличение числа посещений на 1.
   console.log("Мы снова рады видеть Вас на моем сайте! Число лично ваших посещений - " + cookies.visits++ + " !");
   // Вывод даты последнего посещения.
   console.log("Последний раз Вы были у меня на сайте: " + cookies.LastVisit + ".");
   // Обновление cookie.
   setCookie(isNaN(cookies.visits) ? 1 : cookies.visits);
}