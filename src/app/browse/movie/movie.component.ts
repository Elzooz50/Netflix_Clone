import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // To get the movie ID from the route
import { MovieService } from '../../services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  movieId!: number;  // Variable to store the movie ID, retrieved from the route
  videoUrl: any = null;  // Holds the video URL for embedding the trailer
  movieService = inject(MovieService);  // Injects MovieService to fetch movie data
  domSanitizer = inject(DomSanitizer);  // Injects DomSanitizer to safely embed external content (YouTube videos)
  route = inject(ActivatedRoute);  // Injects ActivatedRoute to access route parameters (like movie ID)
  bannerMovie: any;  // Holds the movie object displayed in the banner
  popularMovies: any;  // Holds the list of popular movies

  ngOnInit() {
    // Fetches the popular movies when the component is initialized
    this.movieService.getPopularMovies().subscribe((result: any) => {
      if (result && result.results && result.results.length > 0) {
        this.popularMovies = result.results;  // Store the popular movies list
        this.bannerMovie = this.popularMovies[0];  // Assign the first movie as the banner movie

        // Log the banner movie for debugging
        console.log('Banner Movie:', this.bannerMovie);

        // Fetches the videos for the banner movie (e.g., trailers from YouTube)
        this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
          console.log('Video Response:', res);  // Log the video response for debugging

          // Finds the YouTube trailer video in the response
          const video = res.results.find((x: any) => x.site === 'YouTube' && x.type === 'Trailer');
          if (video) {
            this.bannerMovie.videoKey = video.key;  // Stores the YouTube video key for embedding
            console.log('Video Key:', this.bannerMovie.videoKey);  // Log the video key for debugging
          } else {
            console.error('No trailer found for the movie!');  // Log an error if no trailer is found
          }
        });
      }
    });
  }
}
