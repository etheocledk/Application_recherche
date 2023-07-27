/*============================== DISPLAY ALL COUNTRIE INFORMATION ==============================*/
async function Allcountrie() {
    let data = await fetch(`https://restcountries.com/v3.1/all`)
    let rest = await data.json()
    const displayCountrie = document.querySelector('.main__container__bottom')
    if (displayCountrie) {
        let itemTag = ``
        rest.forEach(item => {
            itemTag += `
            <div class="countrie__structure">
                <div class="countrie__structure__image">
                    <img src="${item.flags.svg}" alt="">
                </div>
                <div class="countrie__structure__text">
                    <p class="name-country">${item.name.common}</p>
                    <p><span class="name-details">Population: </span>${item.population}</p>
                    <p><span class="name-details">Region: </span>${item.region}</p>
                    <p><span class="name-details">Capital: </span>${item.capital}</p>
                </div>
            </div>`
        });
        displayCountrie.innerHTML = itemTag
    }

    /*================= INPUT SEARCH ==================*/
    let searchInput = document.querySelector('.main__container__top__input input')
    if (searchInput) {
        searchInput.addEventListener('keyup', () => {
            let optionValue = document.querySelector('.main__container__top__select__title .filter__name .select__field')
            optionValue.textContent = 'Filter By Region'
            let inputValue = searchInput.value.toLowerCase()
            let searchFilter = rest.filter(post => post.name.common.toLowerCase().includes(inputValue))
            let newCountry = ``
            searchFilter.forEach(item => {
                newCountry += `
            <div class="countrie__structure">
                <div class="countrie__structure__image">
                    <img src="${item.flags.svg}" alt="">
                </div>
                <div class="countrie__structure__text">
                    <p class="name-country">${item.name.common}</p>
                    <p><span class="name-details">Population: </span>${item.population}</p>
                    <p><span class="name-details">Region: </span>${item.region}</p>
                    <p><span class="name-details">Capital: </span>${item.capital}</p>
                </div>
            </div>`
            })
            displayCountrie.innerHTML = newCountry
            let allCountrie = document.querySelectorAll('.countrie__structure')
            if (allCountrie) {
                allCountrie.forEach(item => {
                    item.addEventListener('click', () => {
                        let countrieNameBalise = item.querySelector('.name-country')
                        let countrieName = countrieNameBalise.textContent
                        let countrieFilter = rest.filter(post => post.name.common === countrieName)
                        console.log(countrieFilter);

                        let Namecountrie = countrieFilter[0].name.common
                        let population = countrieFilter[0].population
                        let region = countrieFilter[0].region
                        let capital = countrieFilter[0].capital[0]
                        let countrieImg = countrieFilter[0].flags.svg
                        let subregion = countrieFilter[0].subregion
                        let boder = countrieFilter[0].borders
                        let level = countrieFilter[0].tld[0].slice(1, countrieFilter[0].tld[0].lenght)
                        let native = countrieFilter[0].translations.nld.common
                        let val = Object.values(countrieFilter[0].currencies)[0].name
                        let languages = Object.values(countrieFilter[0].languages)
                        console.log(boder);

                        let tab = []
                        const objete = {
                            countrieImg: countrieImg,
                            capital: capital,
                            region: region,
                            population: population,
                            Namecountrie: Namecountrie,
                            subregion: subregion,
                            boders: boder,
                            level: level,
                            native: native,
                            val: val,
                            languages: languages,
                        }
                        tab.push(objete)
                        localStorage.setItem('information', JSON.stringify(tab))

                        window.open('show.html')
                    })
                })
            }

            let darkBtn = document.querySelector('.header__container__right')
            if (darkBtn) {
                darkBtn.addEventListener('click', () => {
                    let countrie__structure = document.querySelectorAll('.countrie__structure')
                    let body = document.querySelector('body')
                    let headerColor = document.querySelector('.header__container')
                    let input = document.querySelector('.main__container__top .main__container__top__input input')
                    let inputFilter = document.querySelector('.main__container__top__select__title .filter__name')
                    let inputFilterSelect = document.querySelector('.main__container__top__select__option')


                    if (!body.classList.contains('active')) {
                        body.classList.add('active')
                        headerColor.classList.add('active')

                        input.classList.add('active')
                        inputFilter.classList.add('active')
                        inputFilterSelect.classList.add('activ')
                        countrie__structure.forEach(item => {
                            item.classList.add('active')
                        })

                    } else {
                        body.classList.remove('active')
                        headerColor.classList.remove('active')
                        input.classList.remove('active')
                        inputFilter.classList.remove('active')
                        inputFilterSelect.classList.remove('activ')
                        countrie__structure.forEach(item => {
                            item.classList.remove('active')
                        })
                    }
                })
            }
        })

    }

    /*=================== SELECT FIELD  MODIFICATION =================*/
    let filterName = document.querySelector('.main__container__top__select__title .filter__name')
    if (filterName) {
        filterName.addEventListener('click', () => {
            let optionDiv = document.querySelector('.main__container__top__select__option')
            if (!optionDiv.classList.contains('active')) {
                optionDiv.classList.add('active')
            } else {
                optionDiv.classList.remove('active')
            }
        })
    }


    let option = document.querySelectorAll('.main__container__top__select__option p')
    if (option) {
        option.forEach(item => {
            item.addEventListener('click', () => {
                let optionDiv = document.querySelector('.main__container__top__select__option')
                let optionValue = document.querySelector('.main__container__top__select__title .filter__name .select__field')
                if (item.textContent === '...') {
                    optionValue.textContent = 'Filter By Region'
                    let showItem = ``
                    rest.forEach(item => {
                        showItem += `
                 <div class="countrie__structure">
                     <div class="countrie__structure__image">
                         <img src="${item.flags.svg}" alt="">
                     </div>
                     <div class="countrie__structure__text">
                         <p class="name-country">${item.name.common}</p>
                         <p><span class="name-details">Population: </span>${item.population}</p>
                         <p><span class="name-details">Region: </span>${item.region}</p>
                         <p><span class="name-details">Capital: </span>${item.capital}</p>
                     </div>
                 </div>
               `
                    })
                    displayCountrie.innerHTML = showItem
                } else {
                    optionValue.textContent = item.textContent
                    let searchRegion = rest.filter(post => post.region.toLowerCase().includes(item.textContent.toLowerCase()))
                    let showItem = ``
                    searchRegion.forEach(item => {
                        showItem += `
                 <div class="countrie__structure">
                     <div class="countrie__structure__image">
                         <img src="${item.flags.svg}" alt="">
                     </div>
                     <div class="countrie__structure__text">
                         <p class="name-country">${item.name.common}</p>
                         <p><span class="name-details">Population: </span>${item.population}</p>
                         <p><span class="name-details">Region: </span>${item.region}</p>
                         <p><span class="name-details">Capital: </span>${item.capital}</p>
                     </div>
                 </div>`
                    })
                    displayCountrie.innerHTML = showItem
                }

                let allCountrie = document.querySelectorAll('.countrie__structure')
                if (allCountrie) {
                    allCountrie.forEach(item => {
                        item.addEventListener('click', () => {
                            let countrieNameBalise = item.querySelector('.name-country')
                            let countrieName = countrieNameBalise.textContent
                            let countrieFilter = rest.filter(post => post.name.common === countrieName)
                            console.log(countrieFilter);

                            let Namecountrie = countrieFilter[0].name.common
                            let population = countrieFilter[0].population
                            let region = countrieFilter[0].region
                            let capital = countrieFilter[0].capital[0]
                            let countrieImg = countrieFilter[0].flags.svg
                            let subregion = countrieFilter[0].subregion
                            let boder = countrieFilter[0].borders
                            let level = countrieFilter[0].tld[0].slice(1, countrieFilter[0].tld[0].lenght)
                            let native = countrieFilter[0].translations.nld.common
                            let val = Object.values(countrieFilter[0].currencies)[0].name
                            let languages = Object.values(countrieFilter[0].languages)
                            let tab = []
                            const objete = {
                                countrieImg: countrieImg,
                                capital: capital,
                                region: region,
                                population: population,
                                Namecountrie: Namecountrie,
                                subregion: subregion,
                                boders: boder,
                                level: level,
                                native: native,
                                val: val,
                                languages: languages,
                            }
                            tab.push(objete)
                            localStorage.setItem('information', JSON.stringify(tab))
                            window.open('show.html')
                        })
                    })
                }
                let darkBtn = document.querySelector('.header__container__right')
                if (darkBtn) {
                    darkBtn.addEventListener('click', () => {
                        let countrie__structure = document.querySelectorAll('.countrie__structure')
                        let body = document.querySelector('body')
                        let headerColor = document.querySelector('.header__container')
                        let input = document.querySelector('.main__container__top .main__container__top__input input')
                        let inputFilter = document.querySelector('.main__container__top__select__title .filter__name')
                        let inputFilterSelect = document.querySelector('.main__container__top__select__option')
                        if (!body.classList.contains('active')) {
                            body.classList.add('active')
                            headerColor.classList.add('active')
                            input.classList.add('active')
                            inputFilter.classList.add('active')
                            inputFilterSelect.classList.add('activ')
                            countrie__structure.forEach(item => {
                                item.classList.add('active')
                            })
                        } else {
                            body.classList.remove('active')
                            headerColor.classList.remove('active')
                            input.classList.remove('active')
                            inputFilter.classList.remove('active')
                            inputFilterSelect.classList.remove('activ')
                            countrie__structure.forEach(item => {
                                item.classList.remove('active')
                            })
                        }
                    })
                }
                if (optionDiv.classList.contains('active')) {
                    optionDiv.classList.remove('active')
                }
            })
        })
    }

    /*================= SHOW ALL COUNTRIE ==================*/
    let allCountrie = document.querySelectorAll('.countrie__structure')
    if (allCountrie) {
        allCountrie.forEach(item => {
            item.addEventListener('click', () => {
                let countrieNameBalise = item.querySelector('.name-country')
                let countrieName = countrieNameBalise.textContent
                let countrieFilter = rest.filter(post => post.name.common === countrieName)
                let Namecountrie = countrieFilter[0].name.common
                let population = countrieFilter[0].population
                let region = countrieFilter[0].region
                let capital = countrieFilter[0].capital[0]
                let countrieImg = countrieFilter[0].flags.svg
                let subregion = countrieFilter[0].subregion
                let boder = countrieFilter[0].borders
                let level = countrieFilter[0].tld[0].slice(1, countrieFilter[0].tld[0].lenght)
                let native = countrieFilter[0].translations.nld.common
                let val = Object.values(countrieFilter[0].currencies)[0].name
                let languages = Object.values(countrieFilter[0].languages)
                let tab = []
                const objete = {
                    countrieImg: countrieImg,
                    capital: capital,
                    region: region,
                    population: population,
                    Namecountrie: Namecountrie,
                    subregion: subregion,
                    boders: boder,
                    level: level,
                    native: native,
                    val: val,
                    languages: languages,
                }
                tab.push(objete)
                localStorage.setItem('information', JSON.stringify(tab))
                window.open('show.html', "myWindow")
            })
        })
    }  
}
Allcountrie()



