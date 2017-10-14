<?php

namespace App\Models;

/**
 * Insurance
 *
 * @Table(name="insurances")
 * @Entity
 */
class Insurance
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
