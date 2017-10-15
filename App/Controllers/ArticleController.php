<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Article;

class ArticleController extends Controller
{
    protected function before()
    {
        $this->denyAccessUnlessPermissionGranted('config_update');
    }

    public function showEditAction()
    {
        $this->render('Config/articlesPage.html.twig');
    }

    public function updateAction()
    {
        $em = $this->getEntityManager();
        $articles = $em->getRepository(Article::class)->findAll();

        foreach ($articles as $key => $article) {
            $article->setTitle($_POST['title' . $key]);
            $article->setBody($_POST['body' . $key]);
        }

        $em->flush();

        $this->addFlashMessage('success', '¡Felicitaciones!.', 'Los artículos fueron actualiados correctamente');
        $this->redirect('/config/articles');
    }
}
