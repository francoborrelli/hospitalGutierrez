<?php

namespace App\Models;

/**
 * Site
 *
 * @Table(name="site")
 * @Entity
 */
class Site
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
     * @Column(type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @Column(type="string", length=255)
     */
    private $description;

    /**
     * @var string
     *
     * @Column(type="string", length=255)
     */
    private $email;


    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $listAmount;

    
    /**
     * @var bool
     *
     * @Column(type="boolean")
     */
    private $enabled;


    public function setData($data)
    {
        $this->title = $data['title'];
        $this->email = $data['email'];
        $this->description = $data['description'];
        if (isset($data['enabled']))
            $this->enabled = true;
        else
            $this->enabled = false;
        $this->listAmount = $data['listAmount'];
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
     * Set title
     *
     * @param string $title
     *
     * @return Site
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Site
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Site
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
     * Set listAmount
     *
     * @param integer $listAmount
     *
     * @return Site
     */
    public function setListAmount($listAmount)
    {
        $this->listAmount = $listAmount;

        return $this;
    }

    /**
     * Get listAmount
     *
     * @return integer
     */
    public function getListAmount()
    {
        return $this->listAmount;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled
     *
     * @return Site
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean
     */
    public function getEnabled()
    {
        return $this->enabled;
    }
}
