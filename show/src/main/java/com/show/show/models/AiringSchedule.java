package com.show.show.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "AiringSchedules")
public class AiringSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    @JsonBackReference
    private Show show;

    private LocalDate airDate;
    
    private int episodeNumber;

    public AiringSchedule() {
		// TODO Auto-generated constructor stub
	}



	public AiringSchedule(Show show, LocalDate airDate, int episodeNumber) {
		super();
		this.show = show;
		this.airDate = airDate;
		this.episodeNumber = episodeNumber;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Show getShow() {
		return show;
	}

	public void setShow(Show show) {
		this.show = show;
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
