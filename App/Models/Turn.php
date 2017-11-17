<?php

namespace App\Models;

/**
 * Gender
 *
 * @Table(name="turns")
 * @Entity(repositoryClass="App\Repositories\TurnRepository")
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

    public function toArray() {
        $vars = get_object_vars ( $this );
        $array = array ();
        foreach ( $vars as $key => $value ) {
            $array [ltrim ( $key, '_' )] = $value;
        }
        return $array;
    }

}
