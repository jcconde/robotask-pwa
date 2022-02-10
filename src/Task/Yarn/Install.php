<?php

declare(strict_types=1);

namespace Onetree\Task\Yarn;

use Robo\Contract\CommandInterface;
use Robo\Result;

class Install extends Base implements CommandInterface
{
    /**
     * @return Result
     */
    public function run(): Result
    {
        $this->printTaskInfo('Install Yarn packages: {arguments}', ['arguments' => $this->arguments]);
        return $this->executeCommand($this->getCommand());
    }
}
