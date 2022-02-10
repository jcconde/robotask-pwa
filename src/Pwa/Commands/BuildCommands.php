<?php

namespace Onetree\Pwa\Commands;

use Onetree\Task\Yarn\Tasks as YarnTasks;
use Robo\Symfony\ConsoleIO;
use Robo\Task\Remote\Tasks as RsyncTasks;

class BuildCommands extends \Robo\Tasks
{
    use YarnTasks;
    use RsyncTasks;

    public function build(ConsoleIO $io)
    {
        $this->taskYarnInstall()->run();
        $this->taskRsync()
            ->fromPath('lentesplus-static/')
            ->toHost('localhost')
            ->toPath('node_modules/@magento/venia-ui/venia-static/')
            ->recursive()
            ->wholeFile()
            ->verbose()
            ->progress()
            ->humanReadable()
            ->stats()
            ->run();
    }
}
