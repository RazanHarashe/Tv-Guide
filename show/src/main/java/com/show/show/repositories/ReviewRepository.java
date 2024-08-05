package com.show.show.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.show.show.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
}

