<?php

namespace App\Models;

/**
 * WaterType
 *
 * @Table(name="waterTypes")
 * @Entity
 */
class WaterType
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
     * @Column(type="string", length=50)
     */
    private $name;

}
