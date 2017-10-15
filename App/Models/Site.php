<?php

namespace App\Models;

/**
 * Site
 *
 * @Table(name="site")
 * @Entity
 */
class Site
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
     * @Column(type="string", length=255)
     */
    private $title;

    /**
     * @var text
     *
     * @Column(type="text")
     */
    private $footer;

    /**
     * @var string
     *
     * @Column(type="string", length=255)
     */
    private $email;

    /**
     * @var int
     *
     * @Column(type="integer")
     */
    private $listAmount;

    /**
     * @var bool
     *
     * @Column(type="boolean")
     */
    private $enabled;

    /**
     * Many User have Many Phonenumbers.
     * @ManyToMany(targetEntity="Article")
     * @JoinTable(name="sites_articles",
     *      joinColumns={@JoinColumn(name="site_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="article_id", referencedColumnName="id", unique=true)}
     *      )
     */
    private $articles;


    public function setData($data)
    {
        $this->title = $data['title'];
        $this->email = $data['email'];
        $this->footer = $data['footer'];
        if (isset($data['enabled']))
            $this->enabled = true;
        else
            $this->enabled = false;
        $this->listAmount = $data['listAmount'];
    }


    public function validationErrors()
    {
        $validationErrors = [];

        if (strlen($this->email) == 0 || filter_var($this->email, FILTER_VALIDATE_EMAIL) === false)
            $validationErrors[] = 'email';

        if (strlen($this->title) == 0)
            $validationErrors[] = 'title';


        if (strlen($this->title) > 50)
            $validationErrors[] = 'titleLength';

        if (strlen($this->listAmount) == 0)
            $validationErrors[] = 'listAmount';

        return $validationErrors;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->articles = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set title
     *
     * @param string $title
     *
     * @return Site
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set footer
     *
     * @param string $footer
     *
     * @return Site
     */
    public function setFooter($footer)
    {
        $this->footer = $footer;

        return $this;
    }

    /**
     * Get footer
     *
     * @return string
     */
    public function getFooter()
    {
        return $this->footer;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return Site
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set listAmount
     *
     * @param integer $listAmount
     *
     * @return Site
     */
    public function setListAmount($listAmount)
    {
        $this->listAmount = $listAmount;

        return $this;
    }

    /**
     * Get listAmount
     *
     * @return integer
     */
    public function getListAmount()
    {
        return $this->listAmount;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled
     *
     * @return Site
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Add article
     *
     * @param \App\Models\Article $article
     *
     * @return Site
     */
    public function addArticle($article)
    {
        $this->articles[] = $article;

        return $this;
    }

    /**
     * Remove article
     *
     * @param \App\Models\Article $article
     */
    public function removeArticle($article)
    {
        $this->articles->removeElement($article);
    }

    /**
     * Get articles
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArticles()
    {
        return $this->articles;
    }
}
