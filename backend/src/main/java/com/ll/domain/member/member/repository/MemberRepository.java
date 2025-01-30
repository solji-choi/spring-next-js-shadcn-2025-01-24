package com.ll.domain.member.member.repository;

import com.ll.domain.member.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);

    Optional<Member> findByApiKey(String apiKey);

    Page<Member> findByAndNicknameLike(String nicknameLike, PageRequest pageRequest);

    Page<Member> findByAndUsernameLike(String usernameLike, PageRequest pageRequest);
}