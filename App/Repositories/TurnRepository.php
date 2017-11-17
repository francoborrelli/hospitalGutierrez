<?php

namespace App\Repositories;

use Doctrine\ORM\EntityRepository;

class TurnRepository extends EntityRepository
{

    public function findAllArray()
    {
        $qb = $this->createQueryBuilder('q')
            ->from('App\Models\Turn', 't');

        return $qb->getQuery()->getArrayResult();
    }

    public function findAllDate($date)
    {
        $format = 'd-m-Y';
        $daten = \DateTime::createFromFormat($format, $date);

        $qb = $this->createQueryBuilder('q')
            ->select('t')
            ->from('App\Models\Turn', 't')
            ->where('t.date LIKE :date')
            ->setParameter('date', $daten->format('Y-m-d')." %");

        $all = $qb->getQuery()->getResult();

        $turns = $this->generateTurns($date);

        foreach ($turns as $key => $turn) {
            foreach ($all as $t) {
                if ($t->getDate() == $turn) {
                    unset($turns[$key]);
                }
            }
        }

        return array_values($turns);
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
