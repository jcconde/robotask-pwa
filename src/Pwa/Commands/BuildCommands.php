<?php

namespace Onetree\Pwa\Commands;

use Onetree\Task\Yarn\Tasks;
//use Robo\Task\Npm\Tasks;
use Robo\Symfony\ConsoleIO;

class BuildCommands extends \Robo\Tasks
{
    use Tasks;

    public function build(ConsoleIO $io)
    {
        $this->taskYarnInstall()->run();
    }
}
