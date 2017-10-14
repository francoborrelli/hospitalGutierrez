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

    public function __construct($data)
    {
        $this->firstName = $data['firstName'];
        $this->lastName = $data['lastName'];
        $this->birthday = $data['birthday'];
        $this->docNumber = $data['docNumber'];
        $this->address = $data['address'];
        if (isset($data['phone']) && !empty($data['phone']))
            $this->phone = $data['phone'];
        if(isset($data['refrigerator']))
            $this->refrigerator = true;
        else
            $this->refrigerator = false;
        if(isset($data['electricity']))
            $this->electricity = true;
        else
            $this->electricity = false;
        if(isset($data['pet']))
            $this->pet = true;
        else
            $this->pet = false;

        $this->gender = $data['gender'];
        $this->documentType = $data['documentType'];
        $this->waterType = $data['waterType'];
        $this->houseType = $data['houseType'];
        $this->heatingType = $data['heatingType'];
        if(isset($data['insurance']))
            $this->insurance = $data['insurance'];
    }

}
