package org.docs.payload.request;

import java.util.List;

public class UnsignedUsersRequest {
    private Integer eventId;
    private List<Integer> participantIds;

    public UnsignedUsersRequest() {
    }

    public UnsignedUsersRequest(Integer eventId, List<Integer> participantIds) {
        this.eventId = eventId;
        this.participantIds = participantIds;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public List<Integer> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }
}
