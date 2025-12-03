package com.teamEleven.backend.entities;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;

@Entity
@Table(name="categories")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "TINYINT")
    private Byte id;

    @Column(name="name")
    private String name;

    public Category() {
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "name = " + name + ", " +
                ")";
    }

    public Byte getId() { return id; }
    public void setId(Byte id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
