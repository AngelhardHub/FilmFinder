const getMovieListParent = document.getElementById("movieListContainer");
const getMovieFilters = document.querySelectorAll(".filterPreferences");
const getMovieSearchBar = document.getElementById("movieSearchBar");
const defaultFilmFilter = document.getElementById("latest-movies")

// Makes the film posters belonging to: 'Latest movies, 2014 or newer', default content
const makeNewMoviesDefault = defaultFilmFilter.checked = true;

// gets all available film titles in the DOM by creating and adding new elements to the DOM.
const addMoviesToDom = (movieContent) => {
    movieContent.forEach((movie) => {
        console.log(movie.title);
        const createLi = document.createElement("li")
        const createElementA = document.createElement("a");
        let getImdbID = movie.imdbID
        createElementA.href = `https://www.imdb.com/title/${getImdbID}/`
        createElementA.target = "_blank";
        const createMovieImg = document.createElement("img");
        createMovieImg.src = movie.poster;
        createMovieImg.classList.add("imgPoster");
        getMovieListParent.appendChild(createLi).appendChild(createElementA).appendChild(createMovieImg);
     })
};

// Filters movies released in 2014 or later
const getNewMovies = () => {
    const moviesNewerThen2014 = movies.filter((movie) => movie.year >= 2014);
    return moviesNewerThen2014;
    };

// Adds default content (films newer than 2014) to de DOM
addMoviesToDom(getNewMovies());

// Removes all currently displayed film content
const removeFilmPosterContent = () => {
    while (getMovieListParent.firstChild) {
     getMovieListParent.firstChild.remove();
    }
};

//Activates the filters for each of the 5 navigation options. After clicking one of the radiobutton selections.
Array.from(getMovieFilters).forEach((allFilters) => {
    allFilters.addEventListener("change", (filter) => {
        removeFilmPosterContent();
        // checks if the current filter is based on release year or on a film collection. Adds films based on their release year to the DOM.
        if (allFilters.nextElementSibling.classList.contains("latestMovies")) {
            addMoviesToDom(getNewMovies());
        } else {
            // filters film collections based on the collection filters. Adds the appropriate titles to the DOM.
            let findSelectedCollectionTitles = filter.target.value;
            console.log(findSelectedCollectionTitles);
            let getMovieCollection = movies.filter(film => film.title.includes(findSelectedCollectionTitles));
            addMoviesToDom(getMovieCollection);
         }    
    })
});

// Finds and displays movies based on the seachbox input
getMovieSearchBar.addEventListener("keypress", (searchEvent) => {
    if (searchEvent.key === "Enter") {
        let getSearchBarText = document.getElementById('movieSearchBar').value.toLocaleLowerCase();
        let displaySearchedMovies = movies.filter(film => film.title.toLocaleLowerCase().includes(getSearchBarText));
        console.log(displaySearchedMovies);
        removeFilmPosterContent();
        addMoviesToDom(displaySearchedMovies); 
     }
});


