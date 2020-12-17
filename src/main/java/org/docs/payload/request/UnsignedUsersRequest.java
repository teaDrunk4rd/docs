package org.docs.payload.request;

import java.util.List;

public class UnsignedUsersRequest {
    private List<Integer> participantIds;

    public UnsignedUsersRequest() {
    }

    public UnsignedUsersRequest(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }

    public List<Integer> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(List<Integer> participantIds) {
        this.participantIds = participantIds;
    }
}
