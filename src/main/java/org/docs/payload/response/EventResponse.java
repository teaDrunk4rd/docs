package org.docs.payload.response;

import java.util.Date;

public class EventResponse {
    private String name;
    private Date startDate;
    private Date c1Date;
    private Date cplus1Date;
    private Date finishDate;

    public EventResponse() {
    }

    public EventResponse(String name, Date startDate, Date c1Date, Date cplus1Date, Date finishDate) {
        this.name = name;
        this.startDate = startDate;
        this.c1Date = c1Date;
        this.cplus1Date = cplus1Date;
        this.finishDate = finishDate;
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
}
