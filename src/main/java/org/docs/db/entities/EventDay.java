package org.docs.db.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="event_days")
public class EventDay {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "EventId", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "DayId", nullable = false)
    private Day day;

    @Column(nullable = false)
    private Date date;

    public EventDay() {
    }

    public EventDay(Event event, Day day, Date date) {
        this.event = event;
        this.day = day;
        this.date = date;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
