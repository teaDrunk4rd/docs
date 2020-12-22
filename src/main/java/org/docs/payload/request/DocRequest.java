package org.docs.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class DocRequest {
    private Integer id;
    @NotBlank(message = "Заполните наименование")
    private String name;
    @NotNull(message = "Заполните роль")
    private Integer roleId;
    @NotNull(message = "Заполните день")
    private Integer dayId;
    @NotBlank(message = "Заполните содержание")
    private String content;
    private String pin;
    private boolean isSigned;
    private List<Integer> eventIds;

    public DocRequest() {
    }

    public DocRequest(Integer id, @NotBlank(message = "Заполните наименование") String name, @NotNull(message = "Заполните роль") Integer roleId, @NotNull(message = "Заполните день") Integer dayId, @NotBlank(message = "Заполните содержание") String content, String pin, boolean isConfirmed, List<Integer> eventIds) {
        this.id = id;
        this.name = name;
        this.roleId = roleId;
        this.dayId = dayId;
        this.content = content;
        this.pin = pin;
        this.isSigned = isConfirmed;
        this.eventIds = eventIds;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
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

    public List<Integer> getEventIds() {
        return eventIds;
    }

    public void setEventIds(List<Integer> eventIds) {
        this.eventIds = eventIds;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public boolean getSigned() {
        return isSigned;
    }

    public void setSigned(boolean signed) {
        isSigned = signed;
    }
}
