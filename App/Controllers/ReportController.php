<?php

namespace App\Controllers;

use Core\View;
use Core\Controller;
use App\Models\Patient;
use App\Repositories\HouseTypeRepository;
use App\Repositories\WaterTypeRepository;
use App\Repositories\HeatingTypeRepository;

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

        $em = $this->getEntityManager();
        $repository = $em->getRepository(Patient::class);

        $graphicData['total'] = $repository->getPatientsAmount();
        $graphicData['refrigerator'] = $repository->getRefrigeratorAmount();
        $graphicData['pet'] = $repository->getPetAmount();
        $graphicData['electricity'] = $repository->getElectricityAmount();

        $houseAmount = $repository->getHouseTypeAmounts();
        $houseType = HouseTypeRepository::findAll();

        $graphicData['house'] = $this->setDataArray($houseType,$houseAmount);

        $waterAmount = $repository->getWaterTypeAmounts();
        $waterType = WaterTypeRepository::findAll();
        
        $graphicData['water'] = $this->setDataArray($waterType,$waterAmount);

        $heatingAmount = $repository->getHeatingTypeAmounts();
        $heatingType = HeatingTypeRepository::findAll();
        
        $graphicData['heat'] = $this->setDataArray($heatingType,$heatingAmount);

        return $graphicData;
    }

    private function setDataArray($typeArray, $amountArray){
 
        $result = [];

        foreach ($typeArray as $type){
            $id = $type->getId();
            if (isset($amountArray[$id])){
                $result[] = ['name' => $type->getName(), 'data' => [$amountArray[$id]] ];
            }else{
                $result[] = ['name' => $type->getName(), 'data' => [0]];
            }
        }
        return $result;
    }
}
