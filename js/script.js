$(document).ready(function () {
  // variabili per le chiamate
  var urlMovie = 'https://api.themoviedb.org/3/movie';
  var urlTv = 'https://api.themoviedb.org/3/tv';
  var urlSearch = 'https://api.themoviedb.org/3/search';
  var key = '970ca4d5163c44deb14f9f0d74373636';
  var popular = 'popular';
  var upcoming = 'upcoming';
  var topTv = 'top_rated'
  // -------------------------------------------------------
  animationInput();
  animationOption();
  cleanModal();
  changeFilmOrTv();
  infoBtnFilm(urlMovie, key);
  infoBtnTv(urlTv, key);
  search(urlSearch, key);
  callForSlider(urlMovie, key)
  callFilm(urlMovie, key, popular, printPopularFilm);
  callFilm(urlMovie, key, upcoming, printUpcomingFilm);
  callTv(urlTv, key, popular, printPopularTv);
  callTv(urlTv, key, topTv, printTopTv);

});//FINE READY



//////  FUNCTIONS  ///////

// Function for Animation
function animationInput() {
  $('.btn_search').mouseenter(function () {
    $('.input_box').animate({
      display: 'flex',
      width: '250px',
      height: '40px',
      padding: '5px 15px',
    }, 1500, function () {
      $('.input_box').css('border', '2px solid #2B2D42');
      $('.input').attr('placeholder', 'Film/Serie');
    });
  });
} // fine animationInput
function animationOption() {
  var close = true;
  $('.logo').click(function () {
    if (close == true) {
      $('.option').animate({
        width: '250px',
        height: '100vh',
        padding: '30px'
      });
      close = false;
    } else {
      $('.option').animate({
        width: '0',
        height: '0',
        padding: '0'
      });
      close = true;
    }
  });
} // fine animationOption
// ------------------------

// Function for clean
function cleanModal() {
  $(document).on('click', '.close', function () {
    $('.modal').css('display', 'none');
    $('.wrapper_modal').html('');
    $('.modal').html('');
    $('.cast').html('');
  });
} // fine cleanModal

// -----------------------
// Function for search
function changeFilmOrTv() {
  $('.list_option').click(function () {
    var thisOption = $(this).attr('id');
    if (thisOption == 'film') {
      $('.box_tv').hide();
      $('.tv_search').hide();
      $('.box_film').show();

    } else if (thisOption == 'serie') {
      $('.box_tv').show();
      $('.box_film').hide();
      $('.film_search').hide();

    } else if (thisOption == 'home') {
      $('.box_tv').show();
      $('.box_film').show();
    }
  });
} // fine changeFilmOrTv
function search(url, key) {
  $('.btn_search').click(function () {
    var inputVal = $('.nav_right').find('.input').val();
    $('.input').val('');
    $('.input_box').animate({
      width: '0',
      height: '0',
      padding: '0',
    }, 1500, function () {
      $('.input_box').css('border', 'none');
      $('.input').attr('placeholder', '');
    });
    searchMovie(url, key, inputVal);
    searchSeries(url, key, inputVal);
    $('.film_search').show();
    $('.tv_search').show();
    $('.container_film').html('');
    $('.container_tv').html('');
  });
  $('.input').keyup(function () {
    if (event.which == 13) {
      var inputVal = $('.nav_right').find('.input').val();
      $('.input').val('');
      $('.input_box').animate({
        width: '0',
        height: '0',
        padding: '0',
      }, 1500, function () {
        $('.input_box').css('border', 'none');
        $('.input').attr('placeholder', '');
      });
      searchMovie(url, key, inputVal);
      searchSeries(url, key, inputVal);
      $('.film_search').show();
      $('.tv_search').show();
      $('.container_film').html('');
      $('.container_tv').html('');
    }
  });
} // fine search
//---------------------------

// Function for event button
function infoBtnFilm(url, key) {
  $(document).on('click', '.btn_info_film', function () {
    var thisId = $(this).parent().parent().attr('id');
    infoFilm(url, key, thisId);
    castFilm(url, key, thisId);
  });
} // fine infoBtnFilm
function infoBtnTv(url, key) {
  $(document).on('click', '.btn_info_tv', function () {
    var thisId = $(this).parent().parent().attr('id');
    infoSerie(url, key, thisId);
    castTv(url, key, thisId);
  });
} // fine infoBtnTv


