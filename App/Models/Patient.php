<?php

namespace App\Models;

use App\Repositories\DocumentTypeRepository;
use App\Repositories\HouseTypeRepository;
use App\Repositories\HeatingTypeRepository;
use App\Repositories\WaterTypeRepository;
use App\Repositories\InsuranceRepository;

/**
 * Patient
 *
 * @Table(name="patients")
 * @Entity(repositoryClass="App\Repositories\PatientRepository")
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
     * @var int
     *
     * @Column(type="integer")
     */
    private $documentTypeId;

    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $insuranceId;

    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $heatingTypeId;

    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $houseTypeId;

    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $waterTypeId;

    /**
     * @var boolean
     *
     * @Column(type="boolean")
     */
    private $deleted;

     /**
     * One Patient has Many ClinicalRecords.
     * @OneToMany(targetEntity="ClinicalRecord", mappedBy="patient")
     */
     private $clinicalRecords;
     //

    public function __construct($data)
    {
        $this->setData($data);
        $this->setDemographicData($data);
        $this->deleted = false;
        $this->clinicalRecords = new ArrayCollection();
    }

    public function setData($data)
    {
        $this->firstName = $data['firstName'];
        $this->lastName = $data['lastName'];
        $this->birthday = \DateTime::createFromFormat('d/m/Y',$data['birthday']);
        $this->docNumber = $data['documentNumber'];
        $this->address = $data['address'];
        $this->phone = $data['phone'];
        $this->gender = $data['gender'];
        $this->documentTypeId = $data['documentTypeId'];
        $this->insuranceId = $data['insuranceId'];
    }

    public function setDemographicData($data)
    {
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

        $this->waterTypeId = $data['waterTypeId'];
        $this->houseTypeId = $data['houseTypeId'];
        $this->heatingTypeId = $data['heatingTypeId'];
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
     * Get ClinicalRecords
     *
     * @return array
     */
     public function getClinicalRecords()
     {
         return $this->clinicalRecords;
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
        $this->documentTypeId = $documentType;

        return $this;
    }

    /**
     * Get documentType
     *
     * @return \App\Models\DocumentType
     */
    public function getDocumentType()
    {
        return DocumentTypeRepository::find($this->documentTypeId);
    }

    public function getDocumentTypeId()
    {
        return $this->documentTypeId;
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
        $this->insuranceId = $insurance;

        return $this;
    }

    /**
     * Get insurance
     *
     * @return \App\Models\Insurance
     */
    public function getInsurance()
    {
        return InsuranceRepository::find($this->insuranceId);
    }

    public function getInsuranceId()
    {
        return $this->insuranceId;
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
        $this->heatingTypeId = $heatingType;

        return $this;
    }

    /**
     * Get heatingType
     *
     * @return \App\Models\HeatingType
     */
    public function getHeatingType()
    {
        return HeatingTypeRepository::find($this->heatingTypeId);
    }

    public function getHeatingTypeId()
    {
        return $this->heatingTypeId;
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
        $this->houseTypeId = $houseType;

        return $this;
    }

    /**
     * Get houseType
     *
     * @return \App\Models\HouseType
     */
    public function getHouseType()
    {
        return HouseTypeRepository::find($this->houseTypeId);
    }

    public function getHouseTypeId()
    {
        return $this->houseTypeId;
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
        $this->waterTypeId = $waterType;

        return $this;
    }

    public function delete()
    {
        $this->deleted = true;
    }

    public function isDeleted()
    {
        return $this->deleted;
    }

    public function activate()
    {
        $this->deleted = false;
    }

    /**
     * Get waterType
     *
     * @return \App\Models\WaterType
     */
    public function getWaterType()
    {
        return WaterTypeRepository::find($this->waterTypeId);
    }

    public function getWaterTypeId()
    {
        return $this->waterTypeId;
    }

    public function validateDocumentChange($document, $type)
    {
        return (($this->docNumber == $document) && ($this->documentTypeId == $type));
    }


    public function validationErrors($patientExists)
    {
        $validationErrors = [];

        if (strlen($this->firstName) > 50 || strlen($this->firstName) == 0)
            $validationErrors[] = 'firstName';

        if (strlen($this->lastName) > 50 || strlen($this->lastName) == 0)
            $validationErrors[] = 'lastName';

        if (strlen($this->docNumber) == 0)
            $validationErrors[] = 'documentNumber';

        if (strlen($this->address) == 0)
            $validationErrors[] = 'address';

        if ($this->birthday > new \DateTime())
            $validationUser[] = 'birthday';

        if ($this->gender == null)
            $validationErrors[] = 'genderId';

        if ($this->documentTypeId == null)
            $validationErrors[] = 'documentTypeId';

        if ($this->heatingTypeId == null)
            $validationErrors[] = 'heatingType';

        if ($this->houseTypeId == null)
            $validationErrors[] = 'houseType';

        if ($this->waterTypeId == null)
            $validationErrors[] = 'waterType';

        if ($patientExists)
            $validationErrors[] = 'patientExists';

        return $validationErrors;
    }
}
