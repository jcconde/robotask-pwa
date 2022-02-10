<?php

declare(strict_types=1);

namespace Onetree\Task\Yarn;

trait Tasks
{
    protected function taskYarnInstall($pathToYarn = null)
    {
        return $this->task(Install::class, $pathToYarn);
    }
}
