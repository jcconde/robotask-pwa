<?php

declare(strict_types=1);

namespace Onetree\Task\Yarn;

use Robo\Common\ExecOneCommand;
use Robo\Exception\TaskException;
use Robo\Task\BaseTask;

abstract class Base extends BaseTask
{
    use ExecOneCommand;

    protected string $command = '';
    protected string $action = '';

    /**
     * @throws TaskException
     */
    public function __construct(?string $pathToYarn)
    {
        $this->command = $pathToYarn ?? '';
        if (empty($this->command)) {
            $this->command = $this->findExecutable('yarn');
        }

        if (!$this->command) {
            throw new TaskException(__CLASS__, 'Yarn executable not found.');
        }
    }

    public function getCommand(): string
    {
        return "{$this->command} {$this->action}{$this->arguments}";
    }
}
