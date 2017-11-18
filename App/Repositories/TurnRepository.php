<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;
use App\Models\Turn;

class TurnRepository extends EntityRepository
{

    public function reserve($data)
    {
        $dateFormated = \DateTime::createFromFormat('d-m-Y H:i', $data['date'] . ' ' . $data['hour']);

        if (!$dateFormated || $dateFormated->format('d-m-Y') !== $data['date']) {
            return ['error' => 'Fecha inválida', 'description' => 'Fecha inválida, debe ingresar los datos con el formato dni dd-mm-aaaa hh:mm'];
        } elseif ($dateFormated < new \DateTime('now')) {
            return ['error' => 'Fecha inválida', 'description' => 'La fecha solicitada ya ha pasado'];
        } elseif (!($dateFormated->format('i') == '00' || $dateFormated->format('i') == '30')) {
            return ['error' => 'Minutos inválidos', 'description' => 'Los turnos son únicamente en punto o y media'];
        } elseif (preg_match("/^[0-9]{7,10}$/",$data['dni'])) {
            return ['error' => 'DNI inválido', 'description' => 'El número de DNI es inválido'];
        }


        $qb = $this->createQueryBuilder('q')
            ->select('t')
            ->from('App\Models\Turn', 't')
            ->where('t.date = :date')
            ->setParameter('date', $dateFormated);

        $reserved = $qb->getQuery()->getResult();

        if (!empty($reserved))
            return ['error' => 'El turno no está disponible', 'description' => 'El turno elegido ya fue reservado'];

        $turn  = new Turn($data['dni'], $dateFormated);
        $em = $this->getEntityManager();
        $em->persist($turn);
        $em->flush();
        return ['success' => 'Turno reservado', 'description' => 'Turno reservado exitosamente. Nº de turno: ' . $turn->getId()];
    }

    public function findAllDate($date)
    {
        $dateFormated = \DateTime::createFromFormat('d-m-Y', $date);
        if (!$dateFormated || $dateFormated->format('d-m-Y') !== $date) {
            return ['error' => 'Fecha inválida', 'description' => 'Fecha inválida, debe ingresar los datos con el formato dni dd-mm-aaaa hh:mm'];
        } elseif ($dateFormated < new \DateTime('now')) {
            return ['error' => 'Fecha inválida', 'description' => 'La fecha solicitada ya ha pasado'];
        }

        $qb = $this->createQueryBuilder('q')
            ->select('t')
            ->from('App\Models\Turn', 't')
            ->where('t.date LIKE :date')
            ->setParameter('date', $dateFormated->format('Y-m-d')." %");

        $reserved = $qb->getQuery()->getResult();
        $dailyTurns = $this->generateTurns($date);

        $availableTurns = $this->findAvailable($reserved, $dailyTurns);
        return array_values($availableTurns);
    }

    private function findAvailable($reserved, $dailyTurns)
    {
        foreach ($dailyTurns as $key => $turn) {
            foreach ($reserved as $t) {
                if ($t->getDate() == $turn) {
                    unset($dailyTurns[$key]);
                }
            }
        }
        return $dailyTurns;
    }

    private function generateTurns($date)
    {
        $turns = [];
        $format = 'd-m-Y H:i:s';
        for ($i=8; $i<20; $i++) {
            for ($j=0; $j<=1; $j++) {
                $min = 30 * $j;
                if ($min == 0)
                    $min = '00';
                $newDate = \DateTime::createFromFormat($format, $date . "$i:$min" . ':00');
                if ($newDate >= new \DateTime('now'))
                    $turns[] = $newDate;
            }
        }
        return $turns;
    }


}
