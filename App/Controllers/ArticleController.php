<?php

namespace App\Controllers;

use Core\Controller;

class ArticleController extends Controller
{
    public function updateAction()
    {
        $this->denyAccessUnlessPermissionGranted('config_update');

        $em = $this->getEntityManager();
        $articles = $em->getRepository(Article::class)->findAll();

        foreach ($articles as $key => $article) {
            $article->setTitle($_POST['title' . $key]);
            $article->setBody($_POST['body' . $key]);
        }

        $em->flush();
    }
}
