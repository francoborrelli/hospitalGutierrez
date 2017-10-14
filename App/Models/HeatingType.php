<?php

namespace App\Models;

/**
 * HeatingType
 *
 * @Table(name="heatingTypes")
 * @Entity
 */
class HeatingType
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
