package com.show.show.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.show.show.models.AiringSchedule;
import com.show.show.models.Review;
import com.show.show.models.Show;
import com.show.show.services.ShowService;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController // Marks this class as a REST controller
public class ShowController {

    @Autowired // Injects the ShowService dependency
    private ShowService showService;

    // Endpoint to get all shows
    @GetMapping("/shows")
    public List<Show> getAllShows() {
        return showService.getAllShows();
    }

    // Endpoint to search shows by name, genre, or network
    @GetMapping("/shows/search")
    public ResponseEntity<List<Show>> searchShows(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String genre,
        @RequestParam(required = false) String network
    ) {
        return ResponseEntity.ok(showService.searchShows(name, genre, network));
    }

    // Endpoint to get show details by ID
    @GetMapping("/shows/{id}")
    public ResponseEntity<ShowDetailsResponse> getShowDetails(@PathVariable Long id) {
        Show show = showService.getShowDetails(id);
        if (show != null) {
            ShowDetailsResponse response = new ShowDetailsResponse(show, show.getAverageRating());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to save a new show with multipart file for image
    @PostMapping("/shows")
    public ResponseEntity<Show> saveShow(@RequestParam("name") String name,
                                         @RequestParam("genre") String genre,
                                         @RequestParam("network") String network,
                                         @RequestParam("description") String description,
                                         @RequestParam("image") MultipartFile image) {
        try {
            System.out.println("Received request to save show");
            System.out.println("Name: " + name);
            System.out.println("Genre: " + genre);
            System.out.println("Network: " + network);
            System.out.println("Description: " + description);
            System.out.println("Image: " + (image != null ? image.getOriginalFilename() : "No Image"));

            Show show = new Show();
            show.setName(name);
            show.setGenre(genre);
            show.setNetwork(network);
            show.setDescription(description);
            show.setImage(image.getBytes());

            Show savedShow = showService.saveShow(show);
            System.out.println("Show saved successfully with ID: " + savedShow.getId());
            return ResponseEntity.ok(savedShow);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint to get the image of a show by ID
    @GetMapping("shows/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Show show = showService.getShowById(id);
        if (show == null || show.getImage() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(show.getImage(), headers, HttpStatus.OK);
    }

    // Endpoint to delete a show by ID
    @DeleteMapping("/shows/{id}")
    public ResponseEntity<String> deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return ResponseEntity.ok("Deleted successfully!");
    }

    // Endpoint to update a show by ID
    @PutMapping("/shows/{id}")
    public ResponseEntity<Show> updateShow(@PathVariable Long id, @RequestBody Show show) {
        Show updatedShow = showService.updateShow(id, show);
        return ResponseEntity.ok(updatedShow);
    }

    // Endpoint to get all airing schedules
    @GetMapping("/shows/airing-schedule")
    public List<AiringScheduleResponse> getAllAiringSchedules() {
        // Retrieve all airing schedules from the service layer
        return showService.getAllAiringSchedules()
                          // Convert the list of AiringSchedule objects to a stream
                          .stream()
                          // Map each AiringSchedule object to an AiringScheduleResponse object
                          .map(schedule -> {
                              // Get the associated Show object from the AiringSchedule
                              Show show = schedule.getShow();
                              // Create a new AiringScheduleResponse object using the details from the AiringSchedule and Show
                              return new AiringScheduleResponse(schedule.getId(), show.getName(), schedule.getAirDate(), schedule.getEpisodeNumber());
                          })
                          // Collect the results of the map operation back into a List
                          .collect(Collectors.toList());
    }

    // Endpoint to get airing schedule by show ID
    @GetMapping("/shows/airing-schedule/{id}")
    public ResponseEntity<List<AiringSchedule>> getAiringSchedule(@PathVariable Long id) {
        List<AiringSchedule> airingSchedule = showService.getAiringSchedule(id);
        if (airingSchedule != null) {
            return ResponseEntity.ok(airingSchedule);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to save a new airing schedule for a show
    @PostMapping("/shows/airing-schedule/{showId}")
    public ResponseEntity<AiringSchedule> saveAiringSchedule(@PathVariable Long showId,
                                                             @RequestBody AiringSchedule airingSchedule) {
        Show show = showService.getShowDetails(showId);
        if (show != null) {
            airingSchedule.setShow(show);
            // Assuming airingSchedule comes with episodeNumber already set
            AiringSchedule savedAiringSchedule = showService.saveAiringSchedule(showId, airingSchedule);
            return new ResponseEntity<>(savedAiringSchedule, HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to get all reviews
    @GetMapping("/shows/reviews")
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        List<Review> reviews = showService.getAllReviews();
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(review -> new ReviewResponse(review.getId(), review.getRating(), review.getComment(), review.getShowId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(reviewResponses);
    }

    // Endpoint to get reviews by show ID
    @GetMapping("/shows/reviews/{id}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long id) {
        List<Review> reviews = showService.getReviews(id);
        if (reviews != null) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to save a new review for a show
    @PostMapping("/shows/reviews/{id}")
    public ResponseEntity<Review> saveReview(@PathVariable Long id, @RequestBody Review review) {
        Show show = showService.getShowDetails(id);
        if (show != null) {
            review.setShow(show);
            // Set user if needed
            Review savedReview = showService.saveReview(id, review);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update a review by ID
    @PutMapping("/shows/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody Review review) {
        Review updatedReview = showService.updateReview(reviewId, review);
        if (updatedReview != null) {
            return ResponseEntity.ok(updatedReview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a review by ID
    @DeleteMapping("/shows/reviews/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) {
        showService.deleteReview(reviewId);
        return ResponseEntity.ok("Review deleted successfully!");
    }

    // Inner class for response structure of review details
    public static class ReviewResponse {
        private Long id;
        private int rating;
        private String comment;
        private Long showId;

        public ReviewResponse(Long id, int rating, String comment, Long showId) {
            this.id = id;
            this.rating = rating;
            this.comment = comment;
            this.showId = showId;
        }

        // Getters and setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getRating() {
            return rating;
        }

        public void setRating(int rating) {
            this.rating = rating;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }

        public Long getShowId() {
            return showId;
        }

        public void setShowId(Long showId) {
            this.showId = showId;
        }
    }

    // Inner class for response structure of show details with average rating
    public static class ShowDetailsResponse {
        private Show show;
        private double averageRating;

        public ShowDetailsResponse(Show show, double averageRating) {
            this.show = show;
            this.averageRating = averageRating;
        }

        // Getters and setters
        public Show getShow() {
            return show;
        }

        public void setShow(Show show) {
            this.show = show;
        }

        public double getAverageRating() {
            return averageRating;
        }

        public void setAverageRating(double averageRating) {
            this.averageRating = averageRating;
        }
    }

    // Inner class for response structure of airing schedule details
    public class AiringScheduleResponse {
        private Long id;
        private String showName;
        private LocalDate airDate;
        private int episodeNumber;

        public AiringScheduleResponse() {
            // Default constructor
        }

        public AiringScheduleResponse(Long id, String showName, LocalDate airDate, int episodeNumber) {
            this.id = id;
            this.showName = showName;
            this.airDate = airDate;
            this.episodeNumber = episodeNumber;
        }

        // Getters and setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getShowName() {
            return showName;
        }

        public void setShowName(String showName) {
            this.showName = showName;
        }

        public LocalDate getAirDate() {
            return airDate;
        }

        public void setAirDate(LocalDate airDate) {
            this.airDate = airDate;
        }

        public int getEpisodeNumber() {
            return episodeNumber;
        }

        public void setEpisodeNumber(int episodeNumber) {
            this.episodeNumber = episodeNumber;
        }
    }
}
