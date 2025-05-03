<?php

if (!function_exists('greetUser')) {
    function greetUser($name) {
        return "Hello, " . ucfirst($name) . "!";
    }
}