package com.siwms.dao;

import com.siwms.dao.WasteDAO;
import com.siwms.models.WasteRecord;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public class WasteDAOImpl implements WasteDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<WasteRecord> getAll() {
		String sql = "SELECT * FROM waste_records ORDER BY wasted_on DESC, id DESC";
		return em.createNativeQuery(sql, WasteRecord.class).getResultList();
	}

	@Override
	public List<WasteRecord> getByDateRange(LocalDate from, LocalDate to) {
		String sql = "SELECT * FROM waste_records WHERE wasted_on BETWEEN ? AND ? ORDER BY wasted_on DESC";
		return em.createNativeQuery(sql, WasteRecord.class).setParameter(1, from).setParameter(2, to).getResultList();
	}

	@Override
	public WasteRecord getById(Long id) {
		return em.find(WasteRecord.class, id);
	}

	@Override
	@Transactional
	public void add(WasteRecord rec) {
		em.persist(rec);
	}

	@Override
	@Transactional
	public void update(Long id, WasteRecord rec) {
		rec.setId(id);
		em.merge(rec);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		WasteRecord managed = em.find(WasteRecord.class, id);
		if (managed != null)
			em.remove(managed);
	}

	@Override
	public double getTotalCostByDateRange(LocalDate from, LocalDate to) {
		String sql = "SELECT COALESCE(SUM(cost),0) FROM waste_records WHERE wasted_on BETWEEN ? AND ?";
		Number n = (Number) em.createNativeQuery(sql).setParameter(1, from).setParameter(2, to).getSingleResult();
		return n.doubleValue();
	}
}
