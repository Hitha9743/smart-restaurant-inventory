package com.siwms.services;

import com.siwms.dao.WasteDAO;
import com.siwms.models.WasteRecord;
import com.siwms.services.WasteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class WasteServiceImpl implements WasteService {

    private final WasteDAO wasteDAO;
    public WasteServiceImpl(WasteDAO wasteDAO) { this.wasteDAO = wasteDAO; }

    @Override
    public List<WasteRecord> getAll() { return wasteDAO.getAll(); }

    @Override
    public List<WasteRecord> getByDateRange(LocalDate from, LocalDate to) { return wasteDAO.getByDateRange(from, to); }

    @Override
    public WasteRecord getById(Long id) { return wasteDAO.getById(id); }

    @Override @Transactional
    public void add(WasteRecord rec) { wasteDAO.add(rec); }

    @Override @Transactional
    public void update(Long id, WasteRecord rec) { wasteDAO.update(id, rec); }

    @Override @Transactional
    public void delete(Long id) { wasteDAO.delete(id); }

    @Override
    public double getTotalCostByDateRange(LocalDate from, LocalDate to) {
        return wasteDAO.getTotalCostByDateRange(from, to);
    }
}
