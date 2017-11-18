<?php

namespace App\Models;

/**
 * ClinicalRecord
 *
 * @Table(name="clinical_records")
 * @Entity(repositoryClass="App\Repositories\ClinicalRecordRepository")
 */
class ClinicalRecord
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
    * @var \DateTime 
    * 
    * @Column(type="datetime") 
    */ 
    private $controlDate; 
 
    /** 
    * @var int
    * 
    * @Column(type="integer") 
    */ 
    private $controlNumber; 

    /** 
     * @var float 
     * 
     * @Column(type="float") 
     */ 
     private $weight; 
      
    /** 
     * @var boolean 
     * 
     * @Column(type="boolean") 
     */ 
     private $vaccination; 
 
    /** 
     * @var boolean 
     * 
     * @Column(type="boolean") 
     */ 
     private $maturation;   
      
    /** 
     * @var boolean 
     * 
     * @Column(type="boolean") 
     */ 
     private $fisicTest; 
 
    /** 
    * @var text 
    * 
    * @Column(type="text") 
    */ 
    private $vaccinationObservation; 
 
    /** 
    * @var text 
    * 
    * @Column(type="text") 
    */ 
    private $maturationObservation; 
     
    /** 
    * @var text 
    * 
    * @Column(type="text") 
    */ 
    private $fisicTestObservation;     
 
   /** 
     * @var float 
     * 
     * @Column(type="float", nullable=true) 
     */ 
     private $height; 
 
   /** 
     * @var float 
     * 
     * @Column(type="float", nullable=true) 
     */ 
     private $pc; 
      
   /** 
     * @var float 
     * 
     * @Column(type="float", nullable=true) 
     */ 
     private $ppc;      
        
    /** 
    * @var text 
    * 
    * @Column(type="text", nullable=true) 
    */ 
    private $generalObservation; 
 
    /** 
    * @var text 
    * 
    * @Column(type="text", nullable=true) 
    */ 
    private $nutrition; 
      
    /** 
    * @ManyToOne(targetEntity="Patient") 
    * @JoinColumn(name="patient_id", referencedColumnName="id") 
    */ 
    private $patient; 

    /** 
    * @ManyToOne(targetEntity="User") 
    * @JoinColumn(name="user_id", referencedColumnName="id") 
    */ 
    private $user; 

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
     * Set date
     *
     * @param \DateTime $controlDate
     *
     * @return ClinicalRecord
     */
    public function setDate($controlDate)
    {
        $this->controlDate = $controlDate;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getControlDate()
    {
        return $this->controlDate;
    }

    /**
     * Set weight
     *
     * @param float $weight
     *
     * @return ClinicalRecord
     */
    public function setWeight($weight)
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * Get weight
     *
     * @return float
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * Set vaccination
     *
     * @param boolean $vaccination
     *
     * @return ClinicalRecord
     */
    public function setVaccination($vaccination)
    {
        $this->vaccination = $vaccination;

        return $this;
    }

    /**
     * Get vaccination
     *
     * @return boolean
     */
    public function getVaccination()
    {
        return $this->vaccination;
    }

    /**
     * Set maturation
     *
     * @param boolean $maturation
     *
     * @return ClinicalRecord
     */
    public function setMaturation($maturation)
    {
        $this->maturation = $maturation;

        return $this;
    }

    /**
     * Get maturation
     *
     * @return boolean
     */
    public function getMaturation()
    {
        return $this->maturation;
    }

    /**
     * Set fisicTest
     *
     * @param boolean $fisicTest
     *
     * @return ClinicalRecord
     */
    public function setFisicTest($fisicTest)
    {
        $this->fisicTest = $fisicTest;

        return $this;
    }

    /**
     * Get fisicTest
     *
     * @return boolean
     */
    public function getFisicTest()
    {
        return $this->fisicTest;
    }

    /**
     * Set vaccinationObservation
     *
     * @param string $vaccinationObservation
     *
     * @return ClinicalRecord
     */
    public function setVaccinationObservation($vaccinationObservation)
    {
        $this->vaccinationObservation = $vaccinationObservation;

        return $this;
    }

    /**
     * Get vaccinationObservation
     *
     * @return string
     */
    public function getVaccinationObservation()
    {
        return $this->vaccinationObservation;
    }

    /**
     * Set maturationObservation
     *
     * @param string $maturationObservation
     *
     * @return ClinicalRecord
     */
    public function setMaturationObservation($maturationObservation)
    {
        $this->maturationObservation = $maturationObservation;

        return $this;
    }

    /**
     * Get maturationObservation
     *
     * @return string
     */
    public function getMaturationObservation()
    {
        return $this->maturationObservation;
    }

    /**
     * Set fisicTestObservation
     *
     * @param string $fisicTestObservation
     *
     * @return ClinicalRecord
     */
    public function setFisicTestObservation($fisicTestObservation)
    {
        $this->fisicTestObservation = $fisicTestObservation;

        return $this;
    }

    /**
     * Get fisicTestObservation
     *
     * @return string
     */
    public function getFisicTestObservation()
    {
        return $this->fisicTestObservation;
    }

    /**
     * Set height
     *
     * @param float $height
     *
     * @return ClinicalRecord
     */
    public function setHeight($height)
    {
        $this->height = $height;

        return $this;
    }

    /**
     * Get height
     *
     * @return float
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * Set pc
     *
     * @param float $pc
     *
     * @return ClinicalRecord
     */
    public function setPc($pc)
    {
        $this->pc = $pc;

        return $this;
    }

    /**
     * Get pc
     *
     * @return float
     */
    public function getPc()
    {
        return $this->pc;
    }

    /**
     * Set ppc
     *
     * @param float $ppc
     *
     * @return ClinicalRecord
     */
    public function setPpc($ppc)
    {
        $this->ppc = $ppc;

        return $this;
    }

    /**
     * Get ppc
     *
     * @return float
     */
    public function getPpc()
    {
        return $this->ppc;
    }

    /**
     * Set generalObservation
     *
     * @param string $generalObservation
     *
     * @return ClinicalRecord
     */
    public function setGeneralObservation($generalObservation)
    {
        $this->generalObservation = $generalObservation;

        return $this;
    }

    /**
     * Get generalObservation
     *
     * @return string
     */
    public function getGeneralObservation()
    {
        return $this->generalObservation;
    }

    /**
     * Set nutrition
     *
     * @param string $nutrition
     *
     * @return ClinicalRecord
     */
    public function setNutrition($nutrition)
    {
        $this->nutrition = $nutrition;

        return $this;
    }

    /**
     * Get nutrition
     *
     * @return string
     */
     public function getNutrition()
     {
         return $this->nutrition;
     }

    /**
     * Get ControlNumber
     *
     * @return int
     */
    public function getControlNumber()
    {
        return $this->controlNumber;
    }

    /**
     * Set patient
     *
     * @param \App\Models\Patient $patient
     *
     * @return ClinicalRecord
     */
    public function setPatient(\App\Models\Patient $patient = null)
    {
        $this->patient = $patient;

        return $this;
    }

    /**
     * Get patient
     *
     * @return \App\Models\Patient
     */
    public function getPatient()
    {
        return $this->patient;
    }

    /**
     * Set user
     *
     * @param \App\Models\User $user
     *
     * @return ClinicalRecord
     */
    public function setUser(\App\Models\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \App\Models\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @var boolean
     *
     * @Column(type="boolean")
     */
     private $deleted;


    public function __construct($data, $controlNumber, $patient, $user)
    {
        $this->setData($data);
        $this->setPatient($patient);
        $this->setUser($user);

        $this->controlNumber = $controlNumber;
        $this->deleted = false;
    }

    public function delete()
    {
        $this->deleted = true;
    }

    public function isDeleted()
    {
        return $this->deleted;
    }

    public function getAge(){
        $birthday = $this->patient->getBirthday();

        return $this->controlDate->diff($birthday);
    }

    public function setData($data)
    {
        $this->weight = $data['weight'];
        $this->height = $data['height'];
        $this->nutrition = $data['nutrition'];
        $this->pc = $data['pc'];
        $this->ppc = $data['ppc'];
        $this->vaccinationObservation = $data['vaccinationObservation'];
        $this->maturationObservation = $data['maturationObservation'];
        $this->fisicTestObservation = $data['fisicTestObservation'];
        $this->generalObservation = $data['generalObservation'];

         if(isset($data['maturation']) && $data['maturation'] == 'si')
            $this->maturation = true;
            elseif ($data['maturation'] == 'no')
            $this->maturation = false;

        if($data['fisicTest'] == 'si')
            $this->fisicTest = true;
            elseif ($data['fisicTest'] == 'no')
            $this->fisicTest = false;

        if($data['vaccination'] == 'si')
            $this->vaccination = true;
        elseif ($data['vaccination'] == 'no')
            $this->vaccination = false;

        if (isset($data['controlDate']))
            $this->controlDate = \DateTime::createFromFormat('d/m/Y',$data['controlDate']);   
    }

    public function validationErrors()
    {
        $validationErrors = [];

        if ((strlen($this->weight) == 0) or !(is_numeric($this->weight)))
            $validationErrors[] = 'weight';

        if (strlen($this->vaccinationObservation) == 0)
            $validationErrors[] = 'vaccinationObservation';

        if (strlen($this->maturationObservation) == 0)
            $validationErrors[] = 'maturationObservation';

        if (strlen($this->fisicTestObservation) == 0)
            $validationErrors[] = 'fisicTestObservation';


        return $validationErrors;
    }
}
