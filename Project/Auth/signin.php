<?php
session_start();
require_once 'C:\xampp\htdocs\Project\public\config\db.php';
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MFU RIDE</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/
bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/
bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>

<body>
    <!-- Section: Design Block -->
    <section class=" text-center text-lg-start">
        <style>
            .col-lg-4 {
                background-color: gainsboro;
                height: 800px;
            }

            .col-lg-8 {
                background-color: rgb(77, 13, 104);
                height: 800px;
            }

            .form-outline {
                display: block;
            }

            #re {
                margin-left: 235px;
            }

            #email1 {
                margin-top: 200px;
                width: 1500px;
            }

            #mfuride {
                text-align: center;
                margin-top: 10px;
            }

            .col-1 {
                margin-top: 200px;
                margin-left: 145px;
            }

            .fontAwesome {
                font-family: Helvetica, 'FontAwesome', sans-serif;
            }

            #box {
                margin-left: 50px;
            }
        </style>
        <div class="card mb-3">
            <div class="row d-flex">
                <div class="col-lg-4">
                    <div class="col-1">
                        <i style="font-size:170px " class="fas fa-motorcycle"></i>
                    </div>
                    <h1 id="mfuride">MFU RIDE</h1>
                </div>
                <div class="col-lg-8">
                    <form action="signin_db.php" method="POST">
                        <div class="card-body py-5 px-md-5">
                            <div id="email1">
                                <?php if (isset($_SESSION['error'])) { ?>
                                    <div class="alert alert-danger w-50 mx-5 mb-3" role="alert">
                                        <?php echo $_SESSION['error']; ?>
                                    </div>
                                <?php } ?>

                                <input type="email" placeholder="Enter Email" id="email"
                                    class="form-control w-50 mx-5 mb-3" name="email">
                                <input type="password" placeholder="Enter Password" id="password"
                                    class="form-control w-50 mx-5 mb-3" name="password">
                            </div>
                            <div class="form-check mb-5 mx-5">
                                <label class="form-check-label text-white">
                                    <input class="form-check-input" type="checkbox" name="remember"> Remember me?
                                </label>
                                <a class="text-white mx-auto  mx-5" href="signup.php">Register</a>
                            </div>
                            <div class="text-center mt-3">
                                <button type="submit" class="btn btn-warning" name="signin">Log in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </section>
    <!--------JS --------->
    <!-- <script>
        document.querySelector('.btn').onclick = function () {
            window.location.replace('HomeUser.html')
        }
    </script> -->
</body>

</html>