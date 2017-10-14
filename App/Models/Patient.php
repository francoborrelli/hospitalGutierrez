<?php

namespace App\Models;

/**
 * Patient
 *
 * @Table(name="patients")
 * @Entity
 */
class Patient
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
    private $firstName;

    /**
     * @var string
     *
     * @Column(type="string", length= 50)
     */
    private $lastName;
    
    /**
     * @var \DateTime
     *
     * @Column(type="datetime")
     */
    private $birthday;

    /**
     * @var string
     * 
     * @Column(type="string")
     */
    private $docNumber;

    /**
     * @var string
     *
     * @Column(type="string")
     */
    private $address;

    /**
     * @var string
     *
     * @Column(type="string", nullable=true)
     */
    private $phone;

    /**
     * @var boolean
     *
     * @Column(type="boolean")
     */
    private $refrigerator;

    /**
     * @var boolean
     *
     * @Column(type="boolean")
     */
    private $electricity;

    /**
     * @var boolean
     *
     * @Column(type="boolean")
     */
    private $pet;

    /**
     * @ManyToOne(targetEntity="Gender")
     * @JoinColumn(name="gender_id", referencedColumnName="id")
     */
    private $gender;

    /**
     * @ManyToOne(targetEntity="DocumentType")
     * @JoinColumn(name="documentType_id", referencedColumnName="id")
     */
    private $documentType;

    /**
     * @ManyToOne(targetEntity="Insurance")
     * @JoinColumn(name="insurance_id", referencedColumnName="id", nullable=true)
     */
    private $insurance;

    /**
     * @ManyToOne(targetEntity="HeatingType")
     * @JoinColumn(name="heatingType_id", referencedColumnName="id")
     */
    private $heatingType;

    /**
     * @ManyToOne(targetEntity="HouseType")
     * @JoinColumn(name="houseType_id", referencedColumnName="id")
     */
    private $houseType;

    /**
     * @ManyToOne(targetEntity="WaterType")
     * @JoinColumn(name="waterType_id", referencedColumnName="id")
     */
    private $waterType;

}
