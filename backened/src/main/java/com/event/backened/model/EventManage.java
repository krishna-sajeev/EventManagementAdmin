package com.event.backened.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class EventManage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String eventName;

    @Enumerated(EnumType.STRING)
    private OrganizerType organizerType;

    @Enumerated(EnumType.STRING)
    private EventType eventType;


    private LocalDate startDate;


    private LocalDate endDate;

    private String venue;

    private String speakerName;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    private String remarks;

    public enum OrganizerType {
        ACADEMIC, CORPORATE, NGO, GOVERNMENT
    }

    public enum EventType {
        WORKSHOP, SEMINAR, CONFERENCE, TRAINING
    }

    public enum EventStatus {
        UPCOMING, ONGOING, COMPLETED, CANCELLED
    }

    public EventManage(int Id, String eventName, OrganizerType organizerType, EventType eventType, LocalDate startDate, LocalDate endDate, String venue, String speakerName, int capacity, EventStatus status, String remarks) {
        this.Id = Id;
        this.eventName = eventName;
        this.organizerType = organizerType;
        this.eventType = eventType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.venue = venue;
        this.speakerName = speakerName;
        this.capacity = capacity;
        this.status = status;
        this.remarks = remarks;
    }

    public EventManage() {
    }

    public int getId() {
        return Id;
    }

    public void setEventId(int eventId) {
        this.Id = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public OrganizerType getOrganizerType() {
        return organizerType;
    }

    public void setOrganizerType(OrganizerType organizerType) {
        this.organizerType = organizerType;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getSpeakerName() {
        return speakerName;
    }

    public void setSpeakerName(String speakerName) {
        this.speakerName = speakerName;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
