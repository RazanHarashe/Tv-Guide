package com.show.show.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.show.show.models.Show;


@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
	  List<Show> findByName(String name);
	  List<Show> findByGenre(String genre);
      List<Show> findByNetwork(String network);
}
