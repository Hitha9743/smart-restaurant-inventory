package com.siwms.controllers;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.siwms.models.WasteRecord;
import com.siwms.services.WasteService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // remove if using Angular proxy
@RestController
@RequestMapping("/api/waste")
public class WasteController {

    private final WasteService wasteService;
    public WasteController(WasteService wasteService) { this.wasteService = wasteService; }

    @GetMapping
    public List<WasteRecord> getAll() {
        return wasteService.getAll();
    }

    @GetMapping("/range")
    public List<WasteRecord> range(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return wasteService.getByDateRange(from, to);
    }

    @GetMapping("/total")
    public double total(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return wasteService.getTotalCostByDateRange(from, to);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteRecord> getById(@PathVariable Long id) {
        WasteRecord wr = wasteService.getById(id);
        return wr != null ? ResponseEntity.ok(wr) : ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> create(@RequestBody WasteRecord rec) {
        wasteService.add(rec);
        return ResponseEntity.ok("Waste record added successfully!");
    }

    @PutMapping(value="/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody WasteRecord rec) {
        wasteService.update(id, rec);
        return ResponseEntity.ok("Waste record updated successfully!");
    }

    @DeleteMapping(value="/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> delete(@PathVariable Long id) {
        wasteService.delete(id);
        return ResponseEntity.ok("Waste record deleted successfully!");
    }
}
