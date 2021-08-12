package eucalyptus.bookeroo.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "accounts")
public class Account {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  @Column(name = "role")
  private Role role;

  @Column(name = "join_date")
  private Timestamp joinDate;

  public Account() {

  }

  public enum Role {user, admin, publisher, store}

  public Account(String firstName, String lastName, String email, String password, Role role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public long getId() {
    return id;
  }

  @Override
  public String toString() {
    return "Account [id=" + id + ", name=" + firstName + " " + lastName + ", email=" + email + ", role=" + role + "]";
  }
}
