package com.show.show.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "Reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;
    private String comment;
  

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    @JsonBackReference
    private Show show;
    
    
    public Review() {
		// TODO Auto-generated constructor stub
	}

    public Review(int rating, String comment, Show show) {
        this.rating = rating;
        this.comment = comment;
        this.show = show;
    }
    
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

	public Show getShow() {
		return show;
	}

	public void setShow(Show show) {
		this.show = show;
	}
	
	 //the value returned by this method will not be stored in the database
	 @Transient
    public Long getShowId() {
        return show != null ? show.getId() : null;
    }
	 
    
}
