package org.docs.payload.response;

public class DocsResponse {
    private Integer id;
    private String doc;
    private String day;
    private String role;

    public DocsResponse() {
    }

    public DocsResponse(Integer id, String doc, String day, String role) {
        this.id = id;
        this.doc = doc;
        this.day = day;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDoc() {
        return doc;
    }

    public void setDoc(String doc) {
        this.doc = doc;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
