package org.docs.payload.response;

public class EventsResponse {
    private Integer id;
    private String event;
    private String dates;
    private Integer participantsCount;

    public EventsResponse() {
    }

    public EventsResponse(Integer id, String event, String dates, Integer participantsCount) {
        this.id = id;
        this.event = event;
        this.dates = dates;
        this.participantsCount = participantsCount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getDates() {
        return dates;
    }

    public void setDates(String dates) {
        this.dates = dates;
    }

    public Integer getParticipantsCount() {
        return participantsCount;
    }

    public void setParticipantsCount(Integer participantsCount) {
        this.participantsCount = participantsCount;
    }
}
