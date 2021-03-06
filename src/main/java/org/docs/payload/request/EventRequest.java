package org.docs.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class EventRequest {
    private Integer id;
    @NotBlank(message = "Заполните наименование")
    private String name;
    @NotNull(message = "Заполните дату начала")
    private Date startDate;
    @NotNull(message = "Заполните дату С1")
    private Date c1Date;
    @NotNull(message = "Заполните дату С+1")
    private Date cplus1Date;
    @NotNull(message = "Заполните дату окончания")
    private Date finishDate;
    private List<Integer> participantIds;
    private List<Integer> docIds;

    public EventRequest() {
    }

    public EventRequest(Integer id, @NotBlank(message = "Заполните наименование") String name, @NotNull(message = "Заполните дату начала") Date startDate, @NotNull(message = "Заполните дату С1") Date c1Date, @NotNull(message = "Заполните дату С+1") Date cplus1Date, @NotNull(message = "Заполните дату окончания") Date finishDate, List<Integer> participantIds, List<Integer> docIds) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.c1Date = c1Date;
        this.cplus1Date = cplus1Date;
        this.finishDate = finishDate;
        this.participantIds = participantIds;
        this.docIds = docIds;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getC1Date() {
        return c1Date;
    }

    public void setC1Date(Date c1Date) {
        this.c1Date = c1Date;
    }

    public Date getCplus1Date() {
        return cplus1Date;
    }

    public void setCplus1Date(Date cplus1Date) {
        this.cplus1Date = cplus1Date;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public List<Integer> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }

    public List<Integer> getDocIds() {
        return docIds;
    }

    public void setDocIds(List<Integer> docIds) {
        this.docIds = docIds;
    }
}
