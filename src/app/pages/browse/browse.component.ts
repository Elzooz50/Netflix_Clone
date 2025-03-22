import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieCategoryComponent } from "../../components/movie-category/movie-category.component";
import { Movie } from '../../types/movies';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MovieCardComponent, MovieCategoryComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'] // Fixed typo in styleUrl
})
export class BrowseComponent {
private router = inject(Router);  // Injecting the Router service to handle navigation
movieService = inject(MovieService);  // Injecting the MovieService to fetch movie data
public domSanitizer = inject(DomSanitizer);  // For sanitizing URLs for safe video embedding

// Movie data arrays
popularMovies: Movie[] = [];  // List of popular movies
topRatedMovies: Movie[] = [];  // List of top-rated movies
nowPlayingMovies: Movie[] = [];  // List of currently playing movies
upcomingMovies: Movie[] = [];  // List of upcoming movies

// Banner and selected movie properties
bannerMovie!: Movie;  // The movie that will be displayed as the banner
selectedMovie: any;  // The currently selected movie

// Configuration and video-related properties
tmdbConfig: any;  // Configuration for TMDB (The Movie Database)
videoUrl: string | null = null;  // URL for playing the selected movie trailer
movieList: any;  // Generic list for movies

// Lifecycle hook: Runs when the component is initialized
ngOnInit() {
  // Fetch popular movies
  this.movieService.getPopularMovies().subscribe((result: any) => {
    console.log(result);  // Log the result for debugging
    this.popularMovies = result.results;  // Assign the popular movies to the array
    this.bannerMovie = this.popularMovies[0];  // Set the first popular movie as the banner

    // Fetch the video for the banner movie
    this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
      this.bannerMovie.videoKey = res.results.find((x: any) => x.site === 'YouTube').key;  // Get the YouTube video key
      console.log(this.bannerMovie);  // Log the banner movie for debugging
    });
  });

  // Fetch top-rated movies
  this.movieService.getTopRatedMovies().subscribe((result: any) => {
    this.topRatedMovies = result.results;
  });

  // Fetch currently playing movies
  this.movieService.getNowPlayingMovies().subscribe((result: any) => {
    this.nowPlayingMovies = result.results;
  });

  // Fetch upcoming movies
  this.movieService.getUpcomingMovies().subscribe((result: any) => {
    this.upcomingMovies = result.results;
  });
}

// Method to handle when a movie is selected
onMovieSelected(movie: Movie) {
  // Navigate to the movie's detailed page or trailer using the movie's ID
  this.router.navigate(['/movie', movie.id]);
}

// Method to handle playing the selected movie's trailer video
playVideo() {
  if (this.videoUrl) {
    console.log(`Playing video: ${this.videoUrl}`);  // Log the video URL for debugging
  }
}

// A tracking function used in the *ngFor loop to optimize rendering
trackByMovie(index: number, movie: Movie) {
  return movie.id;  // Return the movie's ID as a unique identifier
}

// Method to set the selected movie and trigger movie selection logic
selectMovie(movie: Movie) {
  this.selectedMovie = movie;  // Set the selected movie
  this.onMovieSelected(movie);  // Call the movie selection logic
}

// Placeholder for closing modal functionality (yet to be implemented)
closeModal() {
  throw new Error('Method not implemented.');
}
}

