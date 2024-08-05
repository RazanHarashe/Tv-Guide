package com.show.show.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "Shows")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String genre;
    private String network;
    private String description;

    @Lob
    private byte[] image;
    
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AiringSchedule> airingSchedules;
    
    @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Review> reviews;

    
    public Show() {
		// TODO Auto-generated constructor stub
	}


	public Show(String name, String genre, String network, String description, byte[] image,
			List<AiringSchedule> airingSchedules, List<Review> reviews) {
		super();
		this.name = name;
		this.genre = genre;
		this.network = network;
		this.description = description;
		this.image = image;
		this.airingSchedules = airingSchedules;
		this.reviews = reviews;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getGenre() {
		return genre;
	}


	public void setGenre(String genre) {
		this.genre = genre;
	}


	public String getNetwork() {
		return network;
	}


	public void setNetwork(String network) {
		this.network = network;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	

	public List<AiringSchedule> getAiringSchedules() {
		return airingSchedules;
	}


	public void setAiringSchedules(List<AiringSchedule> airingSchedules) {
		this.airingSchedules = airingSchedules;
	}


	@Override
	public String toString() {
		return "Show [id=" + id + ", name=" + name + ", genre=" + genre + ", network=" + network + ", description="
				+ description + "]";
	}


	public byte[] getImage() {
		return image;
	}


	public void setImage(byte[] image) {
		this.image = image;
	}


	public List<Review> getReviews() {
		return reviews;
	}


	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	
  //the value returned by this method will not be stored in the database
	@Transient
    public double getAverageRating() {
        if (reviews == null || reviews.isEmpty()) {
            return 0;
        }
        double sum = 0;
        for (Review review : reviews) {
            sum += review.getRating();
        }
        return sum / reviews.size();
    }
}
