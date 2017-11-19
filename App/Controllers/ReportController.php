<?php

namespace App\Controllers;

use Core\View;
use Core\Controller;

class ReportController extends Controller
{

    public function indexAction()
    {
        $this->denyAccessUnlessPermissionGranted('reportes_index'); 

        $data = $this->getGraphicsData();

        $this->render('Reports/reportsPage.html.twig', ['data' => $data]);
    }

    private function getGraphicsData()
    {
        $graphicData = [];



        return $graphicData;
    }

}
