package com.javaproject.freshfarm.controllers;

import com.javaproject.freshfarm.config.JwtService;
import com.javaproject.freshfarm.dtos.CommentDTO;
import com.javaproject.freshfarm.dtos.ReportDTO;
import com.javaproject.freshfarm.models.*;
import com.javaproject.freshfarm.repositories.ProductRepository;
import com.javaproject.freshfarm.repositories.ReportRepository;
import com.javaproject.freshfarm.repositories.UserRepository;
import com.javaproject.freshfarm.services.ProductService;
import com.javaproject.freshfarm.services.ReportService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/client/products")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ProductRepository productRepository;
    private final ProductService productService;

    // getting one product report :
    @GetMapping("/reports/{id}")
    public List<ReportDTO> getOneProductReport(@PathVariable("id") Long id) {
        return reportService.getOneProductReportsDTO(id);
    }

    @GetMapping("/allreports")
    public List<ReportDTO> getAllReports() {
        return reportService.getAllReportsDTO();
    }

    @PostMapping("/newreport/{product_id}")
    public ReportDTO createReport(@RequestBody Report report,
                                    HttpServletRequest request,
                                    @PathVariable("product_id") Long product_id
    ){
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) {
                User user = userRepository.findById(userId).get();
                report.setProductReportedBy(user);
                if(productRepository.findProductsById(product_id).isPresent()) {
                    Product product = productRepository.findProductsById(product_id).get();
                    report.setProductsReports(product);
                }
                return reportService.createReport(report);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }
}
