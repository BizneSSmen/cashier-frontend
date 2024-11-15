<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="./style.css?v=<?= time() ?>">


  <title></title>
</head>

<body class="px-3">

  <div id="app" class="container min-vh-100">
    <?php include("./components/first-currency/index.php") ?>
    <?php include("./components/swap-button/index.php") ?>
    <?php include("./components/second-currency/index.php") ?>
    <?php include("./components/send-buttons/index.php") ?>
  </div>

  <script>
    const tgObject = window.Telegram.WebApp;
    tgObject.ready();
  </script>

  <script src="./public/js/globals.js?v=<?= time() ?>"></script>
  <script src="./public/js/send-buttons.js?v=<?= time() ?>"></script>
  <script src="./public/js/change-currency-type.js?v=<?= time() ?>"></script>
  <script src="./public/js/swap-currency.js?v=<?= time() ?>"></script>
  <script src="./public/js/create-element.js?v=<?= time() ?>"></script>
  <script src="./public/js/create-second-currency-field.js?v=<?= time() ?>"></script>
  <script src="./public/js/input-event.js?v=<?= time() ?>"></script>
  <script src="./public/js/create-second-currency-card.js?v=<?= time() ?>"></script>
  <script src="./public/js/get-second-currency.js?v=<?= time() ?>"></script>
  <script src="./public/js/create-currency-card.js?v=<?= time() ?>"></script>
  <script src="./public/js/startup-currency.js?v=<?= time() ?>"></script>
  <script src="./public/js/get-first-currency.js?v=<?= time() ?>"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>



</html>