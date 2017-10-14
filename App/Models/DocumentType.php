<?php

namespace App\Models;

/**
 * DocumentType
 *
 * @Table(name="documentTypes")
 * @Entity
 */
class DocumentType
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
