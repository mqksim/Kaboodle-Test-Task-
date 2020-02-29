const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');


gulp.task('sass-compile', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./ '))
        .pipe(gulp.dest('./css/'))
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
});


let json = [{
    "id": 1,
    "title": "Le fabuleux destin d'AmГ©lie Poulain",
    "year": 2001,
    "director": "Jean-Pierre Jeunet",
    "writer": "Jean-Pierre Jeunet",
    "poster": "https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
    "genres": ["Comedy", "Romance"],
    "type": "Movie",
    "rank": 10,
    "likes_count": 20,
    "comments_count": 20,
    "link": "https://en.wikipedia.org/wiki/Am%C3%A9lie",
    "content": "AmГ©lie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love."
}, {
    "id": 2,
    "title": "How I Met Your Mother",
    "year": 2005,
    "director": "Pamela Fryman",
    "writer": "Pamela Fryman",
    "poster": "https://images-na.ssl-images-amazon.com/images/I/714sjR7EipL._SY679_.jpg",
    "genres": ["Sitcom", "Romantic comedy"],
    "type": "TV-Show",
    "rank": 9,
    "likes_count": 50,
    "comments_count": 50,
    "link": "https://en.wikipedia.org/wiki/How_I_Met_Your_Mother",
    "content": "The story goes into a flashback and starts in 2005 with a 27-year-old Ted Mosby living in New York City and working as an architect; the narrative deals primarily with his best friends"
}, {
    "id": 3,
    "title": "Friends",
    "year": 1994,
    "director": "David Crane",
    "writer": "David Crane",
    "poster": "https://loadtv.biz/wp-content/uploads/2013/07/Friends-NBC-season-10-2004-poster.jpg",
    "genres": ["Sitcom"],
    "type": "TV-Show",
    "likes_count": 5,
    "comments_count": 5,
    "expectations_count": 10,
    "link": "https://en.wikipedia.org/wiki/Friends",
    "content": "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan. Rachel Green, Ross Geller, Monica Geller, Joey Tribbiani, Chandler Bing and Phoebe Buffay..."
}, {
    "id": 4,
    "title": "Otto e mezzo",
    "year": 1963,
    "director": "Federico Fellini",
    "writer": "Federico Fellini",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTQ4MTA0NjEzMF5BMl5BanBnXkFtZTgwMDg4NDYxMzE@._V1_SY1000_CR0,0,719,1000_AL_.jpg",
    "genres": ["Drama"],
    "type": "Movie",
    "rank": 9,
    "likes_count": 3,
    "comments_count": 3,
    "content": "A harried movie director retreats into his memories and fantasies."
}, {
    "id": 5,
    "title": "Pierrot le fou",
    "year": 1965,
    "director": "Jean-Luc Godard",
    "writer": "Jean-Luc Godard",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTQ0OTc4MDcxMl5BMl5BanBnXkFtZTgwNjIzMjA0NzE@._V1_SY1000_CR0,0,742,1000_AL_.jpg",
    "genres": ["Crime", "Drama", "Romance"],
    "type": "Movie",
    "rank": 7,
    "likes_count": 2,
    "comments_count": 2,
    "link": "https://en.wikipedia.org/wiki/Pierrot_le_Fou",
    "content": "Pierrot escapes his boring society and travels from Paris to the Mediterranean Sea with Marianne, a girl chased by hit-men from Algeria. They lead an unorthodox life, always on the run."
}, {
    "id": 6,
    "title": "La rГЁgle du jeu",
    "year": 1939,
    "director": "Jean Renoir",
    "writer": "Jean Renoir",
    "poster": "https://m.media-amazon.com/images/M/MV5BYTE4NjYxMGEtZmQxZi00YWVmLWJjZTctYTJmNDFmZGEwNDVhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,721,1000_AL_.jpg",
    "genres": ["Comedy", "Drama"],
    "type": "Movie",
    "likes_count": 0,
    "comments_count": 0,
    "expectations_count": 5,
    "link": "https://en.wikipedia.org/wiki/The_Rules_of_the_Game",
    "content": "A bourgeois life in France at the onset of World War II, as the rich and their poor servants meet up at a French chateau."
}, {
    "id": 7,
    "title": "Les quatre cents coups",
    "year": 1959,
    "director": "FranГ§ois Truffaut",
    "writer": "FranГ§ois Truffaut",
    "poster": "https://m.media-amazon.com/images/M/MV5BYTQ4MjA4NmYtYjRhNi00MTEwLTg0NjgtNjk3ODJlZGU4NjRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,753,1000_AL_.jpg",
    "genres": ["Crime", "Drama"],
    "type": "Movie",
    "rank": 5,
    "likes_count": 5,
    "comments_count": 5,
    "link": "https://en.wikipedia.org/wiki/The_400_Blows",
    "content": "A young boy, left without attention, delves into a life of petty crime."
}]