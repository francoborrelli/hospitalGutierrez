<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Site;

class ConfigController extends Controller
{

    public function indexAction()
    {
        $siteRepository = $this->getEntityManager()->getRepository(Site::class);
        $site = $siteRepository->findAll()[0];
        $this->render('Config/config.html.twig', ['site' => $site]);
    }

}
