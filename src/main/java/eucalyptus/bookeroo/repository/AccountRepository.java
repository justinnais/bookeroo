package eucalyptus.bookeroo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import eucalyptus.bookeroo.model.Account;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long>{
  List<Account> findByEmail(String email);
}
