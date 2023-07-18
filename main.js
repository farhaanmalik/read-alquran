const container = document.getElementById("container");
const surahdetails = document.getElementById("surah");
const loader = document.getElementById("loader")

//Fetching Lists of Surah
const getSurahLists = () => {
  let url = "https://api.alquran.cloud/v1/surah";
  loader.style.display = "block"
  fetch(url)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      let ihtml = "";
      for (let lists in response.data) {
        const data = response.data[lists];
        // console.log(data);
        loader.style.display = "none"

        const { number, englishName, name, revelationType, englishNameTranslation, numberOfAyahs } = data;
        ihtml += `<div class="card px-3 bg-light shadow-sm text-dark-emphasis">
        <div class="card-body p-0 pt-2">
            <h5 class="text-dark-emphasis">Chapter-${number}</h5>
            <div class="d-flex justify-content-between">
                <h6>${englishName}</h6>
                <h6>${name}</h6>
            </div>
            <div class="d-flex justify-content-between">
                <p>${revelationType}</p>
                <p>"${englishNameTranslation}"</p>
            </div>
            <div class="d-flex justify-content-between align-items-baseline">
                <p class="text-secondary">Verses: ${numberOfAyahs}</p>
                <button class="btn btn-outline-primary btn-sm"onclick={getSurahNumber(${number})}>Read Now</button>
            </div>
        </div>
    </div>`;
      }
      container.innerHTML = ihtml;
    })
    .catch(err => console.error(err));
}
getSurahLists()


//Fetching data for single surah on Click 
getSurahNumber = (number) => {
  let url = `https://api.alquran.cloud/v1/surah/${number}`;

  container.innerHTML = ""
  loader.style.display = "block";  //showing loader while fetching data

  fetch(url)
    .then(response => response.json())
    .then(response => {
      const data = response.data;
      document.title = data.englishName + " - " + data.name;  //Changing title of the Surah
      loader.style.display = "none";  //hiding loader when data fetched

      englishName.innerHTML = "Surah " + data.englishName;
      arabicName.innerHTML = data.name;
      revelation.innerHTML = data.revelationType;
      englishNameTranslation.innerHTML = data.englishNameTranslation;

      const verses = data.ayahs;
      // console.log(verses);
      let ihtml = "";
      for (let item in verses) {
        const verse = verses[item];
        ihtml += `<li class="list-group-item bg-light">
        <span>${data.number}:${verse.numberInSurah}</span>
                <p class="verse">${verse.text}</p>
          </li>
        `;
      }
      surahdetails.innerHTML = ihtml;
    })
    .catch(err => console.error(err));
}  
