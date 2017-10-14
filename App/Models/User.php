<?php

namespace App\Models;

/**
 * User
 *
 * @Table(name="users")
 * @Entity(repositoryClass="App\Repositories\UserRepository")
 */
class User
{
    
    /**
     * @var int
     *
     * @Column(type="integer")
     * @Id
     * @GeneratedValue
     */
    private $id;

    /**
     * @var string
     *
     * @Column(type="string", length=255, unique=true)
     */
    private $email;

    /**
     * @var string
     *
     * @Column(type="string", length=50, unique=true)
     */
    private $username;

    /**
     * @var string
     *
     * @Column(type="string", length=255)
     */
    private $password;

    private $plainPassword;

    private $passwordConfirm;

    /**
     * @var string
     *
     * @Column(type="string", length=50)
     */
    private $firstName;

    /**
     * @var string
     *
     * @Column(type="string", length= 50)
     */
    private $lastName;
    
    /**
     * @var bool
     *
     * @Column(type="boolean")
     */
    private $active;

    /**
     * @var \DateTime
     *
     * @Column(type="datetime")
     */
    private $updatedAt;

    /**
     * @var \DateTime
     *
     * @Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ManyToMany(targetEntity="Role")
     * @JoinTable(name="users_roles",
     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id")}
     *      )
     */
    private $roles;


    public function __construct($data, $roles) {
        $this->roles = new \Doctrine\Common\Collections\ArrayCollection();
        date_default_timezone_set('America/Argentina/Buenos_Aires');
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
        $this->active = true;
        $this->setData($data, $roles);
    }

    public function setData($data, $roles)
    {
        $this->email = $data['email'];
        $this->firstName = $data['firstName'];
        $this->lastName = $data['lastName'];
        $this->username = $data['username'];
        $this->roles = $roles;

	if (isset($data['state']) && $data['state'] == 'blocked')
            $this->active = false;
        else if (isset($data['state']))
            $this->active = true;

        if (!strlen($data['pass']) == 0) {
            $this->password = password_hash($data['pass'], PASSWORD_DEFAULT);
            $this->plainPassword = $data['pass'];
            $this->passwordConfirm = $data['confirmPass'];
        } else {
            $this->plainPassword = 'plainPassword';
            $this->passwordConfirm = 'plainPassword';
        } 
    }

    public function addRole($role)
    {
        $this->roles[] = $role;

        return $this;
    }

    public function removeRole($role)
    {
        $this->roles->removeElement($role);
    }

    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Set id
     *
     * @param integer $id
     *
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set username
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set active
     *
     * @param boolean $active
     *
     * @return User
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean
     */
    public function isActive()
    {
        return $this->active;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return User
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return User
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function hasRole($id)
    {
        foreach ($this->roles as $role) {
            if ($role->getId() == $id)
                return true;
        }
        return false;
    }

    public function validatePassword($password)
    {
        return password_verify($password, $this->password);
    }

    public function validationErrors($usrExists, $emailExists)
    {
        $validationErrors = [];

        if (strlen($this->firstName) > 50 || strlen($this->firstName) == 0)
            $validationErrors[] = 'firstName';

        if (strlen($this->lastName) > 50 || strlen($this->lastName) == 0)
            $validationErrors[] = 'lastName';

        if (strlen($this->plainPassword) < 6 || strlen($this->plainPassword) == 0)
            $validationErrors[] = 'passwordLength';

        if ($this->plainPassword != $this->passwordConfirm)
            $validationErrors[] = 'passwordConfirm';

        if (strlen($this->username) < 6 || strlen($this->username) == 0)
            $validationErrors[] = 'usrLength';

        if ($usrExists)
            $validationErrors[] = 'usrExists';

        if (strlen($this->email) == 0 || filter_var($this->email, FILTER_VALIDATE_EMAIL) === false)
            $validationErrors[] = 'email';

        if ($emailExists)
            $validationErrors[] = 'emailExists';

        return $validationErrors;
    }

}


