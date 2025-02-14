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
    
    private UserSimpleDTO productReportedBy;
    private ProductDTO productReported;
    private Date createdAt;
}


