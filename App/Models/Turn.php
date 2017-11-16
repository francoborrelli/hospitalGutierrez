<?php

namespace App\Models;

/**
 * Gender
 *
 * @Table(name="gender")
 * @Entity
 */
class Turn
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
     * @var \DateTime
     *
     * @Column(type="datetime")
     */
    private $date;

    public function setId($id) 
    {
        $this->id = $id;
        return $this;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setDate($date) 
    {
        $this->date = $date;
        return $this;
    }

    public function getDate()
    {
        return $this->date;
    }

}