// -----------------------------

// Function call Ajax
function callForSlider(url, key) {
  $.ajax({
    url: url + '/now_playing',
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT',
    },
    success: function (data) {
      var results = data.results;
      printSlider(results);
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });

} // fine callForSlider
function callFilm(url, key, type, functions) {
  $.ajax({
    url: url + '/' + type,
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT',
    },
    success: function (data) {
      var results = data.results;
      functions(results);
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine callFilm
function callTv(url, key, type, functions) {
  $.ajax({
    url: url + '/' + type,
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT',
    },
    success: function (data) {
      var results = data.results;
      functions(results);
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine callTv
function searchMovie(url, key, valueInput) {
  $.ajax({
    url: url + '/movie',
    method: 'GET',
    data: {
      api_key: key,
      query: valueInput,
      language: 'it-IT',
    },
    success: function (data) {
      if (data.total_results > 0) {
        var results = data.results;
        printSearchFilm(results);
      } else {
        $('.film_search').find('h2').text('Non ci sono risultati');
      }


    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine searchMovie
function searchSeries(url, key, valueInput) {
  $.ajax({
    url: url + '/tv',
    method: 'GET',
    data: {
      api_key: key,
      query: valueInput,
      language: 'it-IT',
    },
    success: function (data) {
      if (data.total_results > 0) {
        var results = data.results;
        printSearchTv(results);
      } else {
        $('.tv_search').find('h2').text('Non ci sono risultati');
      }
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine searchSeries
function infoFilm(url, key, id) {
  $.ajax({
    url: url + '/' + id,
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT'
    },
    success: function (data) {
      var title = data.original_title;
      var source = $("#modal_template").html();
      var template = Handlebars.compile(source);
      var context = {
        title: title,
        tagline: data.tagline,
        overview: data.overview,
        poster_path: "https://image.tmdb.org/t/p/w342/" + data.poster_path,
        genres: data.genres,
      };
      var html = template(context);
      $('.wrapper_modal').append(html);
      $('.wrapper_modal').find('.modal').css('display', 'block');
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine infoFilm
function infoSerie(url, key, id) {
  $.ajax({
    url: url + '/' + id,
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT'
    },
    success: function (data) {
      var title = data.original_name;
      var source = $("#modal_template").html();
      var template = Handlebars.compile(source);
      var context = {
        title: title,
        season: data.season_number,
        overview: data.overview,
        poster_path: "https://image.tmdb.org/t/p/w342/" + data.poster_path,
        genres: data.genres,
      };
      var html = template(context);
      $('.wrapper_modal').append(html);
      $('.wrapper_modal').find('.modal').css('display', 'block');
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  });
} // fine infoSerie
function castFilm(url, key, id) {
  $.ajax({
    url: url + '/' + id + '/casts',
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT'
    },
    success: function (data) {
      var casts = data.cast;
      var actors = [];
      for (const actor of casts) {
        if (actor.order <= 5) {
          actors.push(actor);
        }
      }
      var source = $("#cast_template").html();
      var template = Handlebars.compile(source);
      var context = {
        cast: actors
      };
      var html = template(context);
      $('.modal_description').append(html);
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. ");
    }
  })
} // fine castFilm
function castTv(url, key, id) {
  $.ajax({
    url: url + '/' + id + '/credits',
    method: 'GET',
    data: {
      api_key: key,
      language: 'it-IT'
    },
    success: function (data) {
      var casts = data.cast;
      var actors = [];
      for (const actor of casts) {
        if (actor.order <= 5) {
          actors.push(actor);
        }
      }
      var source = $("#cast_template").html();
      var template = Handlebars.compile(source);
      var context = {
        cast: actors
      };
      var html = template(context);
      $('.modal_description').append(html);
    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + error);
    }
  })
} // fine castTv

// ----------------------------

// Function for Print
function printSlider(array) {
  for (let k = 0; k < array.length; k++) {
    const element = array[k];
    let overview;
    if (element.overview == 0) {
      overview = 'Trama al momento non disponibile' ;
    }else {
      overview = element.overview;
      
    }
    var numId = k;
    var source = $("#jumbo_template").html();
    var template = Handlebars.compile(source);
    var context = {
      'num_id': numId,
      'title': element.original_title,
      'overview': overview,
      'poster_path': "https://image.tmdb.org/t/p/w1280/" + element.backdrop_path,
    };
    var html = template(context);
    $('.swiper-wrapper').append(html);
    var swiper = new Swiper('.swiper-container', {
      speed: 1000,
      spaceBetween: 10,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
} // fine function
function printSearchFilm(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var thisId = thisTitle.id;
    var voteAvarege = Math.ceil(thisTitle.vote_average / 2);
    var path = thisTitle.poster_path;
    var source = $('#film_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisId,
      'title': thisTitle.original_title,
      'vote': printStar(voteAvarege),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + path,
    };
    // console.log(thisId);
    var html = template(context);
    $('.container_film').append(html);
  }
} // fine function
function printSearchTv(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var thisId = thisTitle.id;
    var voteAvarege = Math.ceil(thisTitle.vote_average / 2);
    var path = thisTitle.poster_path;
    var source = $('#tv_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisId,
      'title': thisTitle.original_name,
      'vote': printStar(voteAvarege),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + path,
    };
    // console.log(thisId);
    var html = template(context);
    $('.container_tv').append(html);
  }
} // fine function
function printPopularFilm(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var source = $('#film_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisTitle.id,
      'title': thisTitle.original_title,
      'vote': printStar(Math.ceil(thisTitle.vote_average / 2)),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + thisTitle.poster_path,
    };
    var html = template(context);
    $('.container_popular_film').append(html);
  }
} // fine function
function printUpcomingFilm(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var source = $('#film_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisTitle.id,
      'title': thisTitle.original_title,
      'vote': printStar(Math.ceil(thisTitle.vote_average / 2)),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + thisTitle.poster_path,
    };
    // console.log(thisId);
    var html = template(context);
    $('.container_upcoming_film').append(html);
  }
} // fine function
function printPopularTv(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var num = j;
    var thisId = thisTitle.id;
    var voteAvarege = Math.ceil(thisTitle.vote_average / 2);
    var path = thisTitle.poster_path;
    var source = $('#tv_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisId,
      'title': thisTitle.original_name,
      'vote': printStar(voteAvarege),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + path,
    };
    // console.log(thisId);
    var html = template(context);
    $('.container_popular_tv').append(html);
  }
} // fine function
function printTopTv(array) {
  for (let j = 0; j <= array.length; j++) {
    var thisTitle = array[j];
    var num = j;
    var thisId = thisTitle.id;
    var voteAvarege = Math.ceil(thisTitle.vote_average / 2);
    var path = thisTitle.poster_path;
    var source = $('#tv_template').html();
    var template = Handlebars.compile(source);
    var context = {
      'this_id': thisId,
      'title': thisTitle.original_name,
      'vote': printStar(voteAvarege),
      'overview': thisTitle.overview,
      'lang': flagLanguage(thisTitle.original_language),
      'poster_path': "https://image.tmdb.org/t/p/w185/" + path,
    };
    // console.log(thisId);
    var html = template(context);
    $('.container_top_tv').append(html);
  }
} // fine function
function printStar(vote) {
  var vote = vote;
  var stars = "";
  for (var i = 0; i < 5; i++) {
    // stars += '*';
    if (i < vote) {
      var stars = stars + " <i class='fas fa-star'></i>";
    } else {
      var stars = stars + "<i class='far fa-star'></i>";
    }
  }
  return stars
} // fine function 
function flagLanguage(flags) {
  var arrayFlags = ["de", "en", "es", "fr", "it", "zh", "ja", "us", "ko", "ur"]
  if (arrayFlags.includes(flags)) {
    var flag = "<img src=flags/" + flags + ".png>";
  } else {
    var flag = flags;
  }
  return flag
} // fine function


