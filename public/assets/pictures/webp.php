<?php

declare(strict_types=1);

$dir       = __DIR__;

$webpfiles = array_filter(scandir($dir) ?: [], fn ($f) => str_ends_with($f, '.webp'));
$jpgfiles  = array_filter(scandir($dir) ?: [], fn ($f) => str_ends_with($f, '.jpg'));
$pngfiles  = array_filter(scandir($dir) ?: [], fn ($f) => str_ends_with($f, '.png'));

$notwebp   = array_merge($jpgfiles, $pngfiles);

$compress  = $decompress = [];

foreach ($notwebp as $value)
{
    $name     = pathinfo($value)['filename'];
    $webpfile = "{$name}.webp";

    if ( ! in_array($webpfile, $webpfiles))
    {
        $compress[] = [$value, $webpfile];
    }
}

foreach ($webpfiles as $value)
{
    $name        = pathinfo($value)['filename'];

    $notwebpfile = null;

    foreach (['.jpg', '.png'] as $ext)
    {
        $notwebpfile = $name.$ext;

        if (in_array($notwebpfile, $notwebp))
        {
            continue 2;
        }
    }

    if ($notwebpfile)
    {
        $decompress[] = [$value, $notwebpfile];
    }
}

foreach ($compress as list($input, $output))
{
    passthru(sprintf('cwebp -q 100 -lossless -exact "%s" -o "%s"', $input, $output));
}
