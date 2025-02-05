package com.javaproject.freshfarm.services;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.ReportDTO;
import com.javaproject.freshfarm.models.Report;
import com.javaproject.freshfarm.repositories.ProductRepository;
import com.javaproject.freshfarm.repositories.ReportRepository;
import com.javaproject.freshfarm.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ModelMapper modelMapper ;
    private final ReportRepository reportRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService ;


    public List<ReportDTO> getAllReportsDTO(){
        return reportRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
    }

    public List<ReportDTO> getOneProductReportsDTO(Long id){
        return reportRepository.getReportsByProductId(id).stream().map(this::convertEntityToDto).collect(Collectors.toList());
    }


    public ReportDTO createReport(Report report) {
        Report newReport=reportRepository.save(report);
        return convertEntityToDto(newReport);
    }


    public ReportDTO convertEntityToDto(Report report) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(report, ReportDTO.class);
    }

    public Report convertDtoToEntity(ReportDTO reportDTO) {
        return modelMapper.map(reportDTO, Report.class);
    }
}
