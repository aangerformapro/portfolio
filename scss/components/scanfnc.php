<?php

/**
 * Generates gerillass utilities functions
 */

$root = __DIR__ . '/../../../node_modules/gerillass/scss/utilities/';


foreach (scandir($root) as $file) {

    if (str_ends_with($file, '.scss')) {
        $path = $root . $file;

        $contents = file_get_contents($path);


        if (preg_match_all('#@function (__(.*?))\((.*?)\)#s', $contents, $matches, PREG_SET_ORDER)) {

            foreach ($matches as $result) {
                @list(, $target, $name, $params) = $result;


                printf("@function %s(%s) {\n    @return %s(%s);\n}\n", $name, $params, $target, $params);
            }

            //  var_dump($matches);
        }
    }
}
