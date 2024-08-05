package com.show.show.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.show.show.models.AiringSchedule;
import com.show.show.models.Review;
import com.show.show.models.Show;
import com.show.show.repositories.AiringScheduleRepository;
import com.show.show.repositories.ReviewRepository;
import com.show.show.repositories.ShowRepository;
import java.util.List;
import java.util.Optional;

@Service // Marks this class as a Spring service component
public class ShowService {

    @Autowired // Injects the ShowRepository dependency
    private ShowRepository showRepository;
    
    @Autowired // Injects the AiringScheduleRepository dependency
    private AiringScheduleRepository airingScheduleRepository;
    
    @Autowired // Injects the ReviewRepository dependency
    private ReviewRepository reviewRepository;

    // Constructor for ShowService, mainly used for testing or specific configuration
    public ShowService(ShowRepository showRepository) {
        this.showRepository = showRepository;
    }

    // Retrieves all shows from the repository
    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    // Searches shows by name, genre, or network
    public List<Show> searchShows(String name, String genre, String network) {
        if (name != null && !name.isEmpty()) {
            return showRepository.findByName(name);
        } else if (genre != null && !genre.isEmpty()) {
            return showRepository.findByGenre(genre);
        } else if (network != null && !network.isEmpty()) {
            return showRepository.findByNetwork(network);
        } else {
            return showRepository.findAll();
        }
    }

    // Retrieves show details by ID
    public Show getShowDetails(Long id) {
        return showRepository.findById(id).orElse(null);
    }

    // Saves a new show to the repository
    public Show saveShow(Show show) {
        return showRepository.save(show);
    }
    
    // Retrieves a show by ID
    public Show getShowById(Long id) {
        Optional<Show> show = showRepository.findById(id);
        return show.orElse(null); // Return null if not found
    }
    
    // Updates an existing show
    public Show updateShow(Long id, Show show) {
        Show existingShow = showRepository.findById(id).orElse(null);
        existingShow.setName(show.getName());
        existingShow.setGenre(show.getGenre());
        existingShow.setNetwork(show.getNetwork());
        existingShow.setDescription(show.getDescription());
        return showRepository.save(existingShow);
    }
    
    // Retrieves all airing schedules from the repository
    public List<AiringSchedule> getAllAiringSchedules() {
        return airingScheduleRepository.findAll();
    }
    
    // Retrieves airing schedules for a specific show
    public List<AiringSchedule> getAiringSchedule(Long showId) {
        Show show = showRepository.findById(showId).orElse(null);
        if (show != null) {
            return show.getAiringSchedules();
        }
        return null;
    }
    
    // Saves a new airing schedule for a show
    public AiringSchedule saveAiringSchedule(Long showId, AiringSchedule airingSchedule) {
        Show show = showRepository.findById(showId).orElseThrow(() -> new RuntimeException("Show not found"));
        airingSchedule.setShow(show);
        return airingScheduleRepository.save(airingSchedule);
    }
    
    // Deletes a show by ID
    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }
    
    // Retrieves all reviews from the repository
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
    
    // Retrieves reviews for a specific show
    public List<Review> getReviews(Long showId) {
        Show show = showRepository.findById(showId).orElse(null);
        if (show != null) {
            return show.getReviews();
        }
        return null;
    }

    // Saves a new review for a show
    public Review saveReview(Long showId, Review review) {
        Show show = showRepository.findById(showId).orElseThrow(() -> new RuntimeException("Show not found"));
        review.setShow(show);
        return reviewRepository.save(review);
    }
    
    // Updates an existing review
    public Review updateReview(Long reviewId, Review review) {
        Review existingReview = reviewRepository.findById(reviewId).orElse(null);
        if (existingReview != null) {
            existingReview.setRating(review.getRating());
            existingReview.setComment(review.getComment());
            return reviewRepository.save(existingReview);
        }
        return null;
    }

    // Deletes a review by ID
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}