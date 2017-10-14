<?php

namespace App\Models;

/**
 * HouseType
 *
 * @Table(name="houseTypes")
 * @Entity
 */
class HouseType
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
