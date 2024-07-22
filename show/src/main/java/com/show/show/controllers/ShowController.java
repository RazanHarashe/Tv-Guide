package com.show.show.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
