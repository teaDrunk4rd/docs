package org.docs.payload.response;

public class DocResponse {
    private String name;
    private Integer dayId;
    private String content;
    private Integer roleId;

    public DocResponse() {
    }

    public DocResponse(String name, Integer dayId, String content, Integer roleId) {
        this.name = name;
        this.dayId = dayId;
        this.content = content;
        this.roleId = roleId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getDayId() {
        return dayId;
    }

    public void setDayId(Integer dayId) {
        this.dayId = dayId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}
