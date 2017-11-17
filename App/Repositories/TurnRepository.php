<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;
use App\Models\Turn;

class TurnRepository extends EntityRepository
{

    public function reserve($data)
    {
        $dateFormated = \DateTime::createFromFormat('d-m-Y H:i', $data['date'] . ' ' . $data['hour']);

        if (!$dateFormated) {
            return ['error' => 'Invalid date', 'description' => 'Invalid date format'];
        } elseif ($dateFormated < new \DateTime('now')) {
            return ['error' => 'Invalid date', 'description' => 'Expired date'];
        } elseif (!($dateFormated->format('i') == '00' || $dateFormated->format('i') == '30')) 
            return ['error' => 'Invalid minutes', 'description' => 'Minutes must be 00 or 30'];

        $qb = $this->createQueryBuilder('q')
            ->select('t')
            ->from('App\Models\Turn', 't')
            ->where('t.date = :date')
            ->setParameter('date', $dateFormated);

        $reserved = $qb->getQuery()->getResult();

        if (!empty($reserved))
            return ['error' => 'Turn is not available', 'description' => 'Turn is already reserved'];

        $turn  = new Turn($data['dni'], $dateFormated);
        $em = $this->getEntityManager();
        $em->persist($turn);
        $em->flush();
        return ['success' => 'Turn reserved', 'description' => 'Turn for dni ' . $data['dni'] . ' reserved'];
    }

    public function findAllDate($date)
    {
        $dateFormated = \DateTime::createFromFormat('d-m-Y', $date);
        if (!$dateFormated) {
            return ['error' => 'Invalid date', 'description' => 'Invalid date format'];
        } elseif ($dateFormated < new \DateTime('now')) {
            return ['error' => 'Invalid date', 'description' => 'Expired date'];
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
                $turns[] = \DateTime::createFromFormat($format, $date . "$i:$min" .':00');
            }
        }
        return $turns;
    }


}
