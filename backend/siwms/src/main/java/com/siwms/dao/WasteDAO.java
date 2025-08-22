package com.siwms.dao;

import com.siwms.models.WasteRecord;
import java.time.LocalDate;
import java.util.List;

public interface WasteDAO {
    List<WasteRecord> getAll();
    List<WasteRecord> getByDateRange(LocalDate from, LocalDate to);
    WasteRecord getById(Long id);
    void add(WasteRecord rec);
    void update(Long id, WasteRecord rec);
    void delete(Long id);

    double getTotalCostByDateRange(LocalDate from, LocalDate to);
}
