package com.show.show.repositories;

import com.show.show.models.AiringSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AiringScheduleRepository extends JpaRepository<AiringSchedule, Long> {
}
