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
        $this->birthday = new \DateTime();
        $this->docNumber = $data['documentNumber'];
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


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return Patient
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return Patient
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set birthday
     *
     * @param \DateTime $birthday
     *
     * @return Patient
     */
    public function setBirthday($birthday)
    {
        $this->birthday = $birthday;

        return $this;
    }

    /**
     * Get birthday
     *
     * @return \DateTime
     */
    public function getBirthday()
    {
        return $this->birthday;
    }

    /**
     * Set docNumber
     *
     * @param string $docNumber
     *
     * @return Patient
     */
    public function setDocNumber($docNumber)
    {
        $this->docNumber = $docNumber;

        return $this;
    }

    /**
     * Get docNumber
     *
     * @return string
     */
    public function getDocNumber()
    {
        return $this->docNumber;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return Patient
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set phone
     *
     * @param string $phone
     *
     * @return Patient
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set refrigerator
     *
     * @param boolean $refrigerator
     *
     * @return Patient
     */
    public function setRefrigerator($refrigerator)
    {
        $this->refrigerator = $refrigerator;

        return $this;
    }

    /**
     * Get refrigerator
     *
     * @return boolean
     */
    public function getRefrigerator()
    {
        return $this->refrigerator;
    }

    /**
     * Set electricity
     *
     * @param boolean $electricity
     *
     * @return Patient
     */
    public function setElectricity($electricity)
    {
        $this->electricity = $electricity;

        return $this;
    }

    /**
     * Get electricity
     *
     * @return boolean
     */
    public function getElectricity()
    {
        return $this->electricity;
    }

    /**
     * Set pet
     *
     * @param boolean $pet
     *
     * @return Patient
     */
    public function setPet($pet)
    {
        $this->pet = $pet;

        return $this;
    }

    /**
     * Get pet
     *
     * @return boolean
     */
    public function getPet()
    {
        return $this->pet;
    }

    /**
     * Set gender
     *
     * @param \App\Models\Gender $gender
     *
     * @return Patient
     */
    public function setGender($gender = null)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return \App\Models\Gender
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set documentType
     *
     * @param \App\Models\DocumentType $documentType
     *
     * @return Patient
     */
    public function setDocumentType($documentType = null)
    {
        $this->documentType = $documentType;

        return $this;
    }

    /**
     * Get documentType
     *
     * @return \App\Models\DocumentType
     */
    public function getDocumentType()
    {
        return $this->documentType;
    }

    /**
     * Set insurance
     *
     * @param \App\Models\Insurance $insurance
     *
     * @return Patient
     */
    public function setInsurance($insurance = null)
    {
        $this->insurance = $insurance;

        return $this;
    }

    /**
     * Get insurance
     *
     * @return \App\Models\Insurance
     */
    public function getInsurance()
    {
        return $this->insurance;
    }

    /**
     * Set heatingType
     *
     * @param \App\Models\HeatingType $heatingType
     *
     * @return Patient
     */
    public function setHeatingType($heatingType = null)
    {
        $this->heatingType = $heatingType;

        return $this;
    }

    /**
     * Get heatingType
     *
     * @return \App\Models\HeatingType
     */
    public function getHeatingType()
    {
        return $this->heatingType;
    }

    /**
     * Set houseType
     *
     * @param \App\Models\HouseType $houseType
     *
     * @return Patient
     */
    public function setHouseType($houseType = null)
    {
        $this->houseType = $houseType;

        return $this;
    }

    /**
     * Get houseType
     *
     * @return \App\Models\HouseType
     */
    public function getHouseType()
    {
        return $this->houseType;
    }

    /**
     * Set waterType
     *
     * @param \App\Models\WaterType $waterType
     *
     * @return Patient
     */
    public function setWaterType($waterType = null)
    {
        $this->waterType = $waterType;

        return $this;
    }

    /**
     * Get waterType
     *
     * @return \App\Models\WaterType
     */
    public function getWaterType()
    {
        return $this->waterType;
    }
}
