package com.form.log_form.Repository;

import com.form.log_form.Model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    public Optional<Department> findByDeptno(Integer deptno);
}
