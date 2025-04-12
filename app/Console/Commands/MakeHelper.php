<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeHelper extends Command
{
    protected $signature = 'make:helper {name}';
    protected $description = 'Create a new helper file';

    public function handle()
    {
        $name = $this->argument('name');
        $path = app_path("Helpers/{$name}.php");

        if (File::exists($path)) {
            $this->error("Helper file {$name}.php already exists!");
            return;
        }

        if (!File::exists(app_path('Helpers'))) {
            File::makeDirectory(app_path('Helpers'));
        }

        $stub = <<<EOT
        <?php

        if (!function_exists('example_function')) {
            function example_function() {
                return 'This is a helper function!';
            }
        }
        EOT;

        File::put($path, $stub);
        $this->info("Helper file {$name}.php created successfully!");
    }
}
