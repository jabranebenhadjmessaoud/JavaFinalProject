package com.javaproject.freshfarm.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDTO {

    private Long id;

    private String reportContent;

    private UserDTO productReportedBy;

    private ProductDTO productsReports;

    private Date createdAt;
}
