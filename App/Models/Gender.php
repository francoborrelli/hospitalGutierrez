<?php

namespace App\Models;

/**
 * Gender
 *
 * @Table(name="gender")
 * @Entity
 */
class Gender
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

}
