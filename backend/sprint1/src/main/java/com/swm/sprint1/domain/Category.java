package com.swm.sprint1.domain;


import com.swm.sprint1.domain.base.DateEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "category", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Category{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private String id;

    @Column(unique = true)
    private String name;
}
