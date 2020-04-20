<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <title>Test1</title>
    </head>
    <body>
       <div id = "test2" 
            data-fname={{$fname}}
            data-lname={{$lname}}
            data-agree={{$agree}}
        >
        </div>
       <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>