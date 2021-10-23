package com.rmit.sept.bk_reviewservices.repositories;

import com.rmit.sept.bk_reviewservices.model.UserReview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserReviewRepository extends CrudRepository<UserReview, Long>
{
    List<UserReview> findUserReviewsByReviewedUserId(Long reviewedUserId);

    List<UserReview> findUserReviewsByReviewerUserId(Long reviewerUserId);
}
