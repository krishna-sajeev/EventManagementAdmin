package com.event.backened.repository;

import com.event.backened.model.EventManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EventManageRepository extends JpaRepository<EventManage,Integer> {


}
