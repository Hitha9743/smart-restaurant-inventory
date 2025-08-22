package com.siwms.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "waste_records")
public class WasteRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ingredient_id")
    private Long ingredientId;

    private double quantity;

    private String unit;

    private String reason;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "wasted_on")
    private LocalDate wastedOn;

    private double cost;

    public WasteRecord() {}
    public WasteRecord(Long id, Long ingredientId, double quantity, String unit, String reason, LocalDate wastedOn, double cost) {
        this.id = id; this.ingredientId = ingredientId; this.quantity = quantity; this.unit = unit;
        this.reason = reason; this.wastedOn = wastedOn; this.cost = cost;
    }

    // getters/setters…
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getIngredientId() { return ingredientId; }
    public void setIngredientId(Long ingredientId) { this.ingredientId = ingredientId; }

    public double getQuantity() { return quantity; }
    public void setQuantity(double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDate getWastedOn() { return wastedOn; }
    public void setWastedOn(LocalDate wastedOn) { this.wastedOn = wastedOn; }

    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }
}
