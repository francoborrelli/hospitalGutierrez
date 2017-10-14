<?php

namespace App\Models;

/**
 * Role
 *
 * @Table(name="roles")
 * @Entity
 */
class Role
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
    private $name;

    /**
     * @ManyToMany(targetEntity="Permission")
     * @JoinTable(name="roles_permissions",
     *      joinColumns={@JoinColumn(name="role_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="permission_id", referencedColumnName="id")}
     *      )
     */
    private $permissions;


    public function __construct() {
        $this->permissions = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function addPermission($permission)
    {
        $this->permissions[] = $permission;

        return $this;
    }

    public function removePermission($permission)
    {
        $this->permissions->removeElement($permission);
    }

    public function getPermissions()
    {
        return $this->permissions;
    }

    public function hasPermission($permissionName)
    {
        foreach ($this->permissions as $permission) {
            if ($permission->getName() == $permissionName)
                return true;
        }
        return false;
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
     * Set name
     *
     * @param string $name
     *
     * @return Role
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

}


