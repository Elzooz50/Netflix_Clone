import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../types/movies';
import { tmdbConfig } from '../../constants/config';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;  // Accepts a movie object from the parent component as an input
  tmdbConfig = tmdbConfig;  // Config object for accessing TMDB API URLs (e.g., image paths)
  @Output() movieSelected = new EventEmitter<any>();  // Outputs an event when the movie is clicked
bannerMovie: any;

  // This method is triggered when the movie card is clicked
  onClick() {
    this.movieSelected.emit(this.movie);  // Emits the selected movie object as an event
  }
}
