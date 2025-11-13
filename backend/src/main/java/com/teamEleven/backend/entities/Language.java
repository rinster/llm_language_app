package com.teamEleven.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name="languages")
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "TINYINT")
    private Byte id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @Column(name="native_name")
    private String nativeName;

    public Language(Byte id, String name, String code, String nativeName) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.nativeName = nativeName;
    }

    public Language() {

    }

    public Byte getId() {return id;}
    public void setId(Byte id) {this.id = id;}
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public String getCode() {return code;}
    public void setCode(String code) {this.code = code;}
    public String getNativeName() {return nativeName;}
    public void setNativeName(String nativeName) {this.nativeName = nativeName;}
}
