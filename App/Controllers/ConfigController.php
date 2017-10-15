<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Site;

class ConfigController extends Controller
{

    public function indexAction()
    {
        $this->render('Config/config.html.twig');
    }

    public function updateAction()
    {
        $site = $this->getSite();
        $site->setData($_POST);
        $this->getEntityManager()->flush();

        $this->addFlashMessage('success', 'Felicitaciones!.', 'Los datos del sitio se han actualizado correctamente');
        $this->redirect('/admin/config');
    }

}
