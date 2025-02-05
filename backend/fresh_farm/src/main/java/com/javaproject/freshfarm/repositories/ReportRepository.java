package com.javaproject.freshfarm.repositories;


import com.javaproject.freshfarm.models.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findAll();

    @Query(value="SELECT * FROM reports WHERE report_id = ?1", nativeQuery=true)
    List<Report> getReportsByProductId(Long id);



}
